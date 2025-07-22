# backend/validators/excel_validator.py
import pandas as pd
from datetime import datetime, timedelta
from typing import List, Tuple, Optional
from models.validation_models import Issue

class ExcelValidator:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.df = None
        self.issues = []
        
    def load_file(self) -> bool:
        """Load Excel file and validate structure"""
        try:
            # Load the Excel file
            with pd.ExcelFile(self.file_path) as xls:
                self.df = pd.read_excel(xls)
            
            # Define required columns (case-insensitive check)
            required_columns = ['Project Name', 'Start Date', 'End Date']
            
            # Check if dataframe is empty
            if self.df.empty:
                raise ValueError("Excel file is empty")
            
            # Get column names and convert to lowercase for comparison
            actual_columns = [col.strip() for col in self.df.columns]
            actual_columns_lower = [col.lower() for col in actual_columns]
            
            # Check if all required columns exist (case-insensitive)
            missing_columns = []
            column_mapping = {}
            
            for required_col in required_columns:
                found = False
                for idx, actual_col in enumerate(actual_columns):
                    if actual_col.lower() == required_col.lower():
                        column_mapping[required_col] = actual_col
                        found = True
                        break
                
                if not found:
                    missing_columns.append(required_col)
            
            # If columns are missing, check if first 3 columns can be used
            if missing_columns:
                if len(self.df.columns) >= 3:
                    # Check if user wants to use first 3 columns as defaults
                    # For now, we'll reject the file
                    raise ValueError(
                        f"Missing required columns: {', '.join(missing_columns)}. "
                        f"File must contain: {', '.join(required_columns)}"
                    )
                else:
                    raise ValueError(
                        f"Excel file must have at least 3 columns with headers: {', '.join(required_columns)}"
                    )
            
            # Rename columns to standard names if needed
            if column_mapping:
                reverse_mapping = {v: k for k, v in column_mapping.items()}
                self.df = self.df.rename(columns=reverse_mapping)
            
            # Ensure the dataframe has the expected columns
            for col in required_columns:
                if col not in self.df.columns:
                    raise ValueError(f"Column '{col}' not found after mapping")
            
            return True
            
        except pd.errors.EmptyDataError:
            raise ValueError("Excel file is empty or corrupted")
        except Exception as e:
            if isinstance(e, ValueError):
                raise e
            raise ValueError(f"Failed to load Excel file: {str(e)}")
    
    def validate_dates(self, row_idx: int, row_data: pd.Series) -> List[Issue]:
        """Validate date fields for a single row"""
        issues = []
        project_name = str(row_data['Project Name'])
        
        # Check for missing project name
        if pd.isna(row_data['Project Name']) or project_name.strip() == '':
            issues.append(Issue(
                row=row_idx + 2,  # +2 because Excel rows start at 1 and have header
                projectName="Unknown",
                issueType="Missing Project Name",
                description="Project name is missing",
                severity="high"
            ))
            project_name = f"Row {row_idx + 2}"
        
        # Parse dates
        start_date = None
        end_date = None
        
        try:
            if pd.notna(row_data['Start Date']):
                start_date = pd.to_datetime(row_data['Start Date'])
        except:
            issues.append(Issue(
                row=row_idx + 2,
                projectName=project_name,
                issueType="Invalid Date Format",
                description=f"Start date '{row_data['Start Date']}' is not in valid format",
                severity="high",
                startDate=str(row_data['Start Date']) if pd.notna(row_data['Start Date']) else None
            ))
        
        try:
            if pd.notna(row_data['End Date']):
                end_date = pd.to_datetime(row_data['End Date'])
        except:
            issues.append(Issue(
                row=row_idx + 2,
                projectName=project_name,
                issueType="Invalid Date Format",
                description=f"End date '{row_data['End Date']}' is not in valid format",
                severity="high",
                endDate=str(row_data['End Date']) if pd.notna(row_data['End Date']) else None
            ))
        
        # Check for missing dates
        if pd.isna(row_data['Start Date']):
            issues.append(Issue(
                row=row_idx + 2,
                projectName=project_name,
                issueType="Missing Date",
                description="Start date is missing",
                severity="high"
            ))
        
        if pd.isna(row_data['End Date']):
            issues.append(Issue(
                row=row_idx + 2,
                projectName=project_name,
                issueType="Missing Date",
                description="End date is missing",
                severity="high"
            ))
        
        # Validate date logic if both dates exist
        if start_date and end_date:
            # Check if start date is after end date
            if start_date > end_date:
                issues.append(Issue(
                    row=row_idx + 2,
                    projectName=project_name,
                    issueType="Invalid Date Range",
                    description=f"Start date ({start_date.strftime('%Y-%m-%d')}) is after end date ({end_date.strftime('%Y-%m-%d')})",
                    severity="high",
                    startDate=start_date.strftime('%Y-%m-%d'),
                    endDate=end_date.strftime('%Y-%m-%d')
                ))
            
            # Check if start date is in the future
            if start_date > datetime.now():
                issues.append(Issue(
                    row=row_idx + 2,
                    projectName=project_name,
                    issueType="Future Start Date",
                    description=f"Start date ({start_date.strftime('%Y-%m-%d')}) is in the future",
                    severity="medium",
                    startDate=start_date.strftime('%Y-%m-%d')
                ))
            
            # Check if project duration exceeds 2 years
            duration = end_date - start_date
            if duration.days > 730:  # 2 years = 730 days
                years = duration.days / 365.25
                issues.append(Issue(
                    row=row_idx + 2,
                    projectName=project_name,
                    issueType="Excessive Duration",
                    description=f"Project duration ({years:.1f} years) exceeds 2-year limit",
                    severity="medium",
                    startDate=start_date.strftime('%Y-%m-%d'),
                    endDate=end_date.strftime('%Y-%m-%d')
                ))
        
        return issues
    
    def validate_all(self) -> Tuple[int, int, List[Issue]]:
        """Validate entire Excel file"""
        if self.df is None:
            raise ValueError("No file loaded")
        
        total_rows = len(self.df)
        all_issues = []
        
        # Only validate rows, not column structure (that's done in load_file)
        for idx, row in self.df.iterrows():
            row_issues = self.validate_dates(idx, row)
            all_issues.extend(row_issues)
        
        # Count unique rows with issues
        rows_with_issues = set(issue.row for issue in all_issues)
        valid_rows = total_rows - len(rows_with_issues)
        
        return total_rows, valid_rows, all_issues
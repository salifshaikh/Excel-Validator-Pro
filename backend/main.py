# backend/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil
from datetime import datetime
from validators.excel_validator import ExcelValidator
from models.validation_models import ValidationResult
import tempfile

app = FastAPI(title="Excel Project Validator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Excel Project Validator API is running"}

@app.post("/api/validate", response_model=ValidationResult)
async def validate_excel(file: UploadFile = File(...)):
    """
    Validate an uploaded Excel file containing project data
    """
    # Validate file type
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload an Excel file (.xlsx or .xls)"
        )
    
    # Create temporary file
    tmp_file_path = None
    try:
        # Create a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx') as tmp_file:
            # Save uploaded file
            shutil.copyfileobj(file.file, tmp_file)
            tmp_file_path = tmp_file.name
        
        # Close the file before processing
        file.file.close()
        
        # Validate Excel file
        validator = ExcelValidator(tmp_file_path)
        
        # Load and validate file structure
        try:
            validator.load_file()
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        # Perform validation
        total_rows, valid_rows, issues = validator.validate_all()
        
        # Create response
        result = ValidationResult(
            totalRows=total_rows,
            validRows=valid_rows,
            issues=issues,
            processedAt=datetime.now().isoformat(),
            fileName=file.filename
        )
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
    finally:
        # Clean up temporary file
        if tmp_file_path and os.path.exists(tmp_file_path):
            try:
                os.unlink(tmp_file_path)
            except PermissionError:
                # If file is still locked, it will be cleaned up later by the OS
                pass

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
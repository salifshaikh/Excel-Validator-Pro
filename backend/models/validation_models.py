# backend/models/validation_models.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Issue(BaseModel):
    row: int
    projectName: str
    issueType: str
    description: str
    severity: str
    startDate: Optional[str] = None
    endDate: Optional[str] = None

class ValidationResult(BaseModel):
    totalRows: int
    validRows: int
    issues: List[Issue]
    processedAt: str
    fileName: str
import os
import io
import re
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

try:
    import pymupdf as fitz
except ImportError:
    import fitz
import docx

ALLOWED_EXTENSIONS = {'pdf', 'docx'}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

def is_allowed_file(filename: str) -> bool:
    if '.' not in filename:
        return False
    ext = filename.rsplit('.', 1)[1].lower()
    return ext in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts clean text from a PDF file using PyMuPDF (fitz)."""
    text_chunks = []
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page_num in range(len(doc)):
            page = doc[page_num]
            page_text = page.get_text("text")
            if page_text:
                text_chunks.append(page_text.strip())
    
    full_text = "\n\n".join(text_chunks)
    return clean_extracted_text(full_text)

def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extracts text from a DOCX file using python-docx."""
    doc = docx.Document(io.BytesIO(file_bytes))
    text_chunks = []
    
    # Extract from paragraphs
    for para in doc.paragraphs:
        if para.text and para.text.strip():
            text_chunks.append(para.text.strip())
            
    # Extract from tables
    for table in doc.tables:
        for row in table.rows:
            row_text = [cell.text.strip() for cell in row.cells if cell.text.strip()]
            if row_text:
                text_chunks.append(" | ".join(dict.fromkeys(row_text)))  # de-duplicate merged cells
                
    full_text = "\n".join(text_chunks)
    return clean_extracted_text(full_text)

def clean_extracted_text(text: str) -> str:
    """Cleans up formatting quirks, multiple blank lines, and non-printable characters."""
    if not text:
        return ""
    # Normalize carriage returns
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    # Collapse multiple consecutive empty lines to two
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Remove null characters
    text = text.replace('\x00', '')
    return text.strip()

def extract_resume_text(file_bytes: bytes, filename: str) -> str:
    """Routes to appropriate parser based on extension."""
    if not is_allowed_file(filename):
        raise ValueError("Unsupported file format. Please upload a PDF or DOCX file.")
        
    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise ValueError("File exceeds maximum allowed size of 10MB.")
        
    ext = filename.rsplit('.', 1)[1].lower()
    if ext == 'pdf':
        text = extract_text_from_pdf(file_bytes)
    elif ext == 'docx':
        text = extract_text_from_docx(file_bytes)
    else:
        raise ValueError(f"Unsupported format: .{ext}")
        
    if not text or len(text.strip()) < 30:
        raise ValueError("Could not extract readable text from the uploaded resume. Ensure the file contains text and is not an image-only scan.")
        
    return text

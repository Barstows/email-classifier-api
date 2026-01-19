from fastapi import UploadFile
from PyPDF2 import PdfReader
import io

def extract_text(file: UploadFile) -> str:
    filename = file.filename.lower()

    if filename.endswith(".txt"):
        return file.file.read().decode("utf-8")

    if filename.endswith(".pdf"):
        pdf_bytes = file.file.read()
        reader = PdfReader(io.BytesIO(pdf_bytes))

        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        return text.strip()

    raise ValueError("Formato de arquivo não suportado")

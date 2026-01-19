from dotenv import load_dotenv
load_dotenv()

# === APP INITIALIZATION ===
from fastapi import FastAPI, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from app.services.text_extractor import extract_text
from app.utils.preprocess import preprocess
from app.services.classifier import classify_email
from app.services.responder import generate_response
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.email import EmailRequest, EmailResponse




app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# === HEALTH CHECK ===
@app.get("/")
def read_root():
    return {"status": "API running"}


@app.post("/process-email")
def process_email(
    text: str = Form(None),
    file: UploadFile = File(None)
):
    try:
        if file:
            email_text = extract_text(file)
        elif text:
            email_text = text
        else:
            return {
                "category": "Indefinido",
                "suggested_reply": "Nenhum conteúdo recebido"
            }

        email_text = preprocess(email_text)

        category = classify_email(email_text)
        reply = generate_response(category, email_text)

        source = "Arquivo" if file else "Texto colado"

        return {
            "source": source,
            "category": category,
            "suggested_reply": reply
        }
    
    except Exception as e:
        return {
                "source": source,
            "category": "Erro",
            "suggested_reply": str(e)
        }



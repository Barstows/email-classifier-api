# === EMAIL CLASSIFIER (GROQ) ===

import os
from groq import Groq
from app.utils.logger import logger

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def classify_email(text: str) -> str:
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "Você é um classificador de emails corporativos."
                },
                {
                    "role": "user",
                    "content": f"""
Classifique o email abaixo APENAS como:
- Produtivo
- Improdutivo

Email:
{text}

Responda SOMENTE com a palavra da categoria.
"""
                }
            ],
            temperature=0
        )

        result = response.choices[0].message.content.strip()

        # === NORMALIZAÇÃO ===
        result = result.replace(".", "").strip().capitalize()

        if result not in ["Produtivo", "Improdutivo"]:
            raise ValueError(f"Categoria inválida: {result}")

        logger.info(f"Classificação realizada: {result}")
        return result

    except Exception as e:
        logger.error(f"Erro ao classificar email: {e}")
        return "Indefinido"

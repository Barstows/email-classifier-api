# === GROQ AUTO RESPONDER ===

import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_response(category: str, text: str) -> str:
    if category == "Produtivo":
        prompt = f"""
Responda este email de forma natural, humana e profissional.
Sem formalidades excessivas.
Sem placeholders como [Nome], ou[Seu nome].

Email:
{text}
"""
    elif category == "Improdutivo":
        prompt = f"""
Responda educadamente e de forma breve agradecendo o contato.

Email:
{text}
"""
    else:
        return "Não foi possível gerar resposta para este email."

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6
    )

    return response.choices[0].message.content.strip()

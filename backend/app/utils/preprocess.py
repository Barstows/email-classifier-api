# === TEXT PREPROCESSING ===
import re

def preprocess(text: str) -> str:
    """
    Basic NLP preprocessing:
    - lowercase
    - remove extra spaces
    """
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()

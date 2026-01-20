// === FORM SUBMISSION ===
document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailText = document.getElementById("emailText").value.trim();
  const emailFile = document.getElementById("emailFile").files[0];
  const resultEl = document.getElementById("result");

  const API_URL = "https://email-classifier-api.onrender.com/process-email";

  if (!emailText && !emailFile) {
    alert("Por favor, cole um texto ou envie um arquivo.");
    return;
  }

  resultEl.textContent = "Processando...";

  const formData = new FormData();

  if (emailText) {
    formData.append("text", emailText);
  }

  if (emailFile) {
    formData.append("file", emailFile);
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Erro na API");
    }

    const data = await response.json();
    resultEl.textContent = JSON.stringify(data, null, 2);

  } catch (error) {
    console.error(error);
    resultEl.textContent = "Erro ao conectar com a API.";
  }
});

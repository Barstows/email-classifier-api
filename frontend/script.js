const API_URL = "https://email-classifier-api-backend.onrender.com/process-email";

async function processEmail() {
  const text = document.getElementById("emailText").value.trim();
  const fileInput = document.getElementById("emailFile");
  const loading = document.getElementById("loading");
  const resultDiv = document.getElementById("result");

  if (!text && fileInput.files.length === 0) {
    alert("Insira um texto ou envie um arquivo.");
    return;
  }

  loading.style.display = "block";
  resultDiv.style.display = "none";

  const formData = new FormData();

  if (text) {
    formData.append("text", text);
  }

  if (fileInput.files.length > 0) {
    formData.append("file", fileInput.files[0]);
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const data = await response.json();

    document.getElementById("category").innerText = data.category;
    document.getElementById("reply").innerText = data.suggested_reply;

    resultDiv.className =
      "result " + (data.category === "Produtivo" ? "produtivo" : "improdutivo");

    resultDiv.style.display = "block";

  } catch (err) {
    alert("Erro ao conectar com o backend.");
    console.error(err);
  } finally {
    loading.style.display = "none";
  }
}

const API_URL = "https://email-classifier-api-backend.onrender.com/process-email";

async function processEmail() {
  const text = document.getElementById("emailText").value.trim();
  const fileInput = document.getElementById("emailFile");
  const loading = document.getElementById("loading");
  const resultDiv = document.getElementById("result");

  if (!text && fileInput.files.length === 0) {
    alert("⚠️ Insira um texto ou envie um arquivo.");
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

    const isProdutivo = data.category === "Produtivo";

    // === RESULT DATA ===
    document.getElementById("source").innerText = data.source;
    document.getElementById("reply").innerText = data.suggested_reply;

    const badge = document.getElementById("categoryBadge");
    badge.innerText = data.category;
    badge.className =
      "category-badge " +
      (isProdutivo ? "badge-produtivo" : "badge-improdutivo");

    document.getElementById("resultIcon").innerText = isProdutivo ? "✅" : "ℹ️";
    document.getElementById("resultTitle").innerText =
      isProdutivo ? "Email Produtivo" : "Email Improdutivo";

    resultDiv.className =
      "result " + (isProdutivo ? "produtivo" : "improdutivo");

    resultDiv.style.display = "block";
    resultDiv.scrollIntoView({ behavior: "smooth" });

  } catch (err) {
    alert("❌ Erro ao conectar com o backend.");
    console.error(err);
  } finally {
    loading.style.display = "none";
  }
}

function clearForm() {
  document.getElementById("emailText").value = "";
  document.getElementById("emailFile").value = "";
  document.getElementById("fileSelected").style.display = "none";
  document.getElementById("result").style.display = "none";
}

// === FILE UI ===
document.getElementById("emailFile").addEventListener("change", () => {
  const file = document.getElementById("emailFile").files[0];
  const fileSelectedDiv = document.getElementById("fileSelected");

  if (file) {
    document.getElementById("fileName").innerText = file.name;
    fileSelectedDiv.style.display = "flex";
    document.getElementById("emailText").value = "";
  } else {
    fileSelectedDiv.style.display = "none";
  }
});

document.getElementById("emailText").addEventListener("input", () => {
  const text = document.getElementById("emailText").value.trim();
  if (text) {
    document.getElementById("emailFile").value = "";
    document.getElementById("fileSelected").style.display = "none";
  }
});

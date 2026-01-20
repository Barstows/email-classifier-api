# 📧 Classificador Inteligente de Emails

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green)

**Aplicação web que utiliza Inteligência Artificial para classificar emails como Produtivos ou Improdutivos e sugerir respostas automáticas adequadas a cada categoria.**

*Projeto desenvolvido como desafio técnico para a AutoU.*

[📺 Ver Demonstração](#-demonstração-online) • [🚀 Começar](#️-executando-localmente) • [📖 Documentação](#-documentação-da-api)

</div>

---

## 🌐 Demonstração Online

🔗 **Aplicação Frontend:**  
👉 https://email-classifier-ui.onrender.com

🔗 **API Backend (Swagger Docs):**  
👉 https://email-classifier-api-backend.onrender.com/docs#/

🎥 **Vídeo Demonstrativo:**  
👉 [Assistir no YouTube](https://youtube.com/seu-video)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Inteligência Artificial](#-uso-de-inteligência-artificial)
- [Executando Localmente](#️-executando-localmente)
- [Deploy na Nuvem](#-deploy-na-nuvem)
- [Documentação da API](#-documentação-da-api)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 💡 Sobre o Projeto

Este projeto foi desenvolvido para automatizar a triagem e classificação de emails em uma empresa do setor financeiro que recebe alto volume de mensagens diariamente. A solução utiliza IA para:

- **Classificar** emails em categorias (Produtivo/Improdutivo)
- **Sugerir respostas automáticas** contextualizadas
- **Liberar tempo** da equipe para atividades estratégicas

### Problema Resolvido

Antes: Equipe gastava horas classificando emails manualmente e respondendo mensagens repetitivas.

Depois: IA processa emails instantaneamente, classifica com precisão e sugere respostas prontas para aprovação.

---

## 🧠 Funcionalidades

✅ **Classificação Automática de Emails**
- Identifica emails produtivos (requerem ação)
- Identifica emails improdutivos (mensagens sociais)

✅ **Geração de Respostas com IA**
- Respostas contextualizadas e profissionais
- Tom adequado à categoria do email
- Prontas para envio ou edição

✅ **Múltiplas Formas de Entrada**
- 📝 Texto colado diretamente
- 📄 Upload de arquivo `.txt`
- 📑 Upload de arquivo `.pdf`

✅ **Interface Intuitiva**
- Design moderno e responsivo
- Feedback visual em tempo real
- Experiência otimizada para usuários não-técnicos

✅ **API REST Documentada**
- Swagger UI interativo
- Endpoints bem definidos
- Fácil integração com outros sistemas

---

## 🛠️ Tecnologias Utilizadas

### Backend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Python** | 3.11 | Linguagem principal |
| **FastAPI** | 0.104+ | Framework web assíncrono |
| **Groq API** | - | LLM (Llama 3.1) para IA |
| **PyPDF2** | 3.0+ | Extração de texto de PDFs |
| **python-multipart** | 0.0.6+ | Upload de arquivos |
| **python-dotenv** | 1.0+ | Gerenciamento de variáveis de ambiente |
| **Uvicorn** | 0.24+ | Servidor ASGI |

### Frontend

| Tecnologia | Propósito |
|------------|-----------|
| **HTML5** | Estrutura da página |
| **CSS3** | Estilização moderna com gradientes e animações |
| **JavaScript (ES6+)** | Interatividade e comunicação com API |
| **Fetch API** | Requisições HTTP assíncronas |

### Infraestrutura & DevOps

- **Render** - Hospedagem do backend e frontend
- **GitHub** - Controle de versão
- **Git** - Versionamento

---

## 🧩 Arquitetura

```
classificador-emails/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # Entry point da aplicação
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── classifier.py       # Lógica de classificação
│   │   │   ├── responder.py        # Geração de respostas
│   │   │   └── text_extractor.py   # Extração de texto (PDF/TXT)
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── email_schema.py     # Modelos Pydantic
│   │   │
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── config.py           # Configurações e variáveis
│   │
│   ├── requirements.txt            # Dependências Python
│   ├── .env.example                # Exemplo de variáveis de ambiente
│   └── README.md
│
├── frontend/
│   ├── index.html                  # Interface principal
│   └── README.md
│
├── .gitignore
├── LICENSE
└── README.md                       # Este arquivo
```

### Fluxo de Dados

```
┌─────────────┐
│   Usuário   │
└──────┬──────┘
       │
       │ 1. Envia email (texto/arquivo)
       ▼
┌─────────────────┐
│    Frontend     │
│   (HTML/CSS/JS) │
└──────┬──────────┘
       │
       │ 2. POST /process-email
       ▼
┌─────────────────┐
│  FastAPI Server │
└──────┬──────────┘
       │
       │ 3. Extrai texto
       ▼
┌─────────────────┐
│ Text Extractor  │
└──────┬──────────┘
       │
       │ 4. Classifica
       ▼
┌─────────────────┐
│   Groq API      │
│ (Llama 3.1 70B) │
└──────┬──────────┘
       │
       │ 5. Retorna categoria + resposta
       ▼
┌─────────────────┐
│    Frontend     │
│(Exibe resultado)│
└─────────────────┘
```

---

## 🤖 Uso de Inteligência Artificial

### Modelo Utilizado

A aplicação utiliza **Llama 3.1 70B** através da **Groq API**, um dos modelos de linguagem mais avançados disponíveis.

### Processo de Classificação

1. **Recebimento do email** - Texto ou arquivo enviado pelo usuário
2. **Pré-processamento** - Extração e limpeza do conteúdo
3. **Análise com LLM** - Modelo analisa o contexto e intenção
4. **Classificação** - Determina categoria (Produtivo/Improdutivo)
5. **Geração de resposta** - Cria resposta contextualizada

### Critérios de Classificação

#### 📊 **Email Produtivo**
- Solicitações de suporte técnico
- Pedidos de atualização de status
- Dúvidas sobre processos/sistemas
- Requisições que exigem ação
- Questões operacionais

#### 💬 **Email Improdutivo**
- Mensagens de felicitações (aniversários, feriados)
- Agradecimentos gerais
- Mensagens sociais
- Conteúdo que não requer ação imediata

### Prompt Engineering

O prompt foi cuidadosamente ajustado para:

- ✅ Respostas naturais e profissionais
- ✅ Tom adequado ao contexto brasileiro
- ✅ Evitar formatação artificial (Markdown excessivo)
- ✅ Clareza e objetividade
- ✅ Consistência nas classificações

---

## ▶️ Executando Localmente

### Pré-requisitos

- Python 3.11+
- pip (gerenciador de pacotes Python)
- Conta na [Groq](https://console.groq.com/) (para obter API Key)
- Git

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/SEU-USUARIO/classificador-emails.git
cd classificador-emails
```

### 2️⃣ Configurar o Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

### 3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/`:

```env
GROQ_API_KEY=sua_chave_groq_aqui
```

Para obter sua chave:
1. Acesse [console.groq.com](https://console.groq.com/)
2. Faça login ou crie uma conta
3. Vá em "API Keys"
4. Clique em "Create API Key"
5. Copie e cole no arquivo `.env`

### 4️⃣ Executar o Servidor Backend

```bash
uvicorn app.main:app --reload
```

O servidor estará rodando em: `http://127.0.0.1:8000`

Acesse a documentação interativa: `http://127.0.0.1:8000/docs`

### 5️⃣ Abrir o Frontend

Abra o arquivo `frontend/index.html` diretamente no navegador ou utilize um servidor local:

```bash
# Opção 1: Python HTTP Server
cd frontend
python -m http.server 8080

# Opção 2: VS Code Live Server
# Clique com botão direito em index.html > "Open with Live Server"
```

Acesse: `http://localhost:8080`

---

## ☁️ Deploy na Nuvem

### Deploy no Render

#### Backend (Web Service)

1. Acesse [render.com](https://render.com/) e faça login
2. Clique em "New +" > "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables:** Adicione `GROQ_API_KEY`
5. Clique em "Create Web Service"

#### Frontend (Static Site)

1. Clique em "New +" > "Static Site"
2. Conecte o mesmo repositório
3. Configure:
   - **Root Directory:** `frontend`
   - **Publish Directory:** `.`
4. Atualize a URL da API no `index.html`
5. Clique em "Create Static Site"

---

## 📖 Documentação da API

### Base URL

```
https://email-classifier-api-backend.onrender.com
```

### Endpoints

#### `POST /process-email`

Processa e classifica um email.

**Request:**

```bash
curl -X POST "https://email-classifier-api-backend.onrender.com/process-email" \
  -F "text=Olá, gostaria de saber o status da minha solicitação"
```

Ou com arquivo:

```bash
curl -X POST "https://email-classifier-api-backend.onrender.com/process-email" \
  -F "file=@email.txt"
```

**Response:**

```json
{
  "source": "texto",
  "category": "Produtivo",
  "suggested_reply": "Olá! Obrigado por entrar em contato. Vou verificar o status da sua solicitação e retorno em breve com uma atualização. Qual é o número do protocolo ou o assunto da sua solicitação?"
}
```

#### `GET /health`

Verifica status da API.

**Response:**

```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Swagger UI

Acesse a documentação interativa completa em:
```
https://https://email-classifier-api-backend.onrender.com/docs
```

---

## 🎯 Exemplos de Uso

### Exemplo 1: Email Produtivo

**Entrada:**
```
Prezados,

Estou com dificuldades para acessar o sistema desde ontem.
Já tentei resetar a senha mas continua dando erro.

Podem me ajudar?

Att,
João Silva
```

**Saída:**
```json
{
  "category": "Produtivo",
  "suggested_reply": "Olá João, obrigado por reportar o problema. Nossa equipe técnica já foi notificada e está trabalhando para resolver o acesso. Você receberá um retorno em até 2 horas úteis. Pedimos desculpas pelo transtorno."
}
```

### Exemplo 2: Email Improdutivo

**Entrada:**
```
Olá equipe!

Desejo a todos um Feliz Natal e um próspero Ano Novo!

Abraços,
Maria
```

**Saída:**
```json
{
  "category": "Improdutivo",
  "suggested_reply": "Olá Maria! Muito obrigado pelas felicitações! Desejamos a você também um Feliz Natal e um Ano Novo repleto de realizações. Abraços!"
}
```

---

## 🎨 Interface do Usuário

### Características da Interface

- ✨ **Design Moderno** - Gradientes e animações suaves
- 📱 **Responsivo** - Adaptável a desktop, tablet e mobile
- 🎯 **Intuitivo** - Não requer treinamento
- ⚡ **Rápido** - Feedback instantâneo
- ♿ **Acessível** - Contraste adequado e semântica HTML

---

## 🧪 Testes

### Testar Localmente

```bash
# Backend
cd backend
python -m pytest tests/

# Teste manual via curl
curl -X POST "http://127.0.0.1:8000/process-email" \
  -F "text=Teste de classificação"
```

---

## 🔒 Segurança

- ✅ Variáveis de ambiente para chaves sensíveis
- ✅ Validação de entrada com Pydantic
- ✅ Limitação de tamanho de arquivos
- ✅ CORS configurado adequadamente
- ✅ Sem armazenamento de dados pessoais

---

## 🚀 Melhorias Futuras

- [ ] Sistema de autenticação de usuários
- [ ] Histórico de classificações
- [ ] Múltiplas categorias personalizáveis
- [ ] Integração com Gmail/Outlook
- [ ] Dashboard de analytics
- [ ] Treinamento com feedback do usuário
- [ ] Suporte a múltiplos idiomas
- [ ] API de webhooks

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Seu Nome**

- GitHub: [@Barstows](https://github.com/Barstows)
- LinkedIn: [Arthur Leite Bastos](https://www.linkedin.com/in/arthurlbastos/)
- Email: arthurleitebastos@gmail.com


## 🙏 Agradecimentos

- [Groq](https://groq.com/) - Pela API de LLM
- [FastAPI](https://fastapi.tiangolo.com/) - Framework web
- [Render](https://render.com/) - Hospedagem gratuita
- [AutoU](https://autou.com.br/) - Pela oportunidade do desafio

---

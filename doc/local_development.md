# Exam AI – Local Development Setup

This guide explains how to configure and run all services of **Exam AI – Automatic Answer Sheet Evaluation System** locally.

Exam AI is an AI-powered platform that analyzes question papers, processes handwritten answer sheets, evaluates student responses, and generates detailed grading results.

---

## 1. Prerequisites

Install the following software:

- Node.js (v18 or later)
- npm (v9 or later)
- Python (v3.10 or later)
- Git
- Visual Studio Code (recommended)

## 2. Project Structure

The project contains four main components:

```text
sem7_project/
├── ai-service/
│   ├── QP-parsing/
│   └── AS-parsing/
├── backend/
├── frontend/
└── doc/
```

## 3. Environment Configuration

Create and configure the required `.env` files.

### A. Backend Environment

Location: `backend/.env`

```env
PORT=5000
FRONTEND_URL=http://localhost:5173

SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

AI_SERVICE_URL=http://localhost:3000
AI_EVALUATION_SERVICE_URL=http://localhost:8000
BACKEND_SERVICE_URL=http://localhost:5000

JWT_SECRET=your_secure_random_secret

RATE_LIMIT_AI_WINDOW_MS=900000
RATE_LIMIT_AI_MAX=20
RATE_LIMIT_AUTH_WINDOW_MS=900000
RATE_LIMIT_AUTH_MAX=15

ALLOW_REGISTRATION=true

QP_PARSING_SECRET=your_qp_service_secret
AS_PARSING_SECRET=your_as_service_secret
```

### B. Question Paper Parsing Environment

Location: `ai-service/QP-parsing/.env`

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
QP_PARSING_SECRET=your_qp_service_secret
PRIMARY_MODEL_NAME=your_primary_model
FALLBACK_MODEL_NAME=your_fallback_model
```

### C. Answer Sheet Evaluation Environment

Location: `ai-service/AS-parsing/.env`

```env
PORT=8000
GEMINI_API_KEY=your_gemini_api_key
AS_PARSING_SECRET=your_as_service_secret
MODEL_NAME=your_supported_gemini_model
```

### D. Frontend Environment

Location: `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:5000
```

**Security:** Never upload `.env` files, API keys, database secrets, or JWT secrets to a public repository.

---

## 4. Install Dependencies

Open a terminal in each service directory.

### Question Paper Parsing

```powershell
cd ai-service/QP-parsing
npm install
```

### Answer Sheet Evaluation

```powershell
cd ai-service/AS-parsing
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

### Backend

```powershell
cd backend
npm install
```

### Frontend

```powershell
cd frontend
npm install
```

---

## 5. Start All Four Services

Run each service in a separate VS Code terminal. Keep all four terminals running.

### Terminal 1: Question Paper Parsing Service

```powershell
cd ai-service/QP-parsing
npm start
```

Expected output:

```text
Listening to port 3000...
```

### Terminal 2: Answer Sheet Evaluation Service

```powershell
cd ai-service/AS-parsing
.\.venv\Scripts\Activate.ps1
python -m uvicorn app:app --host 0.0.0.0 --port 8000
```

Expected output:

```text
Uvicorn running on http://0.0.0.0:8000
```

### Terminal 3: Backend Server

```powershell
cd backend
npm start
```

Expected output:

```text
Backend server running on http://localhost:5000
```

### Terminal 4: Frontend Application

```powershell
cd frontend
npm run dev
```

Expected output:

```text
Local: http://localhost:5173/
```

---

## 6. Application Verification

1. Open `http://localhost:5173/` in a browser.
2. Register or sign in using a teacher account.
3. Upload a question paper PDF.
4. Allow the AI service to extract questions and marks.
5. Review the extracted questions and evaluation criteria.
6. Save the question paper.
7. Upload a student's handwritten answer sheet PDF.
8. Start the evaluation process.
9. Review the generated marks and question-wise feedback.
10. Verify that the evaluation record appears in the dashboard.

---

## 7. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React 19, Vite, JavaScript |
| Backend | Node.js, Express |
| Question Paper Processing | Node.js, Gemini API |
| Answer Sheet Evaluation | Python, FastAPI, Gemini API |
| Database | Supabase |
| Authentication | JWT |
| Document Processing | PDF processing and AI analysis |

---

## 8. Troubleshooting

### Frontend cannot connect to backend

- Check that the backend is running on port 5000.
- Verify `VITE_BACKEND_URL` in the frontend `.env` file.
- Restart the frontend after environment changes.

### Question paper parsing fails

- Verify the Gemini API key.
- Check that the QP parsing service is running on port 3000.
- Verify the service secret configuration.

### Answer sheet evaluation fails

- Check that the Python service is running on port 8000.
- Verify the Gemini model name and API key.
- Check the AS-parsing terminal for API errors.
- A 503 response may indicate temporary model service unavailability.

### Supabase connection fails

- Verify the Supabase project URL.
- Check the service-role key.
- Confirm that the database schema has been created.
- Ensure the Supabase project is active.

### Python virtual environment activation fails

Run the following command in PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 9. Important Notes

- Keep all four services running during application use.
- Do not expose API keys or database credentials.
- Use test answer sheets when demonstrating the system.
- Verify AI-generated marks before treating them as final academic grades.
- Maintain appropriate acknowledgement of third-party libraries and adapted source code.

**Exam AI – Automatic Answer Sheet Evaluation System**
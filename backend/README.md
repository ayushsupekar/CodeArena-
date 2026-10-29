# CodeArena — Judge0 Integration

## Architecture

```
Browser (Next.js)
    ↓  POST /api/code/run
Express Backend (port 4000)
    ↓  POST /submissions?wait=true
Judge0 CE (Docker, port 2358)
    ↓  result JSON
Express Backend
    ↓  normalized response
Browser → displays output
```

## Prerequisites

- Node.js 18+
- Judge0 CE running locally via Docker on port 2358

## Installation

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd ..   # root CodeArena folder
npm install
```

## Running

### 1. Start Judge0 (Docker must be running)
```bash
# Already running on http://localhost:2358
```

### 2. Start Express backend
```bash
cd backend
npm run dev
# Runs on http://localhost:4000
```

### 3. Start Next.js frontend
```bash
cd ..
npm run dev
# Runs on http://localhost:3000
```

### 4. Open compiler
Navigate to: http://localhost:3000/compiler

---

## API Documentation

### POST /api/code/run
Run code via Judge0.

**Request**
```json
{
  "source_code": "print('Hello')",
  "language_id": 71,
  "stdin": ""
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "stdout": "Hello\n",
    "stderr": null,
    "compile_output": null,
    "message": null,
    "time": "0.02",
    "memory": 5120,
    "status": { "id": 3, "description": "Accepted" }
  }
}
```

### GET /api/code/languages
Returns supported languages.

**Response**
```json
{
  "success": true,
  "data": [
    { "id": 71, "name": "Python (3.8.1)" },
    { "id": 63, "name": "JavaScript (Node.js 12.14.0)" },
    ...
  ]
}
```

### GET /health
Health check.

---

## Supported Languages

| Language   | ID |
|------------|----|
| Python     | 71 |
| JavaScript | 63 |
| Java       | 62 |
| C++        | 54 |
| C          | 50 |

---

## Environment Variables

### backend/.env
```
JUDGE0_URL=http://localhost:2358
PORT=4000
CLIENT_URL=http://localhost:3000
JUDGE0_TIMEOUT=10000
```

### .env / .env.local (Next.js root)
```
JUDGE0_API_URL=http://localhost:2358
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

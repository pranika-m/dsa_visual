# DSA Visualizer

Interactive web app to learn data structures and algorithms with:
- concept editorials
- step-by-step visualizations
- code execution sandbox

## Stack
- Backend: Django + Django REST Framework + SQLite
- Frontend: React + Vite + D3.js + Monaco Editor

## Project Structure
```text
dsavisual/   # Django backend
frontend/    # React frontend
```

## Run Locally

### 1. Backend
```bash
cd dsavisual
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py shell < seed_concepts.py
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000`.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Base
The frontend client is configured to call:
- `http://127.0.0.1:8000/api`

Main endpoints:
- `GET /api/categories/`
- `GET /api/categories/<slug>/`
- `GET /api/topics/<slug>/`
- `GET /api/concepts/<slug>/`
- `GET /api/concepts/<slug>/visualization/`
- `POST /api/execute/`

## Notes
- If category cards do not load, ensure Django server is running.
- Seed data again with:
```bash
cd dsavisual
python manage.py shell < seed_concepts.py
```

# DSA Visualization Integration and Flow Map

This file explains how the full system is integrated and how data flows from UI to backend and database.

## 1. High-Level Integration

```text
React (Vite SPA)
  ├─ Pages/Components
  ├─ Static content (frontend/src/content/*.js)
  └─ API Client (frontend/src/api/client.js)
           │
           ▼
Django REST API (/api/v1/*)
  ├─ core app       -> categories/topics
  ├─ concepts app   -> concept/editorial sections/snippets
  └─ visualizer app -> visualization config + code execution
           │
           ▼
SQLite (dev database)
```

## 2. Frontend Route Flow

Source: `frontend/src/App.jsx`

- `/` -> `LandingPage`
- `/category/:slug` -> `CategoryPage`
- `/topics/:slug` -> `TopicListPage`
- `/learn/:slug` -> `EditorialPage`

User journey:

1. Landing page loads categories.
2. User selects a category -> topic list.
3. User selects a topic -> concept list.
4. User selects a concept -> editorial + visualization page.
5. Optional sandbox execution sends code to backend `/execute/`.

## 3. API Flow Map

Source: `frontend/src/api/client.js` + Django URL configs.

```text
Frontend call                          Backend endpoint
----------------------------------------------------------------
getCategories()                     -> GET  /api/v1/categories/
getCategoryBySlug(slug)             -> GET  /api/v1/categories/:slug/
getTopicBySlug(slug)                -> GET  /api/v1/topics/:slug/
getConceptBySlug(slug)              -> GET  /api/v1/concepts/:slug/
getVisualizationConfig(slug)        -> GET  /api/v1/concepts/:slug/visualization/
executeCode(payload)                -> POST /api/v1/execute/
```

## 4. Backend App Responsibilities

### `core` app
- Models: `Category`, `Topic`
- Provides category and topic listing/detail endpoints.

### `concepts` app
- Models: `Concept`, `ConceptSection`, `CodeSnippet`
- Provides full concept editorial content.

### `visualizer` app
- Models: `VisualizationConfig`, `AnimationStep`
- Provides visualization config.
- Executes sandbox code (`/execute/`) via service layer.

## 5. Data Model Flow

```text
Category (1) ── (N) Topic (1) ── (N) Concept (1) ── (N) ConceptSection (1) ── (N) CodeSnippet
                                           │
                                           └── (1) VisualizationConfig (1) ── (N) AnimationStep
```

## 6. Editorial Page Runtime Flow (`/learn/:slug`)

```text
EditorialPage mounts
  ├─ GET /concepts/:slug/                -> concept sections + snippets
  ├─ GET /concepts/:slug/visualization/  -> viz defaults/actions
  └─ getContentBySlug(slug)              -> local static fallback content

merge data -> render:
  - LearningPath
  - Visualization component
  - Code panel / Sandbox panel
```

## 7. Sandbox Execution Flow

```text
User writes code in SandboxPanel
   -> executeCode(payload)
   -> POST /api/v1/execute/
   -> visualizer view validates payload
   -> execution service runs code
   -> returns { success, steps, output, error, execution_time_ms }
   -> frontend maps steps to animation frames
```

## 8. URL Composition (Django)

Source: `dsavisual/dsavisual/urls.py`

- `core.urls`, `concepts.urls`, and `visualizer.urls` are mounted under `/api/v1/`.
- This keeps all REST endpoints versioned and centralized.

## 9. Operational Dependency Notes

- Frontend expects backend at `http://127.0.0.1:8000/api/v1`.
- Missing topics/categories in UI usually means:
  - backend server is not running, or
  - database has no seeded data.
- Data bootstrap sequence:
  1. `python manage.py migrate`
  2. `python manage.py loaddata core/fixtures/initial_data.json`
  3. `python seed_concepts.py` (for concept/editorial + visualization records)

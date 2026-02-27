# DSA Visualization Tool

An interactive web application for learning **Data Structures & Algorithms** through step-by-step visualizations, guided editorials, and a live coding sandbox.

**Tech Stack:** Django 6 + Django REST Framework · React 18 + Vite 5 · D3.js · Monaco Editor · SQLite (dev)

---

For architecture and data flow details, see **INTEGRATION_FLOW_MAP.md**.

## Table of Contents

- [Project Structure](#project-structure)
- [How It All Connects](#how-it-all-connects)
- [User Workflow](#user-workflow)
- [Data Flow Diagram](#data-flow-diagram)
- [Backend (Django)](#backend-django)
  - [Django Apps & Models](#django-apps--models)
  - [API Endpoints](#api-endpoints)
  - [Code Execution Engine](#code-execution-engine)
- [Frontend (React)](#frontend-react)
  - [Routing](#routing)
  - [Pages](#pages)
  - [Component Map](#component-map)
  - [Content System](#content-system)
  - [API Client](#api-client)
- [Connection Points](#connection-points)
- [Getting Started](#getting-started)

---

## Project Structure

```
DSA Visualization/
│
├── dsavisual/                    ← Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── seed_concepts.py          ← DB seed script
│   ├── dsavisual/                ← Django project settings
│   │   ├── settings.py
│   │   ├── urls.py               ← Root URL config (mounts all apps)
│   │   ├── wsgi.py / asgi.py
│   │
│   ├── core/                     ← App 1: Categories & Topics
│   │   ├── models.py             ← Category, Topic
│   │   ├── serializers.py
│   │   ├── views.py              ← CategoryList, CategoryDetail, TopicDetail
│   │   ├── urls.py               ← /categories/, /topics/<slug>/
│   │
│   ├── concepts/                 ← App 2: Concepts & Editorial Content
│   │   ├── models.py             ← Concept, ConceptSection, CodeSnippet
│   │   ├── serializers.py
│   │   ├── views.py              ← ConceptDetail
│   │   ├── urls.py               ← /concepts/<slug>/
│   │
│   └── visualizer/               ← App 3: Visualization & Execution
│       ├── models.py             ← VisualizationConfig, AnimationStep
│       ├── serializers.py
│       ├── views.py              ← VisualizationConfig, CodeExecution
│       ├── urls.py               ← /concepts/<slug>/visualization/, /execute/
│       └── services/
│           └── executor.py       ← Python code execution with line tracing
│
├── frontend/                     ← React SPA (Vite)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx              ← Entry point (ReactDOM.render)
│       ├── App.jsx               ← Router + Layout
│       │
│       ├── api/
│       │   └── client.js         ← Axios API client (all backend calls)
│       │
│       ├── content/              ← Static topic content (13 files)
│       │   ├── index.js          ← Slug → content mapper
│       │   ├── bubble-sort.js
│       │   ├── selection-sort.js
│       │   ├── merge-sort.js
│       │   ├── quick-sort.js
│       │   ├── linear-search.js
│       │   ├── binary-search.js
│       │   ├── singly-linked-list.js
│       │   ├── doubly-linked-list.js
│       │   ├── binary-search-tree.js
│       │   ├── stack.js
│       │   ├── queue.js
│       │   ├── bfs.js
│       │   └── dfs.js
│       │
│       ├── pages/
│       │   ├── LandingPage.jsx   ← Home / hero + category cards
│       │   ├── CategoryPage.jsx  ← Topics grid for a category
│       │   ├── TopicListPage.jsx ← (Legacy) topic listing
│       │   └── EditorialPage.jsx ← ★ Main learn page (viz + code + editorial)
│       │
│       ├── components/
│       │   ├── common/
│       │   │   ├── Navbar.jsx
│       │   │   └── ResizablePanel.jsx
│       │   ├── editorial/
│       │   │   ├── LearningPath.jsx       ← Left-panel step-by-step guide
│       │   │   ├── CompleteCode.jsx
│       │   │   └── LineExplanation.jsx
│       │   ├── sandbox/
│       │   │   └── SandboxPanel.jsx       ← Monaco editor + run button
│       │   └── visualizer/
│       │       ├── CompactArrayViz.jsx    ← D3 array-bar visualization
│       │       ├── CompleteCodeView.jsx   ← Syntax-highlighted code panel
│       │       ├── CurrentLineExplanation.jsx
│       │       ├── AlgorithmControls.jsx  ← Run/Sort button + custom input
│       │       ├── AnimationControls.jsx  ← Play/Pause/Step/Speed controls
│       │       ├── PlaybackControls.jsx
│       │       ├── CodeViewer.jsx
│       │       └── VizCanvas.jsx
│       │
│       └── styles/
│           └── global.css                 ← Design tokens, palette, fonts
│
├── ARCHITECTURE.md               ← Full technical architecture doc
├── IMPLEMENTATION_GUIDE.md       ← Step-by-step build guide
└── README.md                     ← ★ You are here
```

---

## How It All Connects

```
┌───────────────────────────────────────────────────────────────────────┐
│                          BROWSER (React SPA)                          │
│                                                                       │
│  Landing ──→ Category ──→ Editorial Page (learn/:slug)               │
│  Page        Page           │                                         │
│              /category/     ├── Left:   LearningPath   ← content/*.js │
│              :slug          ├── Middle: CompactArrayViz ← animSteps   │
│                             │           CompleteCodeView ← code       │
│                             └── Right:  SandboxPanel (optional)       │
│                                                                       │
│  ┌─────────────────────┐     ┌────────────────────────┐              │
│  │  content/index.js   │     │    api/client.js       │              │
│  │  (static content)   │     │    (Axios HTTP calls)  │              │
│  │  • code per topic   │     │    ↓                   │              │
│  │  • learning steps   │     │    GET /categories/    │              │
│  │  • default arrays   │     │    GET /concepts/:slug │              │
│  └─────────────────────┘     │    GET /visualization/ │              │
│                               │    POST /execute/     │              │
│                               └────────┬───────────────┘              │
└────────────────────────────────────────┼──────────────────────────────┘
                                         │  REST API (HTTP JSON)
                                         │  http://127.0.0.1:8000/api/v1
                                         ▼
┌───────────────────────────────────────────────────────────────────────┐
│                        DJANGO BACKEND                                 │
│                                                                       │
│  dsavisual/urls.py ─── mounts all app URLs under /api/v1/            │
│       │                                                               │
│       ├── core/       GET /categories/          → Category list       │
│       │               GET /categories/:slug/    → Category + topics   │
│       │               GET /topics/:slug/        → Topic detail        │
│       │                                                               │
│       ├── concepts/   GET /concepts/:slug/      → Concept + sections  │
│       │                                            + code_snippets    │
│       │                                                               │
│       └── visualizer/ GET  /concepts/:slug/visualization/ → viz config│
│                       POST /execute/            → run Python code     │
│                              │                    (executor.py)       │
│                              ▼                                        │
│                     ┌────────────────────┐                            │
│                     │ executor.py        │                            │
│                     │ • spawns subprocess│                            │
│                     │ • sys.settrace()   │                            │
│                     │ • captures locals  │                            │
│                     │ • returns steps[]  │                            │
│                     └────────────────────┘                            │
│                                                                       │
│  DATABASE (SQLite)                                                    │
│  Category ──1:N──▶ Topic ──1:N──▶ Concept ──1:N──▶ ConceptSection    │
│                                       │                ──1:N──▶ CodeSnippet
│                                       │                               │
│                                  1:1──▶ VisualizationConfig          │
│                                              ──1:N──▶ AnimationStep  │
└───────────────────────────────────────────────────────────────────────┘
```

---

## User Workflow

```
 ① Landing Page (/)
    User sees hero section + category cards (Sorting, Searching, etc.)
    Data source: GET /api/v1/categories/
                           │
                           ▼
 ② Category Page (/category/:slug)
    User clicks a category → sees all topics in that category
    Data source: GET /api/v1/categories/:slug/  (includes nested topics)
                           │
                           ▼
 ③ Editorial Page (/learn/:slug)
    User clicks a topic → enters the main learning experience
    Data sources:
      • GET /api/v1/concepts/:slug/            → editorial sections
      • GET /api/v1/concepts/:slug/visualization/ → viz config
      • content/:slug.js (static import)       → code, steps, defaultArray
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    LEFT PANEL       MIDDLE PANEL     RIGHT PANEL
    LearningPath     CompactArrayViz   (SandboxPanel
    • 6 steps        • D3 bar chart     when toggled)
    • markdown       • animate steps
    • progress       CompleteCodeView
    tracking         • syntax highlight
                     • line tracking
                     AnimationControls
                     • Play/Pause/Step
                     • Speed control
                           │
                           ▼
 ④ Sandbox (optional toggle)
    Replaces code panel with Monaco editor
    User writes/edits code → clicks Run
    Data flow: POST /api/v1/execute/  { code, language }
                           │
                           ▼
    executor.py traces execution line-by-line
    Returns: { steps: [{line, locals}], success, execution_time_ms }
    Frontend converts steps → animation frames → plays on CompactArrayViz
```

---

## Data Flow Diagram

### A. Page Load Flow (Editorial Page)

```
EditorialPage mounts
       │
       ├──→ getConceptBySlug(slug)         → API call → sets concept state
       ├──→ getVisualizationConfig(slug)   → API call → sets vizConfig state
       └──→ getContentBySlug(slug)         → local import → topicContent
                    │
                    ▼
       Merge data with priority chain:
         Code:   DB finalCodeData  →  topicContent.code  →  placeholder
         Array:  vizConfig.default_input.array  →  topicContent.defaultArray  →  [5,3,8,1,2]
         Steps:  topicContent.steps  →  []
                    │
                    ▼
       generateAnimationSteps(array, slug)
         → detects algorithm type from slug
         → runs algorithm simulation step-by-step
         → produces: [{array, line, comparing, swapped, description}, ...]
                    │
                    ▼
       Render:
         CompactArrayViz  ← currentStep.array, comparing, swapped
         CompleteCodeView  ← codeToShow, currentLine
         LearningPath      ← topicContent.steps
         AnimationControls ← play/pause/step callbacks
```

### B. Sandbox Execution Flow

```
User types code in Monaco Editor
       │
       ▼
  Click "Run" → SandboxPanel calls api/client.executeCode()
       │
       ▼
  POST /api/v1/execute/  { code: "...", language: "python" }
       │
       ▼
  visualizer/views.py → executor.execute_python_code()
       │
       ├── Writes code to temp file with sys.settrace() wrapper
       ├── Spawns subprocess with timeout (5s)
       ├── Captures trace: {line, locals} per executed line
       └── Returns JSON: { success, steps[], output, execution_time_ms }
       │
       ▼
  Frontend handleExecutionResult(steps)
       → Converts to animation frames
       → Plays on CompactArrayViz
```

---

## Backend (Django)

### Django Apps & Models

| App | Model | Purpose | Key Fields |
|-----|-------|---------|------------|
| **core** | `Category` | Top-level grouping (Sorting, Searching…) | `name`, `slug`, `icon`, `display_order` |
| **core** | `Topic` | Individual topic within a category | `category` (FK), `title`, `slug`, `difficulty` |
| **concepts** | `Concept` | Learnable concept tied to a topic | `topic` (FK), `title`, `slug`, `overview` |
| **concepts** | `ConceptSection` | Part of a concept's editorial | `concept` (FK), `section_type`, `content` (markdown) |
| **concepts** | `CodeSnippet` | Code embedded in a section | `section` (FK), `language`, `code`, `is_final_code` |
| **visualizer** | `VisualizationConfig` | Viz type + defaults for a concept | `concept` (1:1), `viz_type`, `default_input` (JSON) |
| **visualizer** | `AnimationStep` | Pre-built animation keyframes | `config` (FK), `action_name`, `keyframes` (JSON) |

**Relationships:**

```
Category  ──1:N──▶  Topic  ──1:N──▶  Concept  ──1:N──▶  ConceptSection  ──1:N──▶  CodeSnippet
                                         │
                                    1:1──▶  VisualizationConfig  ──1:N──▶  AnimationStep
```

### API Endpoints

All endpoints are under `http://127.0.0.1:8000/api/v1/`:

| Method | URL | View | Returns |
|--------|-----|------|---------|
| GET | `/categories/` | `core.CategoryListView` | All categories (with nested topics) |
| GET | `/categories/:slug/` | `core.CategoryDetailView` | Single category + topics |
| GET | `/topics/:slug/` | `core.TopicDetailView` | Topic detail |
| GET | `/concepts/:slug/` | `concepts.ConceptDetailView` | Concept + sections + code snippets |
| GET | `/concepts/:slug/visualization/` | `visualizer.VisualizationConfigView` | Viz type, default input, actions |
| POST | `/execute/` | `visualizer.CodeExecutionView` | Traced execution steps |

### Code Execution Engine

Located at `visualizer/services/executor.py`:

1. Receives user code + optional input data
2. Wraps code with a `sys.settrace()` tracer that captures `{line, locals}` at each line
3. Compiles and executes in a subprocess with a 5-second timeout
4. Returns structured trace data: steps array, output, errors, timing

---

## Frontend (React)

### Routing

Defined in `App.jsx`:

| Route | Page Component | Data Source |
|-------|---------------|-------------|
| `/` | `LandingPage` | `GET /categories/` |
| `/category/:slug` | `CategoryPage` | `GET /categories/:slug/` |
| `/topics/:slug` | `TopicListPage` | `GET /topics/:slug/` |
| `/learn/:slug` | `EditorialPage` | API + `content/:slug.js` |

### Pages

| Page | File | Purpose |
|------|------|---------|
| **LandingPage** | `pages/LandingPage.jsx` | Hero section, category cards, stats |
| **CategoryPage** | `pages/CategoryPage.jsx` | Grid of topics for a selected category |
| **TopicListPage** | `pages/TopicListPage.jsx` | Legacy topic list (being phased out) |
| **EditorialPage** | `pages/EditorialPage.jsx` | ★ Core learning experience — 3-panel layout |

### Component Map

```
EditorialPage
├── ResizablePanel (wraps left panel, draggable width)
│   └── LearningPath              ← receives topicContent.steps[]
│       • Accordion of 6 learning steps
│       • Renders markdown (react-markdown + remark-gfm)
│       • Progress tracking (completed steps)
│
├── CompactArrayViz               ← receives currentStep.{array, comparing, swapped, sorted}
│   • D3.js SVG bar chart
│   • Color-coded: default (#6366f1), comparing (#f59e0b), swapped (#ef4444), sorted (#10b981)
│   • Index labels below bars
│
├── CompleteCodeView              ← receives codeToShow, currentLine
│   • react-syntax-highlighter (Prism)
│   • Highlights the current executing line
│   │
│   └── (OR) SandboxPanel         ← toggles to replace code view
│       • @monaco-editor/react
│       • Calls POST /execute/ on run
│       • Feeds execution steps back to animation
│
├── CurrentLineExplanation        ← receives code, currentLine
│   • AI-style explanation of what the current line does
│
├── AlgorithmControls             ← triggers handleRun(array)
│   • "Sort" / "Run" button
│   • Custom array input
│
└── AnimationControls             ← play/pause/step-forward/step-back/speed
    • USFCA-style transport bar
    • Speed slider (0.5x – 4x)
    • Step counter (e.g., "Step 12/45")
```

### Content System

Each topic has a static JS file in `src/content/` with this shape:

```javascript
{
  slug: 'bubble-sort',
  title: 'Bubble Sort',
  defaultArray: [64, 34, 25, 12, 22, 11, 90],  // Initial viz data
  code: {
    language: 'python',
    code: `def bubble_sort(arr): ...`            // Displayed in code panel
  },
  steps: [                                        // Left-panel learning path
    {
      id: 'intro',
      title: '1. What is Bubble Sort?',
      icon: '📚',
      description: 'Short subtitle',
      content: '## Markdown content ...'          // Full lesson text
    },
    // ... 6 steps total per topic
  ]
}
```

The `content/index.js` maps **both** topic slugs (`bubble-sort`) and concept DB slugs (`bubble-sort-algorithm`) to the same content object, with fallback suffix-stripping for flexible matching.

**Covered topics (13):**
Bubble Sort · Selection Sort · Merge Sort · Quick Sort · Linear Search · Binary Search · Singly Linked List · Doubly Linked List · Binary Search Tree · Stack · Queue · BFS · DFS

### API Client

`src/api/client.js` — Axios instance pointed at `http://127.0.0.1:8000/api/v1`:

| Function | HTTP Call | Used By |
|----------|-----------|---------|
| `getCategories()` | `GET /categories/` | LandingPage |
| `getCategoryBySlug(slug)` | `GET /categories/:slug/` | CategoryPage |
| `getTopicBySlug(slug)` | `GET /topics/:slug/` | TopicListPage |
| `getConceptBySlug(slug)` | `GET /concepts/:slug/` | EditorialPage |
| `getVisualizationConfig(slug)` | `GET /concepts/:slug/visualization/` | EditorialPage |
| `executeCode(payload)` | `POST /execute/` | SandboxPanel |

---

## Connection Points

This is where every piece plugs into every other piece:

### 1. Landing Page → Backend

```
LandingPage.jsx  →  getCategories()  →  GET /api/v1/categories/
                                              │
                                              ▼
                                    core/views.CategoryListView
                                              │
                                              ▼
                                    core/models.Category (DB)
```

### 2. Category Page → Backend

```
CategoryPage.jsx  →  getCategoryBySlug(slug)  →  GET /api/v1/categories/:slug/
                                                       │
                                                       ▼
                                             core/views.CategoryDetailView
                                                       │
                                                       ▼
                                             Category + related Topics (DB)
```

### 3. Category Page → Editorial Page

```
CategoryPage renders <Link to={`/learn/${topic.slug}`}>
                              │
                              ▼
                    React Router matches /learn/:slug
                              │
                              ▼
                    EditorialPage receives slug via useParams()
```

### 4. Editorial Page → Backend (concept + viz config)

```
EditorialPage.jsx
   │
   ├──→ getConceptBySlug(slug)          →  concepts/views.ConceptDetailView
   │                                          → Concept + ConceptSections + CodeSnippets
   │
   └──→ getVisualizationConfig(slug)    →  visualizer/views.VisualizationConfigView
                                              → VisualizationConfig + viz_type + default_input
```

### 5. Editorial Page → Static Content

```
EditorialPage.jsx
   │
   └──→ getContentBySlug(slug)          →  content/index.js
           │                                    → looks up slug in slugMap
           ▼                                    → returns { code, steps, defaultArray }
   topicContent feeds into:
     • LearningPath (steps)
     • CompleteCodeView (code, fallback)
     • CompactArrayViz (defaultArray → generateAnimationSteps)
```

### 6. Animation Pipeline

```
defaultArray (from vizConfig or topicContent)
       │
       ▼
generateAnimationSteps(array, slug)    ← in EditorialPage.jsx
       │  Detects algorithm from slug
       │  Simulates algorithm step-by-step
       ▼
animationSteps[] = [
  { array: [...], line: 5, comparing: [0,1], swapped: [], description: "..." },
  ...
]
       │
       ├──→ CompactArrayViz    ← array, comparing, swapped (D3 renders bars)
       ├──→ CompleteCodeView   ← currentLine (highlights executing line)
       └──→ AnimationControls  ← currentStep / totalSteps + transport buttons
```

### 7. Sandbox → Backend → Animation

```
SandboxPanel (Monaco Editor)
       │
       ▼  User clicks "Run"
executeCode({ code, language: 'python' })   →   POST /api/v1/execute/
       │                                                │
       │                                                ▼
       │                                      visualizer/views.CodeExecutionView
       │                                                │
       │                                                ▼
       │                                      executor.execute_python_code()
       │                                        → spawns subprocess
       │                                        → sys.settrace captures {line, locals}
       │                                        → returns steps[]
       │           ◄────────────────────────────────────┘
       ▼
handleExecutionResult(steps)
       → converts to animation frames
       → sets animationSteps + starts playback
       → CompactArrayViz animates the result
```

### 8. Design System Connections

```
styles/global.css
  │  Defines CSS custom properties:
  │    --color-accent-primary: #7c3aed  (purple)
  │    --color-accent-secondary: #14b8a6 (teal)
  │    --color-accent-tertiary: #ec4899  (pink)
  │    --font-heading: 'Outfit'
  │    --font-body: 'DM Sans'
  │    --font-ui: 'Space Grotesk'
  │    --font-mono: 'JetBrains Mono'
  │
  └──→ Consumed by every component's CSS file
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd dsavisual

# Create virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed initial data
python seed_concepts.py

# Start server
python manage.py runserver     # → http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev                    # → http://localhost:5173
```

### Both Running Together

| Service | URL | Purpose |
|---------|-----|---------|
| Django API | `http://127.0.0.1:8000/api/v1/` | REST endpoints |
| Django Admin | `http://127.0.0.1:8000/admin/` | Content management |
| Vite Dev Server | `http://localhost:5173/` | React SPA (proxies API) |

---

## Key Libraries

| Library | Version | Used For |
|---------|---------|----------|
| Django | 6.x | Backend framework |
| Django REST Framework | 3.15 | REST API serialization |
| django-cors-headers | 4.3 | CORS for frontend dev server |
| RestrictedPython | 7.0 | Safe code execution |
| React | 18.3 | UI framework |
| Vite | 5.4 | Build tool + dev server |
| D3.js | 7.9 | Array/bar visualization |
| @monaco-editor/react | 4.6 | Sandbox code editor |
| react-syntax-highlighter | 15.6 | Code panel highlighting |
| react-markdown | 9.0 | Markdown in learning path |
| Axios | 1.7 | HTTP client for API calls |
| react-router-dom | 6.28 | Client-side routing |




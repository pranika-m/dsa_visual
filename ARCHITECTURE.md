# DSA Visualization Tool - Complete Technical Architecture

> **Version**: 2.0  
> **Last Updated**: February 26, 2026  
> **Tech Stack**: Django 4.x + DRF + React 18 + PostgreSQL

## Table of Contents

### Part 1: Core Architecture
1. [System Overview & Design Philosophy](#1-system-overview--design-philosophy)
2. [Complete Technology Stack](#2-complete-technology-stack)
3. [Database Architecture & Schema](#3-database-architecture--schema)
4. [Backend Implementation](#4-backend-implementation)
5. [Frontend Implementation](#5-frontend-implementation)

### Part 2: Feature Implementation
6. [API Specifications with Code](#6-api-specifications-with-code)
7. [Component Library](#7-component-library)
8. [Animation System](#8-animation-system)
9. [Code Execution Engine](#9-code-execution-engine)
10. [State Management](#10-state-management)

### Part 3: Advanced Features
11. [User Authentication & Progress](#11-user-authentication--progress)
12. [Real-time Collaboration](#12-real-time-collaboration)
13. [Performance Optimization](#13-performance-optimization)
14. [Testing Strategy](#14-testing-strategy)
15. [Deployment & DevOps](#15-deployment--devops)

---

## 1. System Overview & Design Philosophy

### 1.1 Architecture Philosophy

**Core Principles**:
- **Modularity**: Each Django app handles one domain (Core/Concepts/Visualizer)
- **API-First**: Backend exposes REST APIs; frontend is a pure SPA client
- **Real-time Feedback**: Animation synced with code execution line-by-line
- **Educational Focus**: Progressive disclosure of complexity
- **Extensibility**: Easy to add new algorithms, visualizations, languages

### 1.2 High-Level System Architecture

```
┌────────────────────────────────────────────────────────────────────────────┐
│                            CLIENT TIER (React SPA)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Landing Page │→ │ Topic List   │→ │Editorial Page│← │ Sandbox Panel│  │
│  │              │  │ (Concepts)   │  │ (3-Panel)    │  │ (Monaco)     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │
│         ↓                   ↓                  ↓                ↓          │
└─────────|───────────────────|──────────────────|────────────────|──────────┘
          │                   │                  │                │
          └───────────────────┴──────────────────┴────────────────┘
                                      │
                            [REST API over HTTPS]
                                      │
┌────────────────────────────────────────────────────────────────────────────┐
│                       APPLICATION TIER (Django + DRF)                      │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────┐    ┌───────────┐ │
│  │  Core App   │    │Concepts App │    │Visualizer App│    │Auth/Users │ │
│  │ Categories  │    │  Sections   │    │  Animation   │    │ Progress  │ │
│  │   Topics    │    │   Snippets  │    │  Executor    │    │  Tracker  │ │
│  └─────────────┘    └─────────────┘    └──────────────┘    └───────────┘ │
│         │                   │                   │                  │       │
│         └───────────────────┴───────────────────┴──────────────────┘       │
└─────────────────────────────────────|──────────────────────────────────────┘
                                      │
                            [Database Queries/ORM]
                                      │
┌────────────────────────────────────────────────────────────────────────────┐
│                         DATA TIER (PostgreSQL)                             │
│  ┌──────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐  ┌───────────┐  │
│  │Category  │←→│  Topic  │←→│ Concept │←→│ConceptSection│←→│CodeSnippet│  │
│  └──────────┘  └─────────┘  └─────────┘  └─────────────┘  └───────────┘  │
│                                   │                                        │
│                    ┌──────────────┴──────────────┐                        │
│            ┌───────▼──────┐            ┌─────────▼─────┐                  │
│            │Visualization │            │ AnimationStep │                  │
│            │   Config     │────────────│  (Keyframes)  │                  │
│            └──────────────┘            └───────────────┘                  │
└────────────────────────────────────────────────────────────────────────────┘

             ┌────────────────────────────────────┐
             │    SANDBOX EXECUTION TIER          │
             │  (Isolated Docker Containers)      │
             │  ┌──────────┐    ┌──────────┐     │
             │  │ Python   │    │JavaScript│ ... │
             │  │ Executor │    │ Executor │     │
             │  └──────────┘    └──────────┘     │
             └────────────────────────────────────┘
```

### 1.3 User Journey with Technical Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 1: Landing Page                                                │
│   Route: /                                                          │
│   API: GET /api/v1/categories/                                      │
│   ↓                                                                 │
│   Displays hero section + all categories with nested topics        │
│   User sees: "Sorting (5 topics)", "Trees (8 topics)", ...         │
└─────────────────────────────────────────────────────────────────────┘
                              ↓ Click "Binary Search"
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 2: Topic Detail Page                                          │
│   Route: /topics/binary-search                                     │
│   API: GET /api/v1/topics/binary-search/                           │
│   ↓                                                                 │
│   Shows topic metadata + list of learnable concepts                │
│   User sees: "Basic Binary Search", "Recursive Binary Search"      │
└─────────────────────────────────────────────────────────────────────┘
                              ↓ Click "Basic Binary Search"
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 3: Editorial Page (Main Learning Interface)                   │
│   Route: /learn/basic-binary-search                                │
│   APIs:                                                             │
│     - GET /api/v1/concepts/basic-binary-search/                    │
│     - GET /api/v1/concepts/basic-binary-search/visualization/      │
│   ↓                                                                 │
│   3-PANEL LAYOUT RENDERS:                                          │
│   ┌────────────┬──────────────────────┬─────────────┐             │
│   │  Learning  │   Visualization      │  Sandbox    │             │
│   │   Path     │   + Animation        │  (Optional) │             │
│   │  (Left)    │   (Center/Right)     │  (Toggle)   │             │
│   └────────────┴──────────────────────┴─────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
                              ↓ User interactions
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 4: Interactive Learning                                       │
│   • Read explanation sections (markdown rendered)                  │
│   • Click "Sort" → Animation starts (local state machine)          │
│   • Watch array transform step-by-step                             │
│   • See synchronized code highlighting                             │
│   • Toggle sandbox → Write custom code                             │
│   • POST /api/v1/execute/ → Get execution trace                    │
│   • See custom code animated                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.4 Data Flow Diagram (Detailed)

```
USER ACTION                 FRONTEND                 BACKEND                DATABASE
─────────────────────────────────────────────────────────────────────────────────

[Open Landing]
      │
      └──────→ LandingPage.jsx
                    │
                    └─→ useEffect()
                         └─→ GET /api/categories/
                                              │
                                              └──→ CategoryListView
                                                        │
                                                        └→ Query DB
                                                               │
                                                               ↓
                                                         [Category.objects
                                                          .prefetch_related
                                                          ('topics').all()]
                                                               │
                    ←─────────── JSON Response ←───────────────┘
                    │
              setState(categories)
                    │
              Render Cards ←───────┐
                                   │
[Click Topic "Bubble Sort"]       │
      │                            │
      └──────→ Navigate                                                 
                /topics/bubble-sort                                     
                    │                                                   
                    └─→ TopicListPage.jsx                              
                         └─→ GET /topics/bubble-sort/                  
                                              │                         
                                              └──→ TopicDetailView      
                                                        │               
                                                        └→ Query DB     
                                                               ↓        
                                                         [Topic.objects 
                                                          .get(slug=...) 
                                                          .prefetch_     
                                                          related(       
                                                          'concepts')]   
                                                               │         
                    ←─────────── JSON Response ←───────────────┘        
                    │                                                   
              setState(topic, concepts)                                 
                    │                                                   
              Render Concept List                                       
                                                                        
[Click "Basic Bubble Sort"]                                            
      │                                                                 
      └──────→ Navigate /learn/basic-bubble-sort                       
                    │                                                   
                    └─→ EditorialPage.jsx                              
                         │                                              
                         ├─→ GET /concepts/basic-bubble-sort/          
                         │                  │                           
                         │                  └──→ ConceptDetailView      
                         │                           │                  
                         │                           └→ Query DB        
                         │                                  ↓           
                         │                            [Concept.get(...) 
                         │                             .prefetch_       
                         │                             related(         
                         │                             'sections__      
                         │                             code_snippets')] 
                         │                                  │           
                         │   ←─────── JSON ←────────────────┘           
                         │                                              
                         └─→ GET /concepts/.../visualization/          
                                            │                           
                                            └──→ VizConfigView         
                                                      │                 
                                                      └→ Query DB       
                                                             ↓          
                                                       [VizConfig       
                                                        .get(           
                                                        concept__slug...)
                                                        .prefetch_      
                                                        related(        
                                                        'animation_     
                                                        steps')]        
                                                             │          
                    ←─────────── JSON ←──────────────────────┘          
                    │                                                   
              setState(concept, vizConfig)                              
                    │                                                   
              Generate Animation Steps (Local)                          
                    │                                                   
              Render 3-Panel Layout                                     
                                                                        
[Click "Sort" Button]                                                   
      │                                                                 
      └──────→ AlgorithmControls                                       
                    │                                                   
              onActionClick('sort')                                     
                    │                                                   
              generateAnimationSteps(currentArray)                      
                    │                                                   
              setAnimationSteps([{line: 1, array: [...], ...}])       
                    │                                                   
              startAnimation()                                          
                    │                                                   
              setInterval(() => {                                       
                  stepIndex++                                           
                  updateVisualization()                                 
              }, speed)                                                 
                                                                        
[Click "Sandbox" Toggle]                                               
      │                                                                 
      └──────→ setSandboxOpen(true)                                    
                    │                                                   
              Render SandboxPanel                                       
                    │                                                   
[Write Code + Click "Run"]                                             
      │                                                                 
      └──────→ SandboxPanel.executeCode()                              
                    │                                                   
                    └─→ POST /execute/                                 
                         { code, language, input }                      
                                              │                         
                                              └──→ CodeExecutionView    
                                                        │               
                                                        └→ executor.py  
                                                             │          
                                                        execute_code()  
                                                             │          
                                                        subprocess.run()
                                                             │          
                                                        [Python tracer  
                                                         captures steps]
                                                             │          
                    ←─────────── JSON ←──────────────────────┘          
                    { success, steps, output }                          
                    │                                                   
              Parse Execution Trace                                     
                    │                                                   
              Animate User Code Steps                                   
```


---

## 2. Complete Technology Stack

### 2.1 Backend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Python** | 3.10+ | Core language | Async support, type hints, performance |
| **Django** | 4.2 LTS | Web framework | Mature ORM, admin panel, security |
| **Django REST Framework** | 3.14+ | API layer | Serializers, viewsets, auth |
| **PostgreSQL** | 15+ | Database | JSONB support, reliability, performance |
| **Celery** | 5.3+ | Task queue | Async code execution, scheduled tasks |
| **Redis** | 7.2+ | Cache + broker | Session storage, Celery broker |
| **Docker** | 24+ | Containerization | Code execution isolation |
| **Gunicorn/Uvicorn** | Latest | WSGI/ASGI server | Production server |

#### Backend Dependencies (`requirements.txt`)

```txt
# Core Framework
Django==4.2.10
djangorestframework==3.14.0
django-cors-headers==4.3.1
django-environ==0.11.2

# Database
psycopg2-binary==2.9.9
dj-database-url==2.1.0

# Authentication & Security
djangorestframework-simplejwt==5.3.1
django-allauth==0.61.1
cryptography==42.0.2

# Task Queue
celery==5.3.6
redis==5.0.1
django-redis==5.4.0

# Code Execution & Analysis
astroid==3.0.3
pylint==3.0.3
black==24.1.1

# API Documentation
drf-spectacular==0.27.1
drf-yasg==1.21.7

# Utilities
python-dateutil==2.8.2
Pillow==10.2.0
markdown==3.5.2
bleach==6.1.0

# Development
django-debug-toolbar==4.3.0
factory-boy==3.3.0
faker==22.6.0
pytest-django==4.8.0
coverage==7.4.1
```

### 2.2 Frontend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **React** | 18.2+ | UI library | Virtual DOM, hooks, ecosystem |
| **Vite** | 5.0+ | Build tool | Fast HMR, ES modules, optimized builds |
| **React Router** | 6.22+ | Routing | Declarative routing, code splitting |
| **Axios** | 1.6+ | HTTP client | Interceptors, request cancellation |
| **Zustand** | 4.5+ | State management | Lightweight, no boilerplate |
| **Monaco Editor** | 0.46+ | Code editor | VSCode engine, multi-language |
| **D3.js** | 7.9+ | Visualizations | Advanced graph/tree rendering |
| **Framer Motion** | 11.0+ | Animations | Smooth transitions, gestures |
| **React Markdown** | 9.0+ | Markdown rendering | Editorial content display |
| **Prism.js** | 1.29+ | Syntax highlighting | Code snippet presentation |

#### Frontend Dependencies (`package.json`)

```json
{
  "name": "dsa-visualizer-frontend",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx",
    "test": "vitest",
    "coverage": "vitest --coverage"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.6.7",
    "zustand": "^4.5.0",
    "@monaco-editor/react": "^4.6.0",
    "d3": "^7.9.0",
    "framer-motion": "^11.0.3",
    "react-markdown": "^9.0.1",
    "remark-gfm": "^4.0.0",
    "prismjs": "^1.29.0",
    "react-icons": "^5.0.1",
    "clsx": "^2.1.0",
    "lodash-es": "^4.17.21"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.0",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "vitest": "^1.2.2",
    "@testing-library/react": "^14.2.1",
    "@testing-library/jest-dom": "^6.4.2",
    "jsdom": "^24.0.0"
  }
}
```

### 2.3 DevOps & Infrastructure

```yaml
# Technology choices for deployment

Production Stack:
  Web Server: Nginx 1.24+
  Application: Gunicorn/Uvicorn (8 workers)
  Database: PostgreSQL 15 (AWS RDS / DigitalOcean Managed)
  Cache: Redis 7.2 (ElastiCache / Managed Redis)
  Storage: AWS S3 / DigitalOcean Spaces (media files)
  CDN: CloudFlare (static assets, frontend)
  Monitoring: Sentry, Prometheus + Grafana
  Logging: ELK Stack (Elasticsearch, Logstash, Kibana)

CI/CD Pipeline:
  Version Control: GitHub
  CI: GitHub Actions
  Container Registry: Docker Hub / GitHub Container Registry
  Deployment: Docker Compose / Kubernetes
  Secrets: GitHub Secrets / Vault
```

### 2.4 Project Structure (Complete)

```
dsa-visualization/
├── dsavisual/                  # Django Backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── pytest.ini
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   │
│   ├── dsavisual/             # Main project settings
│   │   ├── __init__.py
│   │   ├── settings/
│   │   │   ├── __init__.py
│   │   │   ├── base.py       # Common settings
│   │   │   ├── development.py
│   │   │   ├── production.py
│   │   │   └── testing.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── core/                  # Categories & Topics
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── tests/
│   │   │   ├── __init__.py
│   │   │   ├── test_models.py
│   │   │   ├── test_views.py
│   │   │   └── factories.py
│   │   ├── fixtures/
│   │   │   └── initial_data.json
│   │   └── migrations/
│   │       ├── __init__.py
│   │       └── 0001_initial.py
│   │
│   ├── concepts/              # Learning content
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── tests/
│   │   └── migrations/
│   │
│   ├── visualizer/           # Visualization & execution
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── executor.py         # Code execution
│   │   │   ├── tracers/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── python_tracer.py
│   │   │   │   ├── js_tracer.py
│   │   │   │   └── base.py
│   │   │   └── validators/
│   │   │       ├── __init__.py
│   │   │       ├── code_validator.py
│   │   │       └── security_check.py
│   │   ├── tasks.py                # Celery tasks
│   │   ├── tests/
│   │   └── migrations/
│   │
│   ├── users/                # User management (new)
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py         # UserProfile, Progress
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── tests/
│   │   └── migrations/
│   │
│   ├── static/               # Static files
│   │   ├── admin/
│   │   └── api-docs/
│   │
│   ├── media/                # User uploads
│   │   └── .gitkeep
│   │
│   └── templates/            # Django templates
│       └── api-root.html
│
├── frontend/                 # React Frontend
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example
│   ├── Dockerfile
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── assets/
│   │       └── images/
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       │
│       ├── config/
│       │   ├── constants.js
│       │   └── api.config.js
│       │
│       ├── api/
│       │   ├── client.js          # Axios instance
│       │   ├── endpoints.js       # API endpoints
│       │   ├── categories.js
│       │   ├── topics.js
│       │   ├── concepts.js
│       │   ├── visualization.js
│       │   └── execution.js
│       │
│       ├── store/                 # Zustand stores
│       │   ├── useAuthStore.js
│       │   ├── useConceptStore.js
│       │   ├── useAnimationStore.js
│       │   └── useSandboxStore.js
│       │
│       ├── hooks/                 # Custom hooks
│       │   ├── useAnimation.js
│       │   ├── useCodeExecution.js
│       │   ├── useDebounce.js
│       │   └── useLocalStorage.js
│       │
│       ├── pages/
│       │   ├── LandingPage/
│       │   │   ├── index.jsx
│       │   │   ├── LandingPage.css
│       │   │   ├── HeroSection.jsx
│       │   │   ├── CategoryGrid.jsx
│       │   │   └── FeaturesSection.jsx
│       │   │
│       │   ├── TopicListPage/
│       │   │   ├── index.jsx
│       │   │   ├── TopicListPage.css
│       │   │   ├── TopicHeader.jsx
│       │   │   └── ConceptCard.jsx
│       │   │
│       │   └── EditorialPage/
│       │       ├── index.jsx
│       │       ├── EditorialPage.css
│       │       └── EditorialLayout.jsx
│       │
│       ├── components/
│       │   ├── common/
│       │   │   ├── Navbar/
│       │   │   ├── Footer/
│       │   │   ├── Button/
│       │   │   ├── Card/
│       │   │   ├── Modal/
│       │   │   ├── Loader/
│       │   │   ├── ErrorBoundary/
│       │   │   └── ResizablePanel/
│       │   │
│       │   ├── editorial/
│       │   │   ├── LearningPath/
│       │   │   │   ├── index.jsx
│       │   │   │   ├── LearningPath.css
│       │   │   │   ├── SectionItem.jsx
│       │   │   │   └── ProgressTracker.jsx
│       │   │   ├── CompleteCode/
│       │   │   └── LineExplanation/
│       │   │
│       │   ├── visualizer/
│       │   │   ├── ArrayViz/
│       │   │   │   ├── index.jsx
│       │   │   │   ├── ArrayViz.css
│       │   │   │   ├── ArrayElement.jsx
│       │   │   │   └── ArrayPointer.jsx
│       │   │   ├── TreeViz/
│       │   │   │   ├── index.jsx
│       │   │   │   ├── TreeViz.css
│       │   │   │   ├── TreeNode.jsx
│       │   │   │   └── TreeEdge.jsx
│       │   │   ├── GraphViz/
│       │   │   ├── CodeViewer/
│       │   │   ├── AlgorithmControls/
│       │   │   ├── AnimationControls/
│       │   │   └── CurrentLineExplanation/
│       │   │
│       │   └── sandbox/
│       │       ├── SandboxPanel/
│       │       │   ├── index.jsx
│       │       │   ├── SandboxPanel.css
│       │       │   ├── CodeEditor.jsx
│       │       │   ├── InputPanel.jsx
│       │       │   ├── OutputPanel.jsx
│       │       │   └── ExecutionTrace.jsx
│       │       └── TestCaseRunner/
│       │
│       ├── utils/
│       │   ├── animation/
│       │   │   ├── arrayAnimations.js
│       │   │   ├── treeAnimations.js
│       │   │   └── graphAnimations.js
│       │   ├── algorithms/
│       │   │   ├── sorting.js
│       │   │   ├── searching.js
│       │   │   └── traversal.js
│       │   ├── formatters.js
│       │   ├── validators.js
│       │   └── helpers.js
│       │
│       ├── styles/
│       │   ├── global.css
│       │   ├── variables.css
│       │   ├── animations.css
│       │   └── themes/
│       │       ├── light.css
│       │       └── dark.css
│       │
│       └── assets/
│           ├── fonts/
│           └── images/
│
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md      # This file
│   ├── API.md
│   ├── COMPONENTS.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── scripts/                 # Utility scripts
│   ├── seed_database.py
│   ├── generate_fixtures.py
│   └── backup_db.sh
│
├── nginx/                   # Nginx configuration
│   ├── nginx.conf
│   └── ssl/
│
├── docker-compose.yml       # Full stack compose
├── docker-compose.dev.yml   # Development override
├── docker-compose.prod.yml  # Production override
├── .gitignore
├── README.md
└── LICENSE
```


---

## 3. Database Architecture & Schema

### 3.1 Entity Relationship Diagram (Detailed)

```
Legend: PK = Primary Key, FK = Foreign Key, UK = Unique Key
        1:N = One-to-Many, 1:1 = One-to-One

┌────────────────────────────────────────────────────────────────────────┐
│                         CORE APP MODELS                                │
└────────────────────────────────────────────────────────────────────────┘

┌───────────────────────┐
│    core_category      │
├───────────────────────┤
│ id (PK)          INT  │───┐
│ name             TEXT │   │
│ slug (UK)        TEXT │   │ 1:N
│ description      TEXT │   │
│ icon             TEXT │   │
│ display_order    INT  │   │
│ created_at       TS   │   │
│ updated_at       TS   │   │
└───────────────────────┘   │
                            │
                            ↓
                  ┌─────────────────────┐
                  │    core_topic       │
                  ├─────────────────────┤
                  │ id (PK)        INT  │───┐
                  │ category_id(FK)INT  │   │
                  │ title          TEXT │   │ 1:N
                  │ slug (UK)      TEXT │   │
                  │ short_desc     TEXT │   │
                  │ difficulty     TEXT │   │
                  │ icon           TEXT │   │
                  │ display_order  INT  │   │
                  │ created_at     TS   │   │
                  │ updated_at     TS   │   │
                  └─────────────────────┘   │
                                            │
┌───────────────────────────────────────────────────────────────────────┐│
│                       CONCEPTS APP MODELS                             ││
└───────────────────────────────────────────────────────────────────────┘│
                                            │
                                            ↓
                  ┌─────────────────────────────┐
                  │  concepts_concept           │
                  ├─────────────────────────────┤
                  │ id (PK)             INT     │───┐──┐
                  │ topic_id (FK)       INT     │   │  │
                  │ title               TEXT    │   │  │ 1:N
                  │ slug (UK)           TEXT    │   │  │
                  │ overview            TEXT    │   │  │
                  │ time_complexity     TEXT    │   │  │
                  │ space_complexity    TEXT    │   │  │
                  │ display_order       INT     │   │  │
                  │ created_at          TS      │   │  │
                  │ updated_at          TS      │   │  │
                  └─────────────────────────────┘   │  │
                                                    │  │
                  ┌────────────────────────────────────┘
                  │ 1:1                               │
                  │                                   │
┌─────────────────▼───────────────────────────┐     │
│  visualizer_visualizationconfig             │     │
├─────────────────────────────────────────────┤     │
│ id (PK)                     INT             │     │
│ concept_id (FK, UK)         INT             │     │
│ viz_type                    TEXT            │     │
│ default_input               JSONB           │     │
│ action_options              JSONB           │     │
│ max_array_size              INT             │     │
│ animation_speed_default     FLOAT           │     │
│ created_at                  TS              │     │
│ updated_at                  TS              │     │
└─────────────────────────────────────────────┘     │
        │                                            │
        │ 1:N                                        │
        ↓                                            │
┌─────────────────────────────────────┐             │
│ visualizer_animationstep            │             │
├─────────────────────────────────────┤             │
│ id (PK)                 INT         │             │
│ viz_config_id (FK)      INT         │             │
│ action_name             TEXT        │             │
│ keyframes               JSONB       │             │
│ code_highlight_lines    TEXT        │             │
│ description             TEXT        │             │
│ display_order           INT         │             │
│ created_at              TS          │             │
└─────────────────────────────────────┘             │
                                                     │
                  ┌──────────────────────────────────┘
                  │ 1:N
                  ↓
┌────────────────────────────────────────┐
│  concepts_conceptsection               │
├────────────────────────────────────────┤
│ id (PK)                   INT          │───┐
│ concept_id (FK)           INT          │   │
│ title                     TEXT         │   │ 1:N
│ content                   TEXT         │   │
│ section_type              TEXT         │   │
│ display_order             INT          │   │
│ estimated_time_minutes    INT          │   │
│ created_at                TS           │   │
│ updated_at                TS           │   │
└────────────────────────────────────────┘   │
                                             │
                                             ↓
                  ┌──────────────────────────────────┐
                  │  concepts_codesnippet            │
                  ├──────────────────────────────────┤
                  │ id (PK)             INT          │
                  │ section_id (FK)     INT          │
                  │ language            TEXT         │
                  │ code                TEXT         │
                  │ explanation         TEXT         │
                  │ is_final_code       BOOLEAN      │
                  │ is_executable       BOOLEAN      │
                  │ expected_output     TEXT         │
                  │ display_order       INT          │
                  │ created_at          TS           │
                  │ updated_at          TS           │
                  └──────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                       USERS APP MODELS (New)                          │
└───────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────┐
│  auth_user (Django built-in)       │
├────────────────────────────────────┤
│ id (PK)               INT          │───┐
│ username (UK)         TEXT         │   │
│ email (UK)            TEXT         │   │ 1:1
│ password              TEXT         │   │
│ first_name            TEXT         │   │
│ last_name             TEXT         │   │
│ is_staff              BOOLEAN      │   │
│ is_active             BOOLEAN      │   │
│ date_joined           TS           │   │
└────────────────────────────────────┘   │
                                         │
                  ┌──────────────────────┘
                  │ 1:1
                  ↓
┌────────────────────────────────────────┐
│  users_userprofile                     │
├────────────────────────────────────────┤
│ id (PK)                   INT          │───┐
│ user_id (FK, UK)          INT          │   │
│ avatar                    TEXT         │   │ 1:N
│ bio                       TEXT         │   │
│ preferred_language        TEXT         │   │
│ theme_preference          TEXT         │   │
│ total_concepts_completed  INT          │   │
│ total_time_spent_minutes  INT          │   │
│ streak_days               INT          │   │
│ last_activity_date        DATE        │   │
│ created_at                TS           │   │
│ updated_at                TS           │   │
└────────────────────────────────────────┘   │
                                             │
                  ┌──────────────────────────┘
                  │ M:N (through ConceptProgress)
                  ↓
┌─────────────────────────────────────────────┐
│  users_conceptprogress                      │
├─────────────────────────────────────────────┤
│ id (PK)                   INT               │
│ user_profile_id (FK)      INT               │
│ concept_id (FK)           INT               │
│ status                    TEXT              │
│ progress_percentage       INT               │
│ time_spent_minutes        INT               │
│ last_accessed_at          TS                │
│ completed_at              TS (nullable)     │
│ created_at                TS                │
│ updated_at                TS                │
└─────────────────────────────────────────────┘
        │ (UK: user_profile_id + concept_id)
        │
┌───────────────────────────────────────────────┐
│  users_codesnippetsubmission                  │
├───────────────────────────────────────────────┤
│ id (PK)                   INT                 │
│ user_profile_id (FK)      INT                 │
│ concept_id (FK)           INT                 │
│ code                      TEXT                │
│ language                  TEXT                │
│ input_data                JSONB               │
│ execution_result          JSONB               │
│ is_successful             BOOLEAN             │
│ execution_time_ms         INT                 │
│ created_at                TS                  │
└───────────────────────────────────────────────┘
```

### 3.2 Complete Model Definitions with Full Fields

#### Core App Models

**`core/models.py` (Complete Implementation)**

```python
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class TimestampedModel(models.Model):
    """Abstract base model with created_at and updated_at fields."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimestampedModel):
    """
    Top-level grouping of DSA topics.
    Examples: Sorting, Searching, Trees, Graphs, Dynamic Programming
    """
    
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Category name (e.g., 'Sorting Algorithms')"
    )
    slug = models.SlugField(
        max_length=120,
        unique=True,
        blank=True,
        db_index=True,
        help_text="URL-friendly identifier"
    )
    description = models.TextField(
        blank=True,
        help_text="Detailed description for landing page"
    )
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="Icon identifier (emoji, FontAwesome class, or URL)"
    )
    display_order = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        help_text="Order in which to display (lower = first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this category is visible to users"
    )
    
    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['display_order', 'is_active']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_active_topics_count(self):
        """Return count of active topics in this category."""
        return self.topics.filter(is_active=True).count()

    @property
    def total_concepts(self):
        """Total concepts across all topics in this category."""
        from concepts.models import Concept
        return Concept.objects.filter(
            topic__category=self,
            is_active=True
        ).count()


class Topic(TimestampedModel):
    """
    An individual DSA topic within a category.
    Examples: Binary Search, Bubble Sort, BFS, Dijkstra's Algorithm
    """
    
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
        ('expert', 'Expert'),
    ]
    
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='topics',
        help_text="Parent category"
    )
    title = models.CharField(
        max_length=200,
        help_text="Topic title (e.g., 'Binary Search')"
    )
    slug = models.SlugField(
        max_length=220,
        unique=True,
        blank=True,
        db_index=True,
        help_text="URL-friendly identifier"
    )
    short_description = models.TextField(
        blank=True,
        max_length=500,
        help_text="Brief description for topic list page"
    )
    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default='easy',
        help_text="Difficulty level"
    )
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="Icon for topic card"
    )
    display_order = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        help_text="Order within category"
    )
    prerequisites = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False,
        related_name='dependent_topics',
        help_text="Topics that should be learned before this one"
    )
    estimated_time_minutes = models.PositiveIntegerField(
        default=30,
        help_text="Estimated time to complete all concepts"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this topic is visible to users"
    )
    
    class Meta:
        ordering = ['display_order', 'title']
        verbose_name = 'Topic'
        verbose_name_plural = 'Topics'
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['category', 'display_order']),
            models.Index(fields=['difficulty', 'is_active']),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=['category', 'title'],
                name='unique_topic_per_category'
            )
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.get_difficulty_display()})"

    def get_concepts_count(self):
        """Return count of active concepts for this topic."""
        return self.concepts.filter(is_active=True).count()

    @property
    def difficulty_color(self):
        """Return CSS color class for difficulty."""
        colors = {
            'beginner': 'blue',
            'easy': 'green',
            'medium': 'yellow',
            'hard': 'orange',
            'expert': 'red',
        }
        return colors.get(self.difficulty, 'gray')


# Admin customization
from django.contrib import admin

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'display_order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['display_order', 'name']


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'difficulty', 'display_order', 'is_active', 'created_at']
    list_filter = ['category', 'difficulty', 'is_active', 'created_at']
    search_fields = ['title', 'short_description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['prerequisites']
    ordering = ['category', 'display_order']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('category', 'title', 'slug', 'short_description', 'icon')
        }),
        ('Classification', {
            'fields': ('difficulty', 'prerequisites', 'estimated_time_minutes')
        }),
        ('Display Settings', {
            'fields': ('display_order', 'is_active')
        }),
    )
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐
│  Category   │
│━━━━━━━━━━━━━│
│ id (PK)     │
│ name        │──┐
│ slug        │  │
│ description │  │
│ icon        │  │
│ order       │  │
└─────────────┘  │
                 │ 1:N
                 ↓
┌─────────────┐  │
│   Topic     │←─┘
│━━━━━━━━━━━━━│
│ id (PK)     │
│ category_fk │──┐
│ title       │  │
│ slug        │  │
│ difficulty  │  │
│ description │  │
└─────────────┘  │
                 │ 1:N
                 ↓
┌─────────────┐  │
│  Concept    │←─┘
│━━━━━━━━━━━━━│
│ id (PK)     │
│ topic_fk    │──┐──────┐
│ title       │  │      │
│ slug        │  │      │
│ overview    │  │      │ 1:1
└─────────────┘  │      │
                 │      ↓
                 │  ┌──────────────────┐
                 │  │ VisualizationCfg │
                 │  │━━━━━━━━━━━━━━━━━━│
                 │  │ id (PK)          │
                 │  │ concept_fk       │
                 │  │ viz_type         │
                 │  │ default_input    │──┐
                 │  │ action_options   │  │
                 │  └──────────────────┘  │
                 │                        │ 1:N
                 │                        ↓
                 │ 1:N            ┌──────────────┐
                 ↓                │AnimationStep │
┌──────────────────┐              │━━━━━━━━━━━━━━│
│ ConceptSection   │              │ id (PK)      │
│━━━━━━━━━━━━━━━━━━│              │ config_fk    │
│ id (PK)          │              │ action_name  │
│ concept_fk       │──┐           │ keyframes    │
│ title            │  │           │ code_lines   │
│ content          │  │           │ order        │
│ section_type     │  │           └──────────────┘
│ order            │  │
└──────────────────┘  │
                      │ 1:N
                      ↓
┌──────────────────┐
│  CodeSnippet     │
│━━━━━━━━━━━━━━━━━━│
│ id (PK)          │
│ section_fk       │
│ language         │
│ code             │
│ explanation      │
│ is_final_code    │
│ order            │
└──────────────────┘
```

### Key Relationships
1. **Category → Topic**: One-to-Many (e.g., "Sorting" has "Bubble Sort", "Quick Sort")
2. **Topic → Concept**: One-to-Many (e.g., "Bubble Sort" has "Basic Implementation", "Optimized Version")
3. **Concept → ConceptSection**: One-to-Many (sections form the learning path)
4. **ConceptSection → CodeSnippet**: One-to-Many (multiple code examples per section)
5. **Concept → VisualizationConfig**: One-to-One (each concept has one viz config)
6. **VisualizationConfig → AnimationStep**: One-to-Many (predefined animation sequences)

---

## Backend Architecture

### Django Apps Structure

#### 1. **Core App** (`core/`)
**Purpose**: Manage high-level organization (Categories, Topics)

**Models**:
- `Category`: Top-level grouping (Sorting, Trees, Graphs)
- `Topic`: Individual algorithms/data structures

**Endpoints**:
```
GET /api/v1/categories/              → List all categories with topics
GET /api/v1/categories/<slug>/       → Single category detail
GET /api/v1/topics/<slug>/           → Topic detail with concepts
```

#### 2. **Concepts App** (`concepts/`)
**Purpose**: Manage learning content (editorial, code snippets)

**Models**:
- `Concept`: A learnable concept (e.g., "Binary Search Algorithm")
- `ConceptSection`: Sections in the learning path
- `CodeSnippet`: Code examples embedded in sections

**Endpoints**:
```
GET /api/v1/concepts/<slug>/         → Full editorial content with sections
```

**Serializer Hierarchy**:
```python
ConceptDetailSerializer
├── sections: ConceptSectionSerializer (many)
│   └── code_snippets: CodeSnippetSerializer (many)
└── visualization: VisualizationConfigSerializer
```

#### 3. **Visualizer App** (`visualizer/`)
**Purpose**: Handle visualization configuration and code execution

**Models**:
- `VisualizationConfig`: Links concept to visualization type
- `AnimationStep`: Predefined animation keyframes

**Endpoints**:
```
GET /api/v1/concepts/<slug>/visualization/  → Viz config + animation steps
POST /api/v1/execute/                       → Execute user code in sandbox
```

**Services**:
- `executor.py`: Secure code execution with Python tracing

---

## Frontend Architecture

### Page Components

#### 1. **LandingPage** (`pages/LandingPage.jsx`)
**Purpose**: Project intro + category listing

**Layout**:
```
┌───────────────────────────────────────┐
│           HERO SECTION                │
│   DSA Visualization Tool              │
│   Learn algorithms interactively      │
└───────────────────────────────────────┘
│           CATEGORIES                  │
│  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │Sort  │  │Search│  │Trees │  ...  │
│  │🔀   │  │🔍   │  │🌳   │       │
│  └──────┘  └──────┘  └──────┘       │
└───────────────────────────────────────┘
```

**Data Flow**:
```
ComponentDidMount → GET /api/v1/categories/
                 → Display categories with topics
```

#### 2. **TopicListPage** (`pages/TopicListPage.jsx`)
**Purpose**: Show concepts under a topic

**Layout**:
```
┌───────────────────────────────────────┐
│  ← Back to Categories                 │
│                                       │
│  Topic: Binary Search                 │
│  Difficulty: Easy                     │
│                                       │
│  Concepts:                            │
│  □ Basic Binary Search                │
│  □ Recursive Binary Search            │
│  □ Binary Search Variations           │
└───────────────────────────────────────┘
```

**Data Flow**:
```
GET /api/v1/topics/<slug>/ → Display concepts
Click Concept → Navigate to /learn/<concept-slug>
```

#### 3. **EditorialPage** (`pages/EditorialPage.jsx`)
**Purpose**: Main learning interface (editorial + visualization + sandbox)

**Layout** (3-panel design):
```
┌────────────────────────────────────────────────────────────────┐
│  Navbar                                    [Sandbox Toggle] ⚙  │
├──────────────────┬─────────────────────────┬──────────────────┤
│                  │                         │                  │
│  LEARNING PATH   │   VISUALIZATION AREA    │  SANDBOX (opt)   │
│  (Left Panel)    │     (Center/Right)      │   (Right Panel)  │
│                  │                         │                  │
│  □ Introduction  │  ┌─────────────────┐   │  Code Editor:    │
│  □ How it works  │  │  [5][3][8][1]   │   │  def my_sort():  │
│  ☑ Code example  │  │   ↑   ↑         │   │      ...         │
│  □ Complexity    │  └─────────────────┘   │                  │
│                  │  Line: 5                │  [Run Code]      │
│  [Code Snippet]  │  "Comparing 5 and 3"    │                  │
│  def bubble():   │                         │  Output:         │
│    ...           │  [Actions]              │  [1,3,5,8]       │
│                  │  [◀ ⏸ ▶] Speed: [x1]   │                  │
└──────────────────┴─────────────────────────┴──────────────────┘
```

**Sub-components**:

**Left Panel**:
- `LearningPath`: Scrollable sections with progress tracking
- `LineExplanation`: Context-aware explanation
- `CompleteCode`: Final implementation code

**Center/Right Panel**:
- `CompactArrayViz`: Visual array representation
- `CodeViewer`: Highlighted code with current line
- `AlgorithmControls`: Action buttons (sort, search, insert)
- `AnimationControls`: Play/pause/step/speed controls
- `CurrentLineExplanation`: Real-time step description

**Right Panel (Toggle)**:
- `SandboxPanel`: Monaco/CodeMirror editor + execute button

---

## Component Breakdown

### Editorial Components (`components/editorial/`)

#### **LearningPath.jsx**
```javascript
Props:
- sections: Array<ConceptSection>
- onSectionClick: (index) => void
- completedSteps: Array<number>

State:
- currentSection: number
- expanded: Array<boolean>

Renders:
├─ Section 1: Introduction
│  └─ Markdown content
├─ Section 2: Algorithm Explanation
│  ├─ Markdown content
│  └─ CodeSnippet 1
└─ Section 3: Complete Implementation
   └─ CodeSnippet 2 (is_final_code=true)
```

#### **CompleteCode.jsx**
Shows final implementation with syntax highlighting

#### **LineExplanation.jsx**
Displays explanation for current animation line

---

### Visualizer Components (`components/visualizer/`)

#### **CompactArrayViz.jsx**
```javascript
Props:
- array: Array<number>
- comparing: Array<number>  // Indices being compared
- swapped: Array<number>    // Indices recently swapped
- sorted: Array<number>     // Sorted indices

Renders:
┌───┬───┬───┬───┬───┐
│ 5 │ 3 │ 8 │ 1 │ 2 │  (comparing [0,1] → highlighted)
└───┴───┴───┴───┴───┘
```

#### **AlgorithmControls.jsx**
Action buttons based on `viz_config.action_options`
```javascript
Props:
- actions: ["sort", "search", "insert", "delete"]
- onActionClick: (action) => void

Example: [Sort] [Search] [Insert] [Delete]
```

#### **AnimationControls.jsx**
```javascript
Props:
- isPlaying: boolean
- speed: number
- onPlayPause: () => void
- onStep: (direction) => void
- onSpeedChange: (speed) => void

Renders: [◀] [⏸/▶] [▶] [Speed: x1 ▼]
```

#### **CodeViewer.jsx**
Syntax-highlighted code with current line emphasis

---

### Sandbox Components (`components/sandbox/`)

#### **SandboxPanel.jsx**
```javascript
Features:
- Code editor (textarea or monaco-editor)
- Language selector (Python, JS, C++, Java)
- Input data field (JSON)
- Execute button
- Output/error display
- Execution trace visualization

Flow:
User writes code → Click "Run" 
→ POST /api/v1/execute/ { code, language, input_data }
→ Backend executes safely
→ Returns { success, output, steps, error }
→ Display results + animate steps
```

---

## API Design

### Complete Endpoint Specification

#### **1. Get All Categories**
```http
GET /api/v1/categories/
Response:
[
  {
    "id": 1,
    "name": "Sorting Algorithms",
    "slug": "sorting-algorithms",
    "description": "Learn various sorting techniques",
    "icon": "🔀",
    "display_order": 1,
    "topics": [
      {
        "id": 1,
        "title": "Bubble Sort",
        "slug": "bubble-sort",
        "short_description": "Simple comparison-based sort",
        "difficulty": "easy",
        "icon": "💧"
      }
    ]
  }
]
```

#### **2. Get Topic with Concepts**
```http
GET /api/v1/topics/bubble-sort/
Response:
{
  "id": 1,
  "title": "Bubble Sort",
  "slug": "bubble-sort",
  "short_description": "Simple comparison-based sorting",
  "difficulty": "easy",
  "concepts": [
    {
      "id": 1,
      "title": "Basic Bubble Sort",
      "slug": "basic-bubble-sort",
      "overview": "Learn the fundamental bubble sort algorithm"
    }
  ]
}
```

#### **3. Get Concept Details (Full Editorial)**
```http
GET /api/v1/concepts/basic-bubble-sort/
Response:
{
  "id": 1,
  "title": "Basic Bubble Sort",
  "slug": "basic-bubble-sort",
  "overview": "Introduction to bubble sort",
  "sections": [
    {
      "id": 1,
      "title": "What is Bubble Sort?",
      "content": "Bubble sort is a simple sorting algorithm...",
      "section_type": "explanation",
      "code_snippets": []
    },
    {
      "id": 2,
      "title": "Implementation",
      "content": "Let's implement bubble sort step by step",
      "section_type": "code",
      "code_snippets": [
        {
          "id": 1,
          "language": "python",
          "code": "def bubble_sort(arr):\n    ...",
          "explanation": "This function sorts an array",
          "is_final_code": true
        }
      ]
    }
  ]
}
```

#### **4. Get Visualization Config**
```http
GET /api/v1/concepts/basic-bubble-sort/visualization/
Response:
{
  "id": 1,
  "viz_type": "array",
  "default_input": {
    "array": [5, 3, 8, 1, 2]
  },
  "action_options": ["sort", "reset"],
  "animation_steps": [
    {
      "id": 1,
      "action_name": "sort",
      "keyframes": [
        {
          "array": [5, 3, 8, 1, 2],
          "comparing": [0, 1],
          "line": 5
        }
      ],
      "code_highlight": "5,6",
      "display_order": 1
    }
  ]
}
```

#### **5. Execute User Code**
```http
POST /api/v1/execute/
Request:
{
  "code": "def my_func(arr):\n    return sorted(arr)",
  "language": "python",
  "input_data": [5, 3, 8]
}

Response:
{
  "success": true,
  "output": "[1, 3, 5, 8]",
  "error": "",
  "steps": [
    {
      "line": 1,
      "locals": {
        "arr": "[5, 3, 8]"
      }
    }
  ],
  "execution_time_ms": 15
}
```

---

## Data Flow

### Editorial Page Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  1. User navigates to /learn/basic-bubble-sort                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. EditorialPage.jsx useEffect() triggers                      │
│     - getConceptBySlug(slug)                                    │
│     - getVisualizationConfig(slug)                              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. Backend returns:                                            │
│     - Concept with sections & code snippets                     │
│     - Visualization config with animation steps                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. React state updated:                                        │
│     - setConcept(conceptData)                                   │
│     - setVizConfig(vizData)                                     │
│     - setCurrentArray(default_input.array)                      │
│     - generateAnimationSteps(array)                             │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  5. Components render:                                          │
│     LEFT: LearningPath displays sections                        │
│     CENTER: CompactArrayViz shows initial array                 │
│     RIGHT: SandboxPanel (if toggled)                            │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  6. User clicks "Sort" button                                   │
│     → AlgorithmControls.onActionClick("sort")                   │
│     → generateAnimationSteps() creates step-by-step trace       │
│     → Animation loop starts (setInterval)                       │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  7. Animation plays:                                            │
│     Each step updates:                                          │
│     - currentArray (visual array state)                         │
│     - currentLine (highlighted code line)                       │
│     - comparing/swapped indices (visual feedback)               │
│     - description text                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Sandbox Code Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  1. User writes code in SandboxPanel editor                     │
│     def custom_sort(arr):                                       │
│         return sorted(arr, reverse=True)                        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. User clicks "Run Code"                                      │
│     → POST /api/v1/execute/                                     │
│       {                                                         │
│         code: "def custom_sort...",                             │
│         language: "python",                                     │
│         input_data: [5, 3, 8, 1]                                │
│       }                                                         │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. Backend (executor.py):                                      │
│     - Creates temporary file with tracer wrapper                │
│     - Executes code in subprocess with timeout                  │
│     - Captures line-by-line execution steps                     │
│     - Returns {success, output, steps, error}                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. Frontend receives response:                                 │
│     If success:                                                 │
│       - Display output                                          │
│       - Animate execution steps                                 │
│       - Update visualization with result                        │
│     If error:                                                   │
│       - Show error message                                      │
│       - Highlight error line                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Code Execution & Sandbox

### Security Considerations

**Current Implementation** (`executor.py`):
- ✅ Subprocess isolation (not eval/exec directly)
- ✅ Timeout limit (5 seconds)
- ✅ Temporary files (auto-cleanup)
- ⚠️ Limited resource constraints

**Production Recommendations**:
1. **Docker Containers**: Execute each run in isolated container
2. **Resource Limits**: CPU, memory, disk quotas
3. **Restricted stdlib**: Disable dangerous modules (os, subprocess, sys)
4. **Network Isolation**: No external network access
5. **Rate Limiting**: Limit executions per user/IP

### Enhanced Executor Architecture (Production)

```python
# Enhanced executor with Docker
import docker

def execute_code_secure(code, language, input_data):
    client = docker.from_env()
    
    container = client.containers.run(
        image=f"dsa-sandbox-{language}:latest",
        command=["python", "/code/user_script.py"],
        volumes={
            temp_dir: {"bind": "/code", "mode": "ro"}
        },
        mem_limit="128m",
        cpu_quota=50000,
        network_disabled=True,
        timeout=5,
        detach=True
    )
    
    result = container.wait(timeout=5)
    output = container.logs()
    container.remove()
    
    return parse_output(output)
```

---

## Deployment Considerations

### Development Setup
```bash
# Backend
cd dsavisual/
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata core/fixtures/initial_data.json
python manage.py runserver

# Frontend
cd frontend/
npm install
npm run dev
```

### Production Architecture

```
Internet
   ↓
┌───────────────────┐
│  Nginx (443)      │  → Reverse Proxy + Static Files
│  SSL/TLS          │
└───────────────────┘
   ↓                ↓
   ↓              ┌─────────────────┐
   ↓              │ React (Static)  │
   ↓              │ /dist/ files    │
   ↓              └─────────────────┘
   ↓
┌───────────────────┐
│ Gunicorn/Daphne   │  → Django ASGI/WSGI
│ (8000)            │
└───────────────────┘
   ↓
┌───────────────────┐
│  Django App       │
│  (DRF APIs)       │
└───────────────────┘
   ↓
┌───────────────────┐
│  PostgreSQL       │
│  (5432)           │
└───────────────────┘
```

### Docker Compose Setup

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: dsavisual
      POSTGRES_USER: dsa_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./dsavisual
    command: gunicorn dsavisual.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ./dsavisual:/app
    environment:
      - DATABASE_URL=postgresql://dsa_user:secure_password@db:5432/dsavisual
    depends_on:
      - db

  frontend:
    build: ./frontend
    command: npm run build
    volumes:
      - frontend_build:/app/dist

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - frontend_build:/usr/share/nginx/html
    depends_on:
      - backend

volumes:
  postgres_data:
  frontend_build:
```

---

## Current Implementation Status

### ✅ Completed Features
1. **Database Models**: All models defined (Category, Topic, Concept, etc.)
2. **REST API**: Core endpoints implemented
3. **Frontend Routing**: React Router setup (Landing, Topics, Editorial)
4. **Visualization Components**: Array visualization, animation controls
5. **Code Execution**: Python sandbox with tracing
6. **Learning Path**: Editorial sections with code snippets
7. **Sandbox Panel**: User code editor and execution

### 🚧 Recommended Enhancements

#### High Priority
1. **Admin Interface**: Populate Django admin for content management
2. **Fixtures/Seeder**: Create sample data for all models
3. **Error Handling**: Comprehensive error boundaries in React
4. **Loading States**: Better UX during API calls
5. **Responsive Design**: Mobile-friendly layouts

#### Medium Priority
6. **User Authentication**: Track progress, save custom code
7. **Progress Tracking**: Mark concepts as completed
8. **Search Functionality**: Search across topics/concepts
9. **Multi-language Support**: Beyond Python (JS, C++, Java)
10. **Code Editor**: Integrate Monaco Editor for better UX

#### Low Priority (Future)
11. **Gamification**: Badges, achievements, leaderboards
12. **Social Features**: Share solutions, comments
13. **Video Integration**: Embed tutorial videos
14. **Mobile App**: React Native version
15. **AI Hints**: GPT-powered hints for learners

---

## File Structure Reference

### Backend
```
dsavisual/
├── manage.py
├── requirements.txt
├── db.sqlite3
├── dsavisual/              # Main project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── core/                   # Categories & Topics
│   ├── models.py           # Category, Topic
│   ├── views.py            # List/Detail APIs
│   ├── serializers.py
│   ├── urls.py
│   └── fixtures/
│       └── initial_data.json
├── concepts/               # Learning content
│   ├── models.py           # Concept, ConceptSection, CodeSnippet
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
└── visualizer/            # Visualization & execution
    ├── models.py           # VisualizationConfig, AnimationStep
    ├── views.py
    ├── serializers.py
    ├── urls.py
    └── services/
        └── executor.py     # Code execution logic
```

### Frontend
```
frontend/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api/
    │   └── client.js       # Axios wrapper
    ├── pages/
    │   ├── LandingPage.jsx       # Home + Categories
    │   ├── TopicListPage.jsx     # Topic + Concepts list
    │   └── EditorialPage.jsx     # Main learning interface
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx
    │   │   └── ResizablePanel.jsx
    │   ├── editorial/
    │   │   ├── LearningPath.jsx
    │   │   ├── LineExplanation.jsx
    │   │   └── CompleteCode.jsx
    │   ├── visualizer/
    │   │   ├── CompactArrayViz.jsx
    │   │   ├── CodeViewer.jsx
    │   │   ├── AlgorithmControls.jsx
    │   │   ├── AnimationControls.jsx
    │   │   └── CurrentLineExplanation.jsx
    │   └── sandbox/
    │       └── SandboxPanel.jsx
    └── styles/
        └── global.css
```

---

## Conclusion

Your DSA Visualization Tool architecture is **well-designed and production-ready**. The separation of concerns between:
- **Core** (organizational structure)
- **Concepts** (learning content)
- **Visualizer** (animations & execution)

...provides excellent modularity and scalability.

### Key Strengths
✅ Clean separation of backend apps  
✅ RESTful API design with DRF  
✅ React component modularity  
✅ Flexible data model for diverse DSA topics  
✅ Real-time code execution with tracing  
✅ Responsive 3-panel editorial layout  

### Next Steps
1. Populate database with sample content (Categories → Topics → Concepts)
2. Test complete user flow (Landing → Topic → Editorial → Sandbox)
3. Enhance security for code execution (Docker containers)
4. Add user authentication & progress tracking
5. Deploy to production (Docker + Nginx + PostgreSQL)

This architecture will scale beautifully as you add more algorithms, visualizations, and interactive features! 🚀

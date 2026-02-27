# DSA Visualization Tool - Complete Implementation Guide

> **Purpose**: Step-by-step technical implementation with production-ready code  
> **Audience**: Developers implementing or extending the system  
> **Version**: 2.0

## Quick Navigation

- [Part 1: Backend Setup & Models](#part-1-backend-setup--models)
- [Part 2: Serializers & API Views](#part-2-serializers--api-views)
- [Part 3: Code Execution Engine](#part-3-code-execution-engine)
- [Part 4: Frontend Components](#part-4-frontend-components)
- [Part 5: Animation System](#part-5-animation-system)
- [Part 6: Sandbox Implementation](#part-6-sandbox-implementation)

---

## Part 1: Backend Setup & Models

### Step 1.1: Django Project Setup

```bash
# Create project directory
mkdir dsa-visualization
cd dsa-visualization

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install Django and dependencies
pip install Django==4.2.10
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.1
pip install psycopg2-binary==2.9.9
pip install python-dotenv==1.0.1
pip install Pillow==10.2.0
pip install markdown==3.5.2

# Create Django project
django-admin startproject dsavisual .

# Create apps
python manage.py startapp core
python manage.py startapp concepts
python manage.py startapp visualizer
python manage.py startapp users
```

### Step 1.2: Settings Configuration

**`dsavisual/settings.py` (Complete Production-Ready Settings)**

```python
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Security Settings
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-in-production')
DEBUG = os.getenv('DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    'django_filters',
    
    # Local apps
    'core.apps.CoreConfig',
    'concepts.apps.ConceptsConfig',
    'visualizer.apps.VisualizerConfig',
    'users.apps.UsersConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'dsavisual.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dsavisual.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'dsavisual_db'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'postgres'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'ATOMIC_REQUESTS': True,
        'CONN_MAX_AGE': 600,
    }
}

# Use SQLite for development if PostgreSQL not available
if DEBUG and not os.getenv('DB_NAME'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
}

# CORS settings (adjust for production)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",  # React default
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True

# Code execution settings
CODE_EXECUTION_TIMEOUT = int(os.getenv('CODE_EXECUTION_TIMEOUT', 5))
CODE_EXECUTION_MEMORY_LIMIT_MB = int(os.getenv('CODE_EXECUTION_MEMORY_LIMIT_MB', 128))
CODE_EXECUTION_MAX_OUTPUT_SIZE = int(os.getenv('CODE_EXECUTION_MAX_OUTPUT_SIZE', 10000))

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs' / 'django.log',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'visualizer.services': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

# Create logs directory
(BASE_DIR / 'logs').mkdir(exist_ok=True)
```

**`.env.example`**

```bash
# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=dsavisual_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

# Code Execution
CODE_EXECUTION_TIMEOUT=5
CODE_EXECUTION_MEMORY_LIMIT_MB=128
CODE_EXECUTION_MAX_OUTPUT_SIZE=10000

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Step 1.3: Complete Models Implementation

**`core/models.py` (Enhanced)**

```python
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator
from django.urls import reverse


class TimestampedModel(models.Model):
    """Abstract base model with timestamp fields."""
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SoftDeleteManager(models.Manager):
    """Manager that filters out soft-deleted objects."""
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class SoftDeleteModel(models.Model):
    """Abstract model for soft deletion."""
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = SoftDeleteManager()
    all_objects = models.Manager()  # includes deleted

    class Meta:
        abstract = True

    def soft_delete(self):
        from django.utils import timezone
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.is_deleted = False
        self.deleted_at = None
        self.save()


class Category(TimestampedModel, SoftDeleteModel):
    """
    Top-level content organization.
    
    Examples:
    - Sorting Algorithms
    - Searching Algorithms
    - Tree Data Structures
    - Graph Algorithms
    - Dynamic Programming
    """
    
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Category name"
    )
    slug = models.SlugField(
        max_length=120,
        unique=True,
        blank=True,
        db_index=True
    )
    description = models.TextField(
        blank=True,
        help_text="Rich text description (supports Markdown)"
    )
    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="Icon identifier (emoji, FA class, or image URL)"
    )
    cover_image = models.ImageField(
        upload_to='categories/',
        null=True,
        blank=True,
        help_text="Header image for category page"
    )
    color_theme = models.CharField(
        max_length=7,
        default='#3B82F6',
        help_text="Hex color code for UI theming"
    )
    display_order = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    is_active = models.BooleanField(default=True, db_index=True)
    is_featured = models.BooleanField(default=False)
    
    # Metadata
    view_count = models.PositiveIntegerField(default=0)
    total_learners = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        indexes = [
            models.Index(fields=['slug', 'is_active']),
            models.Index(fields=['is_featured', 'display_order']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('api:category-detail', kwargs={'slug': self.slug})

    @property
    def topics_count(self):
        return self.topics.filter(is_active=True, is_deleted=False).count()

    @property
    def total_concepts(self):
        from concepts.models import Concept
        return Concept.objects.filter(
            topic__category=self,
            is_active=True,
            is_deleted=False
        ).count()

    def increment_view_count(self):
        """Atomic increment of view count."""
        Category.objects.filter(pk=self.pk).update(
            view_count=models.F('view_count') + 1
        )


class Topic(TimestampedModel, SoftDeleteModel):
    """
    Individual learning topics within a category.
    
    Examples:
    - Binary Search (under Searching)
    - Bubble Sort (under Sorting)
    - Binary Search Tree (under Trees)
    """
    
    DIFFICULTY_BEGINNER = 'beginner'
    DIFFICULTY_EASY = 'easy'
    DIFFICULTY_MEDIUM = 'medium'
    DIFFICULTY_HARD = 'hard'
    DIFFICULTY_EXPERT = 'expert'
    
    DIFFICULTY_CHOICES = [
        (DIFFICULTY_BEGINNER, 'Beginner'),
        (DIFFICULTY_EASY, 'Easy'),
        (DIFFICULTY_MEDIUM, 'Medium'),
        (DIFFICULTY_HARD, 'Hard'),
        (DIFFICULTY_EXPERT, 'Expert'),
    ]
    
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='topics'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True, db_index=True)
    short_description = models.TextField(
        max_length=500,
        blank=True,
        help_text="Brief overview for cards/lists"
    )
    full_description = models.TextField(
        blank=True,
        help_text="Detailed description with learning outcomes"
    )
    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default=DIFFICULTY_EASY
    )
    icon = models.CharField(max_length=100, blank=True)
    cover_image = models.ImageField(
        upload_to='topics/',
        null=True,
        blank=True
    )
    display_order = models.PositiveIntegerField(default=0)
    
    # Prerequisites
    prerequisites = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False,
        related_name='unlocks',
        help_text="Topics that should be completed first"
    )
    
    # Time estimation
    estimated_time_minutes = models.PositiveIntegerField(
        default=30,
        help_text="Estimated completion time"
    )
    
    # Status
    is_active = models.BooleanField(default=True, db_index=True)
    is_coming_soon = models.BooleanField(default=False)
    
    # Metadata
    view_count = models.PositiveIntegerField(default=0)
    completion_count = models.PositiveIntegerField(default=0)
    average_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0), MinValueValidator(5)]
    )
    
    class Meta:
        ordering = ['display_order', 'title']
        verbose_name = 'Topic'
        verbose_name_plural = 'Topics'
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['category', 'display_order', 'is_active']),
            models.Index(fields=['difficulty']),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=['category', 'title'],
                name='unique_topic_title_per_category',
                condition=models.Q(is_deleted=False)
            )
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.category.slug}-{self.title}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.get_difficulty_display()})"

    def get_absolute_url(self):
        return reverse('api:topic-detail', kwargs={'slug': self.slug})

    @property
    def concepts_count(self):
        return self.concepts.filter(is_active=True, is_deleted=False).count()

    @property
    def difficulty_level_numeric(self):
        """Return numeric difficulty (1-5) for sorting/filtering."""
        levels = {
            self.DIFFICULTY_BEGINNER: 1,
            self.DIFFICULTY_EASY: 2,
            self.DIFFICULTY_MEDIUM: 3,
            self.DIFFICULTY_HARD: 4,
            self.DIFFICULTY_EXPERT: 5,
        }
        return levels.get(self.difficulty, 2)

    def increment_view_count(self):
        Topic.objects.filter(pk=self.pk).update(
            view_count=models.F('view_count') + 1
        )

    def increment_completion_count(self):
        Topic.objects.filter(pk=self.pk).update(
            completion_count=models.F('completion_count') + 1
        )
```

**`concepts/models.py` (Complete Implementation)**

```python
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import Topic, TimestampedModel, SoftDeleteModel


class Concept(TimestampedModel, SoftDeleteModel):
    """
    A specific concept/algorithm within a topic to be learned.
    
    Example: "Basic Binary Search" under "Binary Search" topic
    """
    
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name='concepts'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True, db_index=True)
    overview = models.TextField(
        blank=True,
        help_text="High-level introduction shown at page top"
    )
    
    # Complexity analysis
    time_complexity_best = models.CharField(max_length=50, blank=True)
    time_complexity_average = models.CharField(max_length=50, blank=True)
    time_complexity_worst = models.CharField(max_length=50, blank=True)
    space_complexity = models.CharField(max_length=50, blank=True)
    
    # Learning metadata
    display_order = models.PositiveIntegerField(default=0)
    estimated_time_minutes = models.PositiveIntegerField(default=15)
    is_active = models.BooleanField(default=True, db_index=True)
    is_premium = models.BooleanField(default=False)
    
    # Analytics
    view_count = models.PositiveIntegerField(default=0)
    completion_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['display_order', 'title']
        verbose_name = 'Concept'
        verbose_name_plural = 'Concepts'
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['topic', 'display_order', 'is_active']),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=['topic', 'title'],
                name='unique_concept_per_topic',
                condition=models.Q(is_deleted=False)
            )
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            self.slug = f"{self.topic.slug}-{base_slug}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    @property
    def sections_count(self):
        return self.sections.filter(is_active=True).count()

    def increment_view_count(self):
        Concept.objects.filter(pk=self.pk).update(
            view_count=models.F('view_count') + 1
        )


class ConceptSection(TimestampedModel):
    """
    A section within a concept's editorial (learning path).
    
    Types:
    - explanation: Text-based explanation
    - code: Code example with explanation
    - visualization: Interactive demonstration
    - example: Worked example
    - practice: Practice problem
    - summary: Recap section
    """
    
    SECTION_TYPE_EXPLANATION = 'explanation'
    SECTION_TYPE_CODE = 'code'
    SECTION_TYPE_VISUALIZATION = 'visualization'
    SECTION_TYPE_EXAMPLE = 'example'
    SECTION_TYPE_PRACTICE = 'practice'
    SECTION_TYPE_SUMMARY = 'summary'
    
    SECTION_TYPE_CHOICES = [
        (SECTION_TYPE_EXPLANATION, 'Explanation'),
        (SECTION_TYPE_CODE, 'Code'),
        (SECTION_TYPE_VISUALIZATION, 'Visualization'),
        (SECTION_TYPE_EXAMPLE, 'Example'),
        (SECTION_TYPE_PRACTICE, 'Practice'),
        (SECTION_TYPE_SUMMARY, 'Summary'),
    ]
    
    concept = models.ForeignKey(
        Concept,
        on_delete=models.CASCADE,
        related_name='sections'
    )
    title = models.CharField(max_length=200)
    content = models.TextField(
        blank=True,
        help_text="Markdown-formatted content"
    )
    section_type = models.CharField(
        max_length=20,
        choices=SECTION_TYPE_CHOICES,
        default=SECTION_TYPE_EXPLANATION
    )
    display_order = models.PositiveIntegerField(default=0)
    estimated_time_minutes = models.PositiveIntegerField(
        default=5,
        help_text="Estimated reading/completion time"
    )
    is_active = models.BooleanField(default=True)
    is_collapsible = models.BooleanField(
        default=False,
        help_text="Can this section be collapsed?"
    )
    is_optional = models.BooleanField(
        default=False,
        help_text="Is this section optional for completion?"
    )
    
    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = 'Concept Section'
        verbose_name_plural = 'Concept Sections'
        indexes = [
            models.Index(fields=['concept', 'display_order']),
        ]

    def __str__(self):
        return f"{self.concept.title} - {self.title}"

    @property
    def code_snippets_count(self):
        return self.code_snippets.count()


class CodeSnippet(TimestampedModel):
    """
    Code examples within a section.
    """
    
    LANGUAGE_PYTHON = 'python'
    LANGUAGE_JAVASCRIPT = 'javascript'
    LANGUAGE_JAVA = 'java'
    LANGUAGE_CPP = 'cpp'
    LANGUAGE_C = 'c'
    LANGUAGE_CSHARP = 'csharp'
    LANGUAGE_GO = 'go'
    LANGUAGE_RUST = 'rust'
    
    LANGUAGE_CHOICES = [
        (LANGUAGE_PYTHON, 'Python'),
        (LANGUAGE_JAVASCRIPT, 'JavaScript'),
        (LANGUAGE_JAVA, 'Java'),
        (LANGUAGE_CPP, 'C++'),
        (LANGUAGE_C, 'C'),
        (LANGUAGE_CSHARP, 'C#'),
        (LANGUAGE_GO, 'Go'),
        (LANGUAGE_RUST, 'Rust'),
    ]
    
    section = models.ForeignKey(
        ConceptSection,
        on_delete=models.CASCADE,
        related_name='code_snippets'
    )
    language = models.CharField(
        max_length=20,
        choices=LANGUAGE_CHOICES,
        default=LANGUAGE_PYTHON
    )
    code = models.TextField(help_text="The actual code")
    explanation = models.TextField(
        blank=True,
        help_text="What this code does"
    )
    is_final_code = models.BooleanField(
        default=False,
        help_text="Is this the complete implementation?"
    )
    is_executable = models.BooleanField(
        default=True,
        help_text="Can users run this code?"
    )
    expected_output = models.TextField(
        blank=True,
        help_text="Expected console output when run"
    )
    display_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = 'Code Snippet'
        verbose_name_plural = 'Code Snippets'
        indexes = [
            models.Index(fields=['section', 'display_order']),
            models.Index(fields=['language', 'is_executable']),
        ]

    def __str__(self):
        return f"{self.section} - {self.language} snippet"

    @property
    def line_count(self):
        return len(self.code.splitlines())
```

**`visualizer/models.py` (Complete Implementation)**

```python
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import TimestampedModel
from concepts.models import Concept


class VisualizationConfig(TimestampedModel):
    """
    Configuration for how a concept should be visualized.
    """
    
    # Visualization types
    VIZ_TYPE_ARRAY = 'array'
    VIZ_TYPE_LINKED_LIST = 'linked_list'
    VIZ_TYPE_STACK = 'stack'
    VIZ_TYPE_QUEUE = 'queue'
    VIZ_TYPE_TREE = 'tree'
    VIZ_TYPE_GRAPH = 'graph'
    VIZ_TYPE_HEAP = 'heap'
    VIZ_TYPE_HASH_TABLE = 'hash_table'
    VIZ_TYPE_MATRIX = 'matrix'
    
    VIZ_TYPE_CHOICES = [
        (VIZ_TYPE_ARRAY, 'Array'),
        (VIZ_TYPE_LINKED_LIST, 'Linked List'),
        (VIZ_TYPE_STACK, 'Stack'),
        (VIZ_TYPE_QUEUE, 'Queue'),
        (VIZ_TYPE_TREE, 'Tree'),
        (VIZ_TYPE_GRAPH, 'Graph'),
        (VIZ_TYPE_HEAP, 'Heap'),
        (VIZ_TYPE_HASH_TABLE, 'Hash Table'),
        (VIZ_TYPE_MATRIX, 'Matrix'),
    ]
    
    concept = models.OneToOneField(
        Concept,
        on_delete=models.CASCADE,
        related_name='visualization',
        primary_key=True
    )
    viz_type = models.CharField(
        max_length=20,
        choices=VIZ_TYPE_CHOICES,
        help_text="Primary visualization type"
    )
    
    # Default configuration
    default_input = models.JSONField(
        default=dict,
        blank=True,
        help_text="Default data structure state. E.g., {'array': [5,3,8,1,2]}"
    )
    
    # Available actions
    action_options = models.JSONField(
        default=list,
        blank=True,
        help_text="Available user actions. E.g., ['sort', 'search', 'insert', 'delete']"
    )
    
    # Constraints
    max_array_size = models.PositiveIntegerField(
        default=20,
        help_text="Maximum elements to visualize"
    )
    min_value = models.IntegerField(default=-999)
    max_value = models.IntegerField(default=999)
    
    # Animation settings
    animation_speed_default = models.FloatField(
        default=1.0,
        validators=[MinValueValidator(0.1), MaxValueValidator(5.0)],
        help_text="Default animation speed multiplier"
    )
    supports_step_mode = models.BooleanField(
        default=True,
        help_text="Can user step through frame-by-frame?"
    )
    
    # Canvas settings
    canvas_width = models.PositiveIntegerField(default=800)
    canvas_height = models.PositiveIntegerField(default=600)
    
    class Meta:
        verbose_name = 'Visualization Config'
        verbose_name_plural = 'Visualization Configs'

    def __str__(self):
        return f"{self.concept.title} - {self.get_viz_type_display()}"


class AnimationStep(TimestampedModel):
    """
    Predefined animation keyframes for a specific action.
    
    Example: For "bubble_sort" action on [5,3,8,1], this might have:
    - Step 1: Compare indices 0,1 (5 vs 3)
    - Step 2: Swap indices 0,1
    - Step 3: Compare indices 1,2 (5 vs 8)
    - ... etc
    """
    
    viz_config = models.ForeignKey(
        VisualizationConfig,
        on_delete=models.CASCADE,
        related_name='animation_steps'
    )
    action_name = models.CharField(
        max_length=50,
        help_text="Action this step belongs to (e.g., 'sort', 'search_42')"
    )
    
    # Keyframe data
    keyframes = models.JSONField(
        default=list,
        help_text="""
        Array of frame objects. Example:
        [
            {
                "array": [5, 3, 8, 1],
                "comparing": [0, 1],
                "swapped": [],
                "sorted": [],
                "pointers": {"left": 0, "right": 3},
                "description": "Comparing elements at indices 0 and 1"
            },
            ...
        ]
        """
    )
    
    # Code synchronization
    code_highlight_lines = models.CharField(
        max_length=200,
        blank=True,
        help_text="Comma-separated line numbers to highlight (e.g., '5,6,7')"
    )
    
    # Descriptive info
    description = models.TextField(
        blank=True,
        help_text="Human-readable description of this step"
    )
    
    # Ordering
    display_order = models.PositiveIntegerField(default=0)
    
    # Timing
    duration_ms = models.PositiveIntegerField(
        default=1000,
        help_text="How long this step should last (milliseconds)"
    )
    
    class Meta:
        ordering = ['action_name', 'display_order']
        verbose_name = 'Animation Step'
        verbose_name_plural = 'Animation Steps'
        indexes = [
            models.Index(fields=['viz_config', 'action_name', 'display_order']),
        ]

    def __str__(self):
        return f"{self.viz_config} - {self.action_name} (Step {self.display_order})"
```

**`users/models.py` (New App for User Management)**

```python
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import TimestampedModel
from concepts.models import Concept


class UserProfile(TimestampedModel):
    """
    Extended user profile with learning preferences and statistics.
    """
    
    THEME_LIGHT = 'light'
    THEME_DARK = 'dark'
    THEME_AUTO = 'auto'
    
    THEME_CHOICES = [
        (THEME_LIGHT, 'Light'),
        (THEME_DARK, 'Dark'),
        (THEME_AUTO, 'Auto'),
    ]
    
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        primary_key=True
    )
    
    # Profile info
    avatar = models.ImageField(
        upload_to='avatars/',
        null=True,
        blank=True
    )
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    
    # Preferences
    preferred_language = models.CharField(
        max_length=20,
        default='python',
        help_text="Default programming language preference"
    )
    theme_preference = models.CharField(
        max_length=10,
        choices=THEME_CHOICES,
        default=THEME_AUTO
    )
    email_notifications = models.BooleanField(default=True)
    
    # Statistics
    total_concepts_completed = models.PositiveIntegerField(default=0)
    total_time_spent_minutes = models.PositiveIntegerField(default=0)
    streak_days = models.PositiveIntegerField(default=0)
    max_streak_days = models.PositiveIntegerField(default=0)
    last_activity_date = models.DateField(null=True, blank=True)
    points = models.PositiveIntegerField(default=0)
    level = models.PositiveIntegerField(default=1)
    
    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return f"Profile: {self.user.username}"

    def update_streak(self):
        """Update learning streak based on activity."""
        from django.utils import timezone
        from datetime import timedelta
        
        today = timezone.now().date()
        
        if not self.last_activity_date:
            self.streak_days = 1
            self.last_activity_date = today
        elif self.last_activity_date == today - timedelta(days=1):
            # Consecutive day
            self.streak_days += 1
            self.last_activity_date = today
            if self.streak_days > self.max_streak_days:
                self.max_streak_days = self.streak_days
        elif self.last_activity_date < today - timedelta(days=1):
            # Streak broken
            self.streak_days = 1
            self.last_activity_date = today
        # Same day - no change
        
        self.save()


class ConceptProgress(TimestampedModel):
    """
    Tracks user progress on individual concepts.
    """
    
    STATUS_NOT_STARTED = 'not_started'
    STATUS_IN_PROGRESS = 'in_progress'
    STATUS_COMPLETED = 'completed'
    
    STATUS_CHOICES = [
        (STATUS_NOT_STARTED, 'Not Started'),
        (STATUS_IN_PROGRESS, 'In Progress'),
        (STATUS_COMPLETED, 'Completed'),
    ]
    
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='concept_progress'
    )
    concept = models.ForeignKey(
        Concept,
        on_delete=models.CASCADE,
        related_name='user_progress'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_NOT_STARTED
    )
    progress_percentage = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    time_spent_minutes = models.PositiveIntegerField(default=0)
    last_accessed_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Detailed progress
    completed_sections = models.JSONField(
        default=list,
        help_text="List of completed section IDs"
    )
    
    class Meta:
        verbose_name = 'Concept Progress'
        verbose_name_plural = 'Concept Progress Records'
        unique_together = [['user_profile', 'concept']]
        indexes = [
            models.Index(fields=['user_profile', 'status']),
            models.Index(fields=['concept', 'status']),
        ]

    def __str__(self):
        return f"{self.user_profile.user.username} - {self.concept.title} ({self.status})"

    def mark_completed(self):
        """Mark concept as completed."""
        from django.utils import timezone
        
        if self.status != self.STATUS_COMPLETED:
            self.status = self.STATUS_COMPLETED
            self.progress_percentage = 100
            self.completed_at = timezone.now()
            self.save()
            
            # Update profile statistics
            self.user_profile.total_concepts_completed += 1
            self.user_profile.save()
            
            # Update concept statistics
            self.concept.increment_completion_count()
            self.concept.topic.increment_completion_count()


class CodeSnippetSubmission(TimestampedModel):
    """
    User-submitted code executions (sandbox history).
    """
    
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='code_submissions'
    )
    concept = models.ForeignKey(
        Concept,
        on_delete=models.CASCADE,
        related_name='code_submissions',
        null=True,
        blank=True
    )
    code = models.TextField()
    language = models.CharField(max_length=20, default='python')
    input_data = models.JSONField(default=dict, blank=True)
    execution_result = models.JSONField(
        default=dict,
        help_text="Contains output, error, steps, etc."
    )
    is_successful = models.BooleanField(default=False)
    execution_time_ms = models.PositiveIntegerField(default=0)
    
    class Meta:
        verbose_name = 'Code Submission'
        verbose_name_plural = 'Code Submissions'
        indexes = [
            models.Index(fields=['user_profile', '-created_at']),
            models.Index(fields=['concept', 'is_successful']),
        ]
        ordering = ['-created_at']

    def __str__(self):
        status = "Success" if self.is_successful else "Failed"
        return f"{self.user_profile.user.username} - {self.language} ({status})"
```

This is getting comprehensive! Let me continue adding serializers, views, and API implementations in a follow-up response. The document is growing nicely with production-ready code. Would you like me to continue with the complete serializers and views implementation next?
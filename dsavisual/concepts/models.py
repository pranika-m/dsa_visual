from django.db import models
from django.utils.text import slugify

from core.models import Topic


class Concept(models.Model):
    """A learnable concept within a topic (e.g., 'Binary Search Algorithm')."""

    topic = models.ForeignKey(
        Topic, on_delete=models.CASCADE, related_name="concepts"
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    overview = models.TextField(
        blank=True,
        help_text="Brief overview shown at the top of the editorial page."
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order", "title"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ConceptSection(models.Model):
    """A section within a concept's editorial (explanation, code, summary)."""

    SECTION_TYPE_CHOICES = [
        ("explanation", "Explanation"),
        ("code", "Code"),
        ("summary", "Summary"),
    ]

    concept = models.ForeignKey(
        Concept, on_delete=models.CASCADE, related_name="sections"
    )
    title = models.CharField(max_length=200)
    content = models.TextField(
        blank=True,
        help_text="Markdown-formatted editorial text."
    )
    section_type = models.CharField(
        max_length=20, choices=SECTION_TYPE_CHOICES, default="explanation"
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.concept.title} — {self.title}"


class CodeSnippet(models.Model):
    """A code snippet embedded within a concept section."""

    LANGUAGE_CHOICES = [
        ("python", "Python"),
        ("javascript", "JavaScript"),
        ("cpp", "C++"),
        ("java", "Java"),
    ]

    section = models.ForeignKey(
        ConceptSection, on_delete=models.CASCADE, related_name="code_snippets"
    )
    language = models.CharField(
        max_length=20, choices=LANGUAGE_CHOICES, default="python"
    )
    code = models.TextField()
    explanation = models.TextField(blank=True)
    is_final_code = models.BooleanField(
        default=False,
        help_text="Whether this is the complete implementation code."
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.section} — {self.language} snippet"

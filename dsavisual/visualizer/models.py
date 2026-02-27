from django.db import models

from concepts.models import Concept


class VisualizationConfig(models.Model):
    """Configuration tying a concept to its visualization type and defaults."""

    VIZ_TYPE_CHOICES = [
        ("array", "Array"),
        ("linked_list", "Linked List"),
        ("stack", "Stack"),
        ("queue", "Queue"),
        ("tree", "Tree"),
        ("graph", "Graph"),
        ("heap", "Heap"),
    ]

    concept = models.OneToOneField(
        Concept, on_delete=models.CASCADE, related_name="visualization"
    )
    viz_type = models.CharField(max_length=20, choices=VIZ_TYPE_CHOICES)
    default_input = models.JSONField(
        default=dict, blank=True,
        help_text='Default data for the visualization, e.g. {"array": [5,3,8,1]}'
    )
    action_options = models.JSONField(
        default=list, blank=True,
        help_text='Available actions, e.g. ["insert", "delete", "search"]'
    )

    def __str__(self):
        return f"{self.concept.title} — {self.get_viz_type_display()}"


class AnimationStep(models.Model):
    """A single animation step (keyframe set) for a particular action."""

    config = models.ForeignKey(
        VisualizationConfig, on_delete=models.CASCADE, related_name="animation_steps"
    )
    action_name = models.CharField(
        max_length=50,
        help_text='Action this step belongs to (e.g., "insert", "sort_step")'
    )
    keyframes = models.JSONField(
        default=list,
        help_text="Array of frame objects describing state transitions."
    )
    code_highlight = models.TextField(
        blank=True,
        help_text="Comma-separated line numbers to highlight during this step."
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.config} — {self.action_name} (step {self.display_order})"

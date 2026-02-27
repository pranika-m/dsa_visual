from django.contrib import admin

from .models import VisualizationConfig, AnimationStep


class AnimationStepInline(admin.TabularInline):
    model = AnimationStep
    extra = 1


@admin.register(VisualizationConfig)
class VisualizationConfigAdmin(admin.ModelAdmin):
    list_display = ("concept", "viz_type")
    list_filter = ("viz_type",)
    inlines = [AnimationStepInline]


@admin.register(AnimationStep)
class AnimationStepAdmin(admin.ModelAdmin):
    list_display = ("config", "action_name", "display_order")
    list_filter = ("action_name",)

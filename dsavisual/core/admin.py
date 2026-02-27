from django.contrib import admin

from .models import Category, Topic


class TopicInline(admin.TabularInline):
    model = Topic
    extra = 1
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "display_order")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [TopicInline]


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "difficulty", "display_order")
    list_filter = ("category", "difficulty")
    prepopulated_fields = {"slug": ("title",)}

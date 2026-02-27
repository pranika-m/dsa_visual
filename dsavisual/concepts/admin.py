from django.contrib import admin

from .models import Concept, ConceptSection, CodeSnippet


class CodeSnippetInline(admin.TabularInline):
    model = CodeSnippet
    extra = 1


class ConceptSectionInline(admin.StackedInline):
    model = ConceptSection
    extra = 1


@admin.register(Concept)
class ConceptAdmin(admin.ModelAdmin):
    list_display = ("title", "topic", "display_order")
    list_filter = ("topic__category",)
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ConceptSectionInline]


@admin.register(ConceptSection)
class ConceptSectionAdmin(admin.ModelAdmin):
    list_display = ("title", "concept", "section_type", "display_order")
    list_filter = ("section_type",)
    inlines = [CodeSnippetInline]


@admin.register(CodeSnippet)
class CodeSnippetAdmin(admin.ModelAdmin):
    list_display = ("section", "language", "is_final_code", "display_order")
    list_filter = ("language", "is_final_code")

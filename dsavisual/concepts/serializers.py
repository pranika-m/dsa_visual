from rest_framework import serializers

from .models import Concept, ConceptSection, CodeSnippet


class CodeSnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSnippet
        fields = [
            "id", "language", "code", "explanation",
            "is_final_code", "display_order",
        ]


class ConceptSectionSerializer(serializers.ModelSerializer):
    code_snippets = CodeSnippetSerializer(many=True, read_only=True)

    class Meta:
        model = ConceptSection
        fields = [
            "id", "title", "content", "section_type",
            "display_order", "code_snippets",
        ]


class ConceptListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing concepts within a topic."""

    class Meta:
        model = Concept
        fields = ["id", "title", "slug", "overview", "display_order"]


class ConceptDetailSerializer(serializers.ModelSerializer):
    """Full editorial content: concept → sections → code snippets."""

    sections = ConceptSectionSerializer(many=True, read_only=True)

    class Meta:
        model = Concept
        fields = [
            "id", "title", "slug", "overview",
            "display_order", "sections",
        ]

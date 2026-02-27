from rest_framework import serializers

from .models import Category, Topic


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = [
            "id", "title", "slug", "short_description",
            "difficulty", "icon", "display_order",
        ]


class CategoryListSerializer(serializers.ModelSerializer):
    """Categories with nested topics (for the landing page)."""

    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = [
            "id", "name", "slug", "description",
            "icon", "display_order", "topics",
        ]


class CategoryDetailSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = [
            "id", "name", "slug", "description",
            "icon", "topics",
        ]

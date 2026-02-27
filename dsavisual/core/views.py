from rest_framework import generics

from .models import Category, Topic
from .serializers import CategoryListSerializer, CategoryDetailSerializer
from concepts.serializers import ConceptListSerializer


class CategoryListView(generics.ListAPIView):
    """GET /api/v1/categories/ — All categories with nested topics."""

    queryset = Category.objects.prefetch_related("topics").all()
    serializer_class = CategoryListSerializer


class CategoryDetailView(generics.RetrieveAPIView):
    """GET /api/v1/categories/<slug>/ — Single category with its topics."""

    queryset = Category.objects.prefetch_related("topics").all()
    serializer_class = CategoryDetailSerializer
    lookup_field = "slug"


class TopicDetailView(generics.RetrieveAPIView):
    """GET /api/v1/topics/<slug>/ — Topic detail with its concepts."""

    queryset = Topic.objects.prefetch_related("concepts").all()
    lookup_field = "slug"

    def get_serializer_class(self):
        from rest_framework import serializers as s

        # Inline serializer that includes nested concepts
        class TopicWithConceptsSerializer(s.ModelSerializer):
            concepts = ConceptListSerializer(many=True, read_only=True)

            class Meta:
                model = Topic
                fields = [
                    "id", "title", "slug", "short_description",
                    "difficulty", "icon", "concepts",
                ]

        return TopicWithConceptsSerializer

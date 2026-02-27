from rest_framework import generics

from .models import Concept
from .serializers import ConceptDetailSerializer


class ConceptDetailView(generics.RetrieveAPIView):
    """GET /api/v1/concepts/<slug>/ — Full editorial content."""

    queryset = Concept.objects.prefetch_related(
        "sections__code_snippets"
    ).all()
    serializer_class = ConceptDetailSerializer
    lookup_field = "slug"

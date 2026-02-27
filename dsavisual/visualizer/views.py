from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from concepts.models import Concept
from .models import VisualizationConfig
from .serializers import VisualizationConfigSerializer, CodeExecutionSerializer
from .services.executor import execute_code


class VisualizationConfigView(generics.RetrieveAPIView):
    """GET /api/v1/concepts/<slug>/visualization/ — Viz config + animation steps."""

    serializer_class = VisualizationConfigSerializer

    def get_object(self):
        from django.shortcuts import get_object_or_404
        concept_slug = self.kwargs["slug"]
        return get_object_or_404(
            VisualizationConfig.objects.prefetch_related("animation_steps"),
            concept__slug=concept_slug
        )


class CodeExecutionView(APIView):
    """POST /api/v1/execute/ — Run user code in sandbox and return trace."""

    def post(self, request):
        serializer = CodeExecutionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        result = execute_code(
            code=data["code"],
            language=data["language"],
            input_data=data.get("input_data"),
        )

        return Response(result, status=status.HTTP_200_OK)

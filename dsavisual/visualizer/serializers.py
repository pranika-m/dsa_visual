from rest_framework import serializers

from .models import VisualizationConfig, AnimationStep


class AnimationStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimationStep
        fields = [
            "id", "action_name", "keyframes",
            "code_highlight", "display_order",
        ]


class VisualizationConfigSerializer(serializers.ModelSerializer):
    animation_steps = AnimationStepSerializer(many=True, read_only=True)

    class Meta:
        model = VisualizationConfig
        fields = [
            "id", "viz_type", "default_input",
            "action_options", "animation_steps",
        ]


class CodeExecutionSerializer(serializers.Serializer):
    """Validates user-submitted code for sandbox execution."""

    code = serializers.CharField()
    language = serializers.ChoiceField(
        choices=["python", "c", "cpp", "java"],
        default="python",
    )
    input_data = serializers.JSONField(required=False, default=list)
    viz_type = serializers.ChoiceField(
        choices=["array", "linked_list", "stack", "queue", "tree", "graph", "heap"],
        required=False,
    )

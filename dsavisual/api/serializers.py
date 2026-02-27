from rest_framework import serializers
from concepts.models import Concept
from core.models import Topic
from visualizer.models import VisualizationConfig as visuals

class ConceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concept
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'
    
class VisualizationConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = visuals
        fields = '__all__'
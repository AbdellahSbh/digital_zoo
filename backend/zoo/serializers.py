from rest_framework import serializers
from .models import Animal, Habitat, Species, FeedingSchedule

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'

class HabitatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitat
        fields = '__all__'

class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = '__all__'
class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = '__all__'

class FeedingScheduleSerializer(serializers.ModelSerializer):
    animal = serializers.PrimaryKeyRelatedField(queryset=Animal.objects.all()) 
    class Meta:
        model = FeedingSchedule
        fields = '__all__'

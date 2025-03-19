from rest_framework import serializers
from .models import Animal, Habitat, Species, FeedingSchedule, Ticket, Zookeeper, CareRoutine
from .models import MembershipTier, Membership, SpecialEvent, EventBooking

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
        model = Ticket
        fields = '__all__'

class FeedingScheduleSerializer(serializers.ModelSerializer):
    animal = serializers.PrimaryKeyRelatedField(queryset=Animal.objects.all()) 
    class Meta:
        model = FeedingSchedule
        fields = '__all__'


class ZookeeperSerializer(serializers.ModelSerializer):
    assigned_animals = serializers.PrimaryKeyRelatedField(many=True, queryset=Animal.objects.all(), required=False)

    class Meta:
        model = Zookeeper
        fields = '__all__'

class CareRoutineSerializer(serializers.ModelSerializer):
    zookeeper = serializers.PrimaryKeyRelatedField(queryset=Zookeeper.objects.all()) 
    animal = serializers.PrimaryKeyRelatedField(queryset=Animal.objects.all()) 

    class Meta:
        model = CareRoutine
        fields = '__all__'


class MembershipTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipTier
        fields = '__all__'


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'

class SpecialEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialEvent
        fields = '__all__'

class EventBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventBooking
        fields = '__all__'



from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email"] 

from rest_framework import viewsets
from .models import Animal, Habitat, Species, FeedingSchedule, Ticket, Zookeeper, CareRoutine
from .serializers import (
    AnimalSerializer, HabitatSerializer, SpeciesSerializer, FeedingScheduleSerializer,
    TicketSerializer, ZookeeperSerializer, CareRoutineSerializer
)
from .models import MembershipTier, SpecialEvent, Membership, EventBooking
from .serializers import MembershipTierSerializer, MembershipSerializer, SpecialEventSerializer, EventBookingSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Count
from django.http import JsonResponse
from .models import CustomUser
from rest_framework import status

# ✅ Animal, Habitat, and Species ViewSets
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer

class SpeciesViewSet(viewsets.ModelViewSet):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer

# ✅ Feeding Schedule
class FeedingScheduleViewSet(viewsets.ModelViewSet):
    queryset = FeedingSchedule.objects.all()
    serializer_class = FeedingScheduleSerializer

# ✅ Ticket Management
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
 

# ✅ Zookeeper Management
class ZookeeperViewSet(viewsets.ModelViewSet):
    queryset = Zookeeper.objects.all()
    serializer_class = ZookeeperSerializer

    # ✅ Fetch only zookeepers with <5 assigned animals


# ✅ Care Routine Management
class CareRoutineViewSet(viewsets.ModelViewSet):
    queryset = CareRoutine.objects.all()
    serializer_class = CareRoutineSerializer

class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    def create(self, request, *args, **kwargs):
        print("🔎 Incoming Request Data:", request.data)  # ✅ Debugging Log
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("❌ Validation Error:", serializer.errors)  # ✅ Debugging Log
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Membership Tiers View
class MembershipTierViewSet(viewsets.ModelViewSet):
    queryset = MembershipTier.objects.all()
    serializer_class = MembershipTierSerializer


# ✅ Special Events View
class SpecialEventViewSet(viewsets.ModelViewSet):
    queryset = SpecialEvent.objects.all()
    serializer_class = SpecialEventSerializer

# ✅ Event Booking View
class EventBookingViewSet(viewsets.ModelViewSet):
    queryset = EventBooking.objects.all()
    serializer_class = EventBookingSerializer

from .models import MembershipTier, SpecialEvent
from .serializers import MembershipTierSerializer, SpecialEventSerializer

# ✅ Membership Tier ViewSet
class MembershipTierViewSet(viewsets.ModelViewSet):
    queryset = MembershipTier.objects.all()
    serializer_class = MembershipTierSerializer

# ✅ Special Events ViewSet
class SpecialEventViewSet(viewsets.ModelViewSet):
    queryset = SpecialEvent.objects.all()
    serializer_class = SpecialEventSerializer


# ✅ Authentication Views
@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "role": user.role})
    
    return Response({"error": "Invalid credentials"}, status=400)

@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    role = request.data.get("role", "visitor")  # Default to visitor

    if CustomUser.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)

    user = CustomUser.objects.create_user(username=username, password=password, role=role)
    return Response({"message": "User registered successfully!"})
@api_view(['GET'])
def available_zookeepers(request):
    available_zookeepers = Zookeeper.objects.annotate(assigned_count=models.Count('assigned_animals')).filter(assigned_count__lt=5)
    serializer = ZookeeperSerializer(available_zookeepers, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def auto_assign_zookeeper(request):
    available_zookeepers = Zookeeper.objects.annotate(task_count=Count('careroutine')).order_by('task_count')
    
    if not available_zookeepers.exists():
        return JsonResponse({"error": "No available zookeepers"}, status=400)

    # Get the least busy zookeeper
    assigned_zookeeper = available_zookeepers.first()
    
    # Create the care routine
    new_task = CareRoutine.objects.create(
        zookeeper=assigned_zookeeper,
        animal_id=request.data["animal"],
        task_type=request.data["task_type"],
        time=request.data["time"]
    )

    return JsonResponse({"message": f"{assigned_zookeeper.name} assigned successfully!"})
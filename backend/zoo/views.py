from rest_framework import viewsets
from .models import Animal, Habitat, Species, FeedingSchedule, Ticket
from .serializers import AnimalSerializer, HabitatSerializer, SpeciesSerializer, FeedingScheduleSerializer ,TicketSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsZookeeper
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import CustomUser
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer



class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer

class SpeciesViewSet(viewsets.ModelViewSet):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer

class FeedingScheduleViewSet(viewsets.ModelViewSet):
    queryset = FeedingSchedule.objects.all()
    serializer_class = FeedingScheduleSerializer



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


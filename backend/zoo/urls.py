from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnimalViewSet, HabitatViewSet, SpeciesViewSet,TicketViewSet ,FeedingScheduleViewSet

router = DefaultRouter()
router.register(r'animals', AnimalViewSet)
router.register(r'habitats', HabitatViewSet)
router.register(r'species', SpeciesViewSet)
router.register(r'feeding_schedules', FeedingScheduleViewSet)
router.register(r'tickets', TicketViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

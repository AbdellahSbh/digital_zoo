from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AnimalViewSet, HabitatViewSet, SpeciesViewSet, TicketViewSet, 
    FeedingScheduleViewSet, ZookeeperViewSet, CareRoutineViewSet,available_zookeepers,SpecialEventViewSet,MembershipTierViewSet, MembershipViewSet, EventBookingViewSet
)
from .models import Zookeeper, CareRoutine
from .serializers import ZookeeperSerializer, CareRoutineSerializer


router = DefaultRouter()
router.register(r'animals', AnimalViewSet)
router.register(r'habitats', HabitatViewSet)
router.register(r'species', SpeciesViewSet)
router.register(r'feeding_schedules', FeedingScheduleViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'zookeepers', ZookeeperViewSet)
router.register(r'care_routines', CareRoutineViewSet)
router.register(r'memberships', MembershipViewSet)
router.register(r'event_bookings', EventBookingViewSet)
router.register(r'special_events', SpecialEventViewSet)
router.register(r'membership_tiers', MembershipTierViewSet)  



urlpatterns = [
    path('api/', include(router.urls)),
    path('api/zookeepers/available/', available_zookeepers, name="available-zookeepers"),
]


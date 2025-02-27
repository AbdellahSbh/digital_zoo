from django.contrib import admin
from .models import Animal, Habitat, Species, FeedingSchedule

admin.site.register(Animal)
admin.site.register(Habitat)
admin.site.register(Species)
admin.site.register(FeedingSchedule)

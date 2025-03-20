from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Animal, Habitat, Species, FeedingSchedule, CustomUser, Zookeeper,MembershipTier,SpecialEvent,Membership,EventBooking


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('role', 'is_staff', 'is_active')
    search_fields = ('username', 'email')

    # Adding role field to the form for adding/editing users
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),  # Add the 'role' field
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role',)}),  # Add the 'role' field during user creation
    )

admin.site.register(Animal)
admin.site.register(Habitat)
admin.site.register(Species)
admin.site.register(FeedingSchedule)
admin.site.register(CustomUser,CustomUserAdmin)
admin.site.register(Zookeeper)  
admin.site.register(MembershipTier)
admin.site.register(SpecialEvent)
admin.site.register(Membership)
admin.site.register(EventBooking)

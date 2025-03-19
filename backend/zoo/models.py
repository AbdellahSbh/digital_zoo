from django.db import models
from django.contrib.auth.models import AbstractUser  
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Species(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Habitat(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Animal(models.Model):
    name = models.CharField(max_length=100)
    species = models.ForeignKey(Species, on_delete=models.CASCADE)
    habitat = models.ForeignKey(Habitat, on_delete=models.CASCADE)
    life_span = models.IntegerField()

    def __str__(self):
        return self.name

class FeedingSchedule(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)  
    time = models.TimeField()
    food = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.animal.name} - {self.time}"
    
class CustomUser(AbstractUser): 
    ROLE_CHOICES = [
        ('visitor', 'Visitor'),
        ('zookeeper', 'Zookeeper'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='visitor')

    class Meta:
        swappable = 'AUTH_USER_MODEL'  

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_set",  
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_set", 
        blank=True
    )


class Ticket(models.Model):
    visitor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    issue_date = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField()
    ticket_code = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"Ticket {self.ticket_code} for {self.visitor.username}"


class Zookeeper(models.Model):
    name = models.CharField(max_length=100)
    qualifications = models.TextField()
    assigned_animals = models.ManyToManyField('Animal', related_name='zookeepers', blank=True)

    def __str__(self):
        return self.name

class CareRoutine(models.Model):
    zookeeper = models.ForeignKey(Zookeeper, on_delete=models.CASCADE)
    animal = models.ForeignKey('Animal', on_delete=models.CASCADE)
    task_type = models.CharField(max_length=100, choices=[
        ('feeding', 'Feeding'),
        ('medical', 'Medical Checkup'),
        ('cleaning', 'Cleaning')
    ])
    time = models.TimeField()

    def __str__(self):
        return f"{self.zookeeper.name} - {self.task_type} for {self.animal.name}"
    



class MembershipTier(models.Model):
    TIER_CHOICES = [
        ('Standard', 'Standard'),
        ('Silver', 'Silver'),
        ('Gold', 'Gold'),
        ('Premium', 'Premium'),
        ('VIP', 'VIP'),
    ]
    
    name = models.CharField(max_length=50, choices=TIER_CHOICES, unique=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)  

    def __str__(self):
        return self.name


class Membership(models.Model):
    visitor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    tier = models.ForeignKey("MembershipTier", on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()

    def __str__(self):
        return f"{self.visitor.username} - {self.tier.name}"
    




class SpecialEvent(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=100)
    is_member_exclusive = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class EventBooking(models.Model):
    visitor = models.ForeignKey("CustomUser", on_delete=models.CASCADE)
    event = models.ForeignKey(SpecialEvent, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.visitor.username} - {self.event.name}"

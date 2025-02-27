from django.db import models
from django.contrib.auth.models import AbstractUser  
from django.db import models

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


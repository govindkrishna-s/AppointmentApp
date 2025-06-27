from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    phone = models.CharField(max_length=15)

class Appointment(models.Model):
    TIME_SLOT_CHOICES=[
        ('10:00-10:30', '10:00 AM - 10:30 AM'),
        ('10:30-11:00', '10:30 AM - 11:00 AM'),
        ('11:00-11:30', '11:00 AM - 11:30 AM'),
        ('11:30-12:00', '11:30 AM - 12:00 PM'),
        ('12:00-12:30', '12:00 PM - 12:30 PM'),
        ('12:30-13:00', '12:30 PM - 1:00 PM'),
                #Lunch Break
        ('14:00-14:30', '2:00 pM - 2:30 PM'),
        ('14:30-15:00', '2:30 PM - 3:00 PM'),
        ('15:00-15:30', '3:00 PM - 3:30 PM'),
        ('15:30-16:00', '3:30 PM - 4:00 PM'),
        ('16:00-16:30', '4:00 PM - 4:30 PM'),
        ('16:30-17:00', '4:30 PM - 5:00 PM'),
    ]

    name=models.CharField(max_length=15)
    phone_number=models.CharField(max_length=15)
    date=models.DateField()
    time_slot=models.CharField(max_length=15,choices=TIME_SLOT_CHOICES)
    created_at=models.DateTimeField(auto_now_add=True)
    customer=models.ForeignKey(User,on_delete=models.CASCADE,related_name='appointments')

    class Meta:
        unique_together=['date', 'time_slot']

    def __str__(self):
        return f"{self.name} - {self.date} - {self.get_time_slot_display()}"
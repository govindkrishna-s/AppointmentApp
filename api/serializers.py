from rest_framework import serializers
from api.models import User, Appointment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","email","phone","password"]

    def create(self,validated_data):
        return User.objects.create_user(**validated_data)

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        fields="__all__"
        read_only_fields=["id","customer","created_at"]
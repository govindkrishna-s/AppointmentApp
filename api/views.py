from django.shortcuts import render
from rest_framework.views import APIView
from api.serializers import UserSerializer, AppointmentSerializer
from rest_framework.response import Response
from rest_framework import status
from api.models import Appointment
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework import authentication, permissions
from api.permissions import IsOwner
from datetime import datetime
# Create your views here.

class SignUpView(APIView):
    def post(self,request,*args,**kwargs):
        serializer_instance=UserSerializer(data=request.data)
        if serializer_instance.is_valid():
            serializer_instance.save()
            return Response(data=serializer_instance.data,status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer_instance.errors,status=status.HTTP_400_BAD_REQUEST)
        
class AppointmentListCreateView(APIView):

    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    def get(self,request,*args,**kwargs):
        qs=Appointment.objects.filter(customer=request.user).order_by("-date")
        serializer_instance=AppointmentSerializer(qs,many=True)
        return Response(data=serializer_instance.data,status=status.HTTP_200_OK)
    
    def post(self,request,*args,**kwargs):
        serializer_instance=AppointmentSerializer(data=request.data)#deserialize
        if serializer_instance.is_valid():
            serializer_instance.save(customer=request.user)
            return Response(data=serializer_instance.data,status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer_instance.errors,status=status.HTTP_400_BAD_REQUEST)
        
class AppointmentRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class=AppointmentSerializer
    queryset=Appointment.objects.all()

    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[IsOwner]

class AvailableSlotView(APIView):
    def get(self,request,*args,**kwargs):
        date_str=request.query_params.get("date")
        date_obj=datetime.strptime(date_str,"%Y-%m-%d").date()
        all_slots=dict(Appointment.TIME_SLOT_CHOICES)
        booked_slots=Appointment.objects.filter(date=date_obj).values_list("time_slot",flat=True)
        free_slots=[
            {"slot_it":slot_id,"slot_display":slot_display}
            for slot_id,slot_display in all_slots.items()
            if slot_id not in booked_slots
        ]
        return Response(data=free_slots)
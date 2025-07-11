from django.urls import path
from api import views
from rest_framework.authtoken.views import ObtainAuthToken

urlpatterns=[
    path('register/',views.SignUpView.as_view()),
    path('token/',ObtainAuthToken.as_view()),
    path('appointments/',views.AppointmentListCreateView.as_view()),
    path('appointments/<int:pk>/',views.AppointmentRetrieveUpdateDestroyView.as_view()),
    path('appointments/slots/',views.AvailableSlotView.as_view())
]
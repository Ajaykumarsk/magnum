from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmailSenderConfigViewSet, EmailScheduleViewSet, EmailSendViewSet

router = DefaultRouter()
router.register(r'email-sender-config', EmailSenderConfigViewSet, basename='email-sender-config')
router.register(r'email-schedule', EmailScheduleViewSet, basename='email-schedule')
router.register(r'email-send', EmailSendViewSet, basename='email-send')

urlpatterns = [
    path('', include(router.urls)),
]
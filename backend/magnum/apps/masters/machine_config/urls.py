from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, LocationViewSet, MachineViewSet

router = DefaultRouter()
router.register(r'company', CompanyViewSet, basename='company')
router.register(r'location', LocationViewSet, basename='location')
router.register(r'machine', MachineViewSet, basename='machine')

urlpatterns = [
    path('', include(router.urls)),
]
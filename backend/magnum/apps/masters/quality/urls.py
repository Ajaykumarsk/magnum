from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QMSToolManagementViewSet, QMSConfigurationViewSet, QMSModelViewSet

router = DefaultRouter()
router.register(r'qms-tool', QMSToolManagementViewSet, basename='qms-tool')
router.register(r'qms-config', QMSConfigurationViewSet, basename='qms-config')
router.register(r'qms-model', QMSModelViewSet, basename='qms-model')

urlpatterns = [
    path('', include(router.urls)),
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, SupplierContactViewSet

router = DefaultRouter()
router.register(r'supplier', SupplierViewSet, basename='supplier')
router.register(r'supplier-contact', SupplierContactViewSet, basename='supplier-contact')

urlpatterns = [
    path('', include(router.urls)),
]
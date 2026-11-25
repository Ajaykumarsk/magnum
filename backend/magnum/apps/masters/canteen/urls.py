from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FoodOrderViewSet, FoodUtilizationViewSet, FoodRateViewSet

router = DefaultRouter()
router.register(r'food-order', FoodOrderViewSet, basename='food-order')
router.register(r'food-utilization', FoodUtilizationViewSet, basename='food-utilization')
router.register(r'food-rate', FoodRateViewSet, basename='food-rate')

urlpatterns = [
    path('', include(router.urls)),
]
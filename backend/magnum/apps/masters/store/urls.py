from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StoreLocationViewSet, RackViewSet, EngineerStoreViewSet

router = DefaultRouter()
router.register(r'store-location', StoreLocationViewSet, basename='store-location')
router.register(r'rack', RackViewSet, basename='rack')
router.register(r'engineer-store', EngineerStoreViewSet, basename='engineer-store')

urlpatterns = [
    path('', include(router.urls)),
]
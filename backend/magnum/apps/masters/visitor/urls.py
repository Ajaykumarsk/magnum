from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AreaViewSet, IDProofViewSet, VisitorIDViewSet

router = DefaultRouter()
router.register(r'area', AreaViewSet, basename='area')
router.register(r'id-proof', IDProofViewSet, basename='id-proof')
router.register(r'visitor-id', VisitorIDViewSet, basename='visitor-id')

urlpatterns = [
    path('', include(router.urls)),
]
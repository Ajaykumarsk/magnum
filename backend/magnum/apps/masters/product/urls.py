from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductGradeViewSet, ProductCategoryViewSet, BOMViewSet, RawMaterialViewSet

router = DefaultRouter()
router.register(r'product-grade', ProductGradeViewSet, basename='product-grade')
router.register(r'product-category', ProductCategoryViewSet, basename='product-category')
router.register(r'bom', BOMViewSet, basename='bom')
router.register(r'raw-material', RawMaterialViewSet, basename='raw-material')

urlpatterns = [
    path('', include(router.urls)),
]
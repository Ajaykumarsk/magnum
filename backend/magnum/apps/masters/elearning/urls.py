from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ELearningProductViewSet, MultimediaViewSet, DocumentTypeViewSet, TestMasterViewSet

router = DefaultRouter()
router.register(r'elearning-product', ELearningProductViewSet, basename='elearning-product')
router.register(r'multimedia', MultimediaViewSet, basename='multimedia')
router.register(r'document-type', DocumentTypeViewSet, basename='document-type')
router.register(r'test', TestMasterViewSet, basename='test')

urlpatterns = [
    path('', include(router.urls)),
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CRMCompanyViewSet, BankViewSet, CustomerViewSet, PaymentTermsViewSet, BillingTypeViewSet

router = DefaultRouter()
router.register(r'crm-company', CRMCompanyViewSet, basename='crm-company')
router.register(r'bank', BankViewSet, basename='bank')
router.register(r'customer', CustomerViewSet, basename='customer')
router.register(r'payment-terms', PaymentTermsViewSet, basename='payment-terms')
router.register(r'billing-type', BillingTypeViewSet, basename='billing-type')

urlpatterns = [
    path('', include(router.urls)),
]
from django.contrib import admin
from .models import CRMCompany, Bank, Customer, PaymentTerms, BillingType


@admin.register(CRMCompany)
class CRMCompanyAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'contact_person', 'phone', 'industry', 'is_active']
    list_filter = ['is_active', 'industry']
    search_fields = ['code', 'name']


@admin.register(Bank)
class BankAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'branch', 'ifsc_code', 'account_type']
    list_filter = ['account_type']
    search_fields = ['code', 'name', 'ifsc_code']


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'company', 'phone', 'credit_limit', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name']


@admin.register(PaymentTerms)
class PaymentTermsAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'days']
    search_fields = ['code', 'name']


@admin.register(BillingType)
class BillingTypeAdmin(admin.ModelAdmin):
    list_display = ['code', 'name']
    search_fields = ['code', 'name']
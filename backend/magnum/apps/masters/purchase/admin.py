from django.contrib import admin
from .models import Supplier, SupplierContact


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'contact_person', 'phone', 'rating', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name']


@admin.register(SupplierContact)
class SupplierContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'supplier', 'designation', 'phone', 'is_primary']
    list_filter = ['is_primary']
    search_fields = ['name', 'supplier__name']
from django.contrib import admin
from .models import StoreLocation, Rack, EngineerStore


@admin.register(StoreLocation)
class StoreLocationAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'warehouse_type', 'is_active']
    list_filter = ['warehouse_type', 'is_active']
    search_fields = ['code', 'name']


@admin.register(Rack)
class RackAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'store_location', 'row_number', 'level', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name']


@admin.register(EngineerStore)
class EngineerStoreAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name']
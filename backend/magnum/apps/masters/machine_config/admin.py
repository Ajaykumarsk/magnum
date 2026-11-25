from django.contrib import admin
from .models import Company, Location, Machine


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'phone', 'gst_number', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name']


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'company', 'city', 'state', 'is_active']
    list_filter = ['is_active', 'state']
    search_fields = ['code', 'name', 'city']


@admin.register(Machine)
class MachineAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'machine_type', 'location', 'is_active']
    list_filter = ['machine_type', 'is_active']
    search_fields = ['code', 'name']
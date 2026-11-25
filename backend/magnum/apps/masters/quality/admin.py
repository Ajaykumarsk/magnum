from django.contrib import admin
from .models import QMSToolManagement, QMSConfiguration, QMSModel


@admin.register(QMSToolManagement)
class QMSToolManagementAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'tool_type', 'next_calibration_date', 'is_active']
    list_filter = ['is_active', 'tool_type']
    search_fields = ['code', 'name']


@admin.register(QMSConfiguration)
class QMSConfigurationAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'parameter', 'value']
    search_fields = ['code', 'name', 'parameter']


@admin.register(QMSModel)
class QMSModelAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'standard', 'version', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name', 'standard']
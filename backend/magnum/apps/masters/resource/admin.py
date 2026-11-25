from django.contrib import admin
from .models import (
    Department, Designation, SkillMatrix, Division, EmployeeType,
    Shift, Holiday, WeeklyOff, Agency, Device, ComplianceChecklist
)


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(Designation)
class DesignationAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(SkillMatrix)
class SkillMatrixAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(Division)
class DivisionAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(EmployeeType)
class EmployeeTypeAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(Shift)
class ShiftAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'is_active', 'start_time', 'end_time', 'duration_minutes']
    list_filter = ['is_active']
    search_fields = ['code', 'name']


@admin.register(Holiday)
class HolidayAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'holiday_type', 'holiday_date']
    list_filter = ['holiday_type']
    search_fields = ['code', 'name']


@admin.register(WeeklyOff)
class WeeklyOffAdmin(admin.ModelAdmin):
    list_display = ['weekly_off_name', 'day']
    list_filter = ['day']


@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'plant_location', 'is_agreement_expired', 'valid_to']
    list_filter = ['is_agreement_expired']
    search_fields = ['code', 'name']


@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'device_type', 'breakdown']
    list_filter = ['device_type', 'breakdown']
    search_fields = ['code', 'name']


@admin.register(ComplianceChecklist)
class ComplianceChecklistAdmin(admin.ModelAdmin):
    list_display = ['checklist_id', 'document_name', 'document_type', 'status', 'expiry_date']
    list_filter = ['status', 'document_type']
    search_fields = ['checklist_id', 'document_name']
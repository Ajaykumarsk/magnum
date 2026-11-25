from rest_framework import serializers
from .models import (
    Department, Designation, SkillMatrix, Division, EmployeeType,
    Shift, Holiday, WeeklyOff, Agency, Device, ComplianceChecklist
)


# --- Simple Masters ---

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'code', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = ['id', 'code', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class SkillMatrixSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillMatrix
        fields = ['id', 'code', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = ['id', 'code', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class EmployeeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeType
        fields = ['id', 'code', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


# --- Complex Masters ---

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = [
            'id', 'code', 'name', 'is_active',
            'start_time', 'end_time', 'start_minutes', 'end_minutes', 'duration_minutes',
            'late_entry_grace', 'early_exit_grace',
            'punch_in_cutoff_before_start', 'punch_in_cutoff_after_start',
            'overtime_threshold', 'overtime_rate_multiplier',
            'lunch_out_minutes', 'lunch_in_minutes',
            'auto_calculate_shift',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = ['id', 'code', 'name', 'holiday_type', 'holiday_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class WeeklyOffSerializer(serializers.ModelSerializer):
    Weekly_off = serializers.CharField(source='weekly_off_name')

    class Meta:
        model = WeeklyOff
        fields = ['id', 'Weekly_off', 'day', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = [
            'id', 'code', 'name', 'address', 'plant_location',
            'epfo_number', 'esic_registration',
            'lease_validity', 'valid_from', 'valid_to', 'is_agreement_expired',
            'contractor_agency_count', 'notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = [
            'id', 'code', 'name', 'controller_id', 'device_id',
            'device_type', 'breakdown',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ComplianceChecklistSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    location_name = serializers.CharField(source='location.name', read_only=True)

    class Meta:
        model = ComplianceChecklist
        fields = [
            'id', 'checklist_id', 'company', 'company_name', 'location', 'location_name',
            'document_type', 'document_name', 'issuing_authority', 'license_number',
            'issue_date', 'expiry_date', 'renewal_date', 'status',
            'document_file', 'remarks', 'history_log',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'checklist_id', 'company_name', 'location_name', 'created_at', 'updated_at']
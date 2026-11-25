from rest_framework import serializers
from .models import Company, Location, Machine


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'code', 'name', 'address', 'phone', 'email',
                  'gst_number', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class LocationSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True, default='')

    class Meta:
        model = Location
        fields = ['id', 'code', 'name', 'company', 'company_name', 'address',
                  'city', 'state', 'pincode', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'company_name', 'created_at', 'updated_at']


class MachineSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField(source='location.name', read_only=True, default='')

    class Meta:
        model = Machine
        fields = ['id', 'code', 'name', 'machine_type', 'location', 'location_name',
                  'manufacturer', 'model_number', 'serial_number',
                  'purchase_date', 'warranty_expiry', 'is_active',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'location_name', 'created_at', 'updated_at']
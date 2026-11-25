from rest_framework import serializers
from .models import StoreLocation, Rack, EngineerStore


class StoreLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreLocation
        fields = ['id', 'code', 'name', 'warehouse_type', 'capacity', 'is_active',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class RackSerializer(serializers.ModelSerializer):
    store_location_name = serializers.CharField(source='store_location.name', read_only=True, default='')

    class Meta:
        model = Rack
        fields = ['id', 'code', 'name', 'store_location', 'store_location_name',
                  'row_number', 'level', 'max_weight_kg', 'is_active',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'store_location_name', 'created_at', 'updated_at']


class EngineerStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineerStore
        fields = ['id', 'code', 'name', 'description', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
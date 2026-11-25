from rest_framework import serializers
from .models import Supplier, SupplierContact


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'code', 'name', 'contact_person', 'phone', 'email',
                  'address', 'gst_number', 'pan_number', 'payment_terms_days',
                  'rating', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class SupplierContactSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)

    class Meta:
        model = SupplierContact
        fields = ['id', 'supplier', 'supplier_name', 'name', 'designation',
                  'phone', 'email', 'is_primary', 'created_at', 'updated_at']
        read_only_fields = ['id', 'supplier_name', 'created_at', 'updated_at']
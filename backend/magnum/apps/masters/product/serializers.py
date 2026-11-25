from rest_framework import serializers
from .models import ProductGrade, ProductCategory, BOM, RawMaterial


class ProductGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGrade
        fields = ['id', 'code', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ProductCategorySerializer(serializers.ModelSerializer):
    parent_name = serializers.CharField(source='parent.name', read_only=True, default='')

    class Meta:
        model = ProductCategory
        fields = ['id', 'code', 'name', 'parent', 'parent_name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'parent_name', 'created_at', 'updated_at']


class BOMSerializer(serializers.ModelSerializer):
    class Meta:
        model = BOM
        fields = ['id', 'code', 'name', 'product_name', 'version', 'is_active',
                  'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class RawMaterialSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True, default='')

    class Meta:
        model = RawMaterial
        fields = ['id', 'code', 'name', 'category', 'category_name', 'unit',
                  'hsn_code', 'gst_percentage', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'category_name', 'created_at', 'updated_at']
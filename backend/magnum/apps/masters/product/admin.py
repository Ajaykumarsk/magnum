from django.contrib import admin
from .models import ProductGrade, ProductCategory, BOM, RawMaterial


@admin.register(ProductGrade)
class ProductGradeAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'parent', 'created_at']
    search_fields = ['code', 'name']


@admin.register(BOM)
class BOMAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'product_name', 'version', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name', 'product_name']


@admin.register(RawMaterial)
class RawMaterialAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'category', 'unit', 'hsn_code', 'is_active']
    list_filter = ['unit', 'is_active']
    search_fields = ['code', 'name', 'hsn_code']
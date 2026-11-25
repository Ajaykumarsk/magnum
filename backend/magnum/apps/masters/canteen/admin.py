from django.contrib import admin
from .models import FoodOrder, FoodUtilization, FoodRate


@admin.register(FoodOrder)
class FoodOrderAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(FoodUtilization)
class FoodUtilizationAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(FoodRate)
class FoodRateAdmin(admin.ModelAdmin):
    list_display = ['food_item', 'meal_type', 'rate', 'is_active', 'effective_from']
    list_filter = ['meal_type', 'is_active']
    search_fields = ['food_item']
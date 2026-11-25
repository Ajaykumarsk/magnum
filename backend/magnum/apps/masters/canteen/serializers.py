from rest_framework import serializers
from .models import FoodOrder, FoodUtilization, FoodRate


class FoodOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodOrder
        fields = ['id', 'code', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class FoodUtilizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodUtilization
        fields = ['id', 'code', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class FoodRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodRate
        fields = ['id', 'food_item', 'meal_type', 'rate', 'is_active',
                  'effective_from', 'effective_to', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
from rest_framework import serializers
from .models import Breakdown


class BreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breakdown
        fields = ['id', 'code', 'name', 'severity', 'description',
                  'estimated_downtime_minutes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
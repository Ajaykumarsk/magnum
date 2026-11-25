from rest_framework import serializers
from .models import QMSToolManagement, QMSConfiguration, QMSModel


class QMSToolManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = QMSToolManagement
        fields = ['id', 'code', 'name', 'tool_type', 'calibration_frequency_days',
                  'last_calibration_date', 'next_calibration_date', 'is_active',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class QMSConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = QMSConfiguration
        fields = ['id', 'code', 'name', 'parameter', 'value', 'description',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class QMSModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = QMSModel
        fields = ['id', 'code', 'name', 'standard', 'version', 'description',
                  'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
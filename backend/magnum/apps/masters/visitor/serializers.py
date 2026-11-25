from rest_framework import serializers
from .models import Area, IDProof, VisitorID


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'code', 'name', 'description', 'is_restricted', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class IDProofSerializer(serializers.ModelSerializer):
    class Meta:
        model = IDProof
        fields = ['id', 'code', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class VisitorIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorID
        fields = ['id', 'code', 'name', 'card_type', 'validity_hours', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
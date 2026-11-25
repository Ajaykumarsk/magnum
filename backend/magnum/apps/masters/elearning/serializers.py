from rest_framework import serializers
from .models import ELearningProduct, Multimedia, DocumentType, TestMaster


class ELearningProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ELearningProduct
        fields = ['id', 'code', 'name', 'course_type', 'duration_hours',
                  'description', 'is_mandatory', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class MultimediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Multimedia
        fields = ['id', 'code', 'name', 'media_type', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = ['id', 'code', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class TestMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestMaster
        fields = ['id', 'code', 'name', 'total_questions', 'passing_percentage',
                  'duration_minutes', 'max_attempts', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
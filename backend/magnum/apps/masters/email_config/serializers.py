from rest_framework import serializers
from .models import EmailSenderConfig, EmailSchedule, EmailSend


class EmailSenderConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSenderConfig
        fields = ['id', 'code', 'name', 'smtp_host', 'smtp_port', 'sender_email',
                  'use_tls', 'use_ssl', 'username', 'is_active',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class EmailScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSchedule
        fields = ['id', 'code', 'name', 'subject_template', 'body_template',
                  'frequency', 'recipients', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class EmailSendSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSend
        fields = ['id', 'code', 'name', 'description', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
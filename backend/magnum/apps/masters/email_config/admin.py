from django.contrib import admin
from .models import EmailSenderConfig, EmailSchedule, EmailSend


@admin.register(EmailSenderConfig)
class EmailSenderConfigAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'smtp_host', 'smtp_port', 'sender_email', 'is_active']
    list_filter = ['is_active', 'use_tls']
    search_fields = ['code', 'name', 'sender_email']


@admin.register(EmailSchedule)
class EmailScheduleAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'frequency', 'is_active']
    list_filter = ['frequency', 'is_active']
    search_fields = ['code', 'name']


@admin.register(EmailSend)
class EmailSendAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name']
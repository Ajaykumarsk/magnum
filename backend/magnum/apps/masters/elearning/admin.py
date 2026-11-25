from django.contrib import admin
from .models import ELearningProduct, Multimedia, DocumentType, TestMaster


@admin.register(ELearningProduct)
class ELearningProductAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'course_type', 'duration_hours', 'is_mandatory', 'is_active']
    list_filter = ['course_type', 'is_mandatory', 'is_active']
    search_fields = ['code', 'name']


@admin.register(Multimedia)
class MultimediaAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'media_type']
    list_filter = ['media_type']
    search_fields = ['code', 'name']


@admin.register(DocumentType)
class DocumentTypeAdmin(admin.ModelAdmin):
    list_display = ['code', 'name']
    search_fields = ['code', 'name']


@admin.register(TestMaster)
class TestMasterAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'total_questions', 'passing_percentage', 'duration_minutes', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name']
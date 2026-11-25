from django.contrib import admin
from .models import Area, IDProof, VisitorID


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'is_restricted', 'created_at']
    list_filter = ['is_restricted']
    search_fields = ['code', 'name']


@admin.register(IDProof)
class IDProofAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at']
    search_fields = ['code', 'name']


@admin.register(VisitorID)
class VisitorIDAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'card_type', 'validity_hours', 'created_at']
    list_filter = ['card_type']
    search_fields = ['code', 'name']
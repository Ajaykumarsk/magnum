from django.contrib import admin
from .models import Breakdown


@admin.register(Breakdown)
class BreakdownAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'severity', 'estimated_downtime_minutes']
    list_filter = ['severity']
    search_fields = ['code', 'name']
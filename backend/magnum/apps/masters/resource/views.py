import csv
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .signals import broadcast_event
from .models import (
    Department, Designation, SkillMatrix, Division, EmployeeType,
    Shift, Holiday, WeeklyOff, Agency, Device, ComplianceChecklist
)
from .serializers import (
    DepartmentSerializer, DesignationSerializer, SkillMatrixSerializer,
    DivisionSerializer, EmployeeTypeSerializer,
    ShiftSerializer, HolidaySerializer, WeeklyOffSerializer,
    AgencySerializer, DeviceSerializer, ComplianceChecklistSerializer
)


class DynamicBaseMasterViewSet(viewsets.ModelViewSet):
    """Base viewset with CSV export, bulk delete, and WebSocket broadcasts."""
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='export-csv')
    def export_csv(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)

        if not serializer.data:
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="export.csv"'
            return response

        model_name = self.queryset.model.__name__.lower()
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{model_name}_export.csv"'

        headers = list(serializer.data[0].keys())
        writer = csv.DictWriter(response, fieldnames=headers)
        writer.writeheader()
        for row in serializer.data:
            writer.writerow(row)

        return response

    @action(detail=False, methods=['post'], url_path='bulk-delete')
    def bulk_delete(self, request):
        ids = request.data.get('ids', [])
        if not ids:
            return Response({'error': 'No IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        model_name = self.queryset.model.__name__.lower()
        deleted_count, _ = self.get_queryset().filter(id__in=ids).delete()

        # Emit WebSocket event for bulk delete
        broadcast_event({
            'model': model_name,
            'action': 'bulk_deleted',
            'ids': ids,
            'count': deleted_count
        })

        return Response({'deleted': deleted_count}, status=status.HTTP_200_OK)


# --- Simple Master ViewSets ---

class DepartmentViewSet(DynamicBaseMasterViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class DesignationViewSet(DynamicBaseMasterViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer


class SkillMatrixViewSet(DynamicBaseMasterViewSet):
    queryset = SkillMatrix.objects.all()
    serializer_class = SkillMatrixSerializer


class DivisionViewSet(DynamicBaseMasterViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer


class EmployeeTypeViewSet(DynamicBaseMasterViewSet):
    queryset = EmployeeType.objects.all()
    serializer_class = EmployeeTypeSerializer


# --- Complex Master ViewSets ---

class ShiftViewSet(DynamicBaseMasterViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer


class HolidayViewSet(DynamicBaseMasterViewSet):
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer


class WeeklyOffViewSet(DynamicBaseMasterViewSet):
    queryset = WeeklyOff.objects.all()
    serializer_class = WeeklyOffSerializer


class AgencyViewSet(DynamicBaseMasterViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer


class DeviceViewSet(DynamicBaseMasterViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


class ComplianceChecklistViewSet(DynamicBaseMasterViewSet):
    queryset = ComplianceChecklist.objects.select_related('company', 'location').all()
    serializer_class = ComplianceChecklistSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    @action(detail=False, methods=['get'], url_path='dashboard-stats')
    def dashboard_stats(self, request):
        from django.utils import timezone
        from datetime import timedelta

        qs = self.get_queryset()
        today = timezone.now().date()
        thirty_days = today + timedelta(days=30)

        stats = {
            'total': qs.count(),
            'active': qs.filter(status='active').count(),
            'expiring_soon': qs.filter(status='expiring_soon').count() + qs.filter(
                expiry_date__lte=thirty_days, expiry_date__gt=today, status='active'
            ).count(),
            'expired': qs.filter(status='expired').count() + qs.filter(
                expiry_date__lt=today
            ).exclude(status='expired').count(),
            'pending_renewal': qs.filter(status='pending_renewal').count(),
            'draft': qs.filter(status='draft').count(),
        }
        return Response(stats)

    @action(detail=True, methods=['post'], url_path='renew')
    def renew(self, request, pk=None):
        instance = self.get_object()
        new_expiry = request.data.get('new_expiry_date')
        new_file = request.FILES.get('document_file')

        if not new_expiry:
            return Response({'error': 'new_expiry_date is required'}, status=status.HTTP_400_BAD_REQUEST)

        from django.utils import timezone
        log_entry = {
            'action': 'renewed',
            'old_expiry': str(instance.expiry_date) if instance.expiry_date else None,
            'new_expiry': new_expiry,
            'renewed_at': str(timezone.now()),
            'renewed_by': request.user.username,
        }

        if not isinstance(instance.history_log, list):
            instance.history_log = []
        instance.history_log.append(log_entry)

        instance.renewal_date = instance.expiry_date
        instance.expiry_date = new_expiry
        instance.status = 'active'

        if new_file:
            instance.document_file = new_file

        instance.save()  # Triggers post_save signal

        # Emit explicit renew action for compliance dashboards
        broadcast_event({
            'model': 'compliancechecklist',
            'action': 'renewed',
            'id': instance.id,
            'checklist_id': instance.checklist_id,
            'new_expiry': str(instance.expiry_date),
            'renewed_by': request.user.username,
        })

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='document-types')
    def document_types(self, request):
        return Response([
            {'value': k, 'label': v} for k, v in ComplianceChecklist.DOCUMENT_TYPES
        ])

    @action(detail=False, methods=['get'], url_path='status-choices')
    def status_choices(self, request):
        return Response([
            {'value': k, 'label': v} for k, v in ComplianceChecklist.STATUS_CHOICES
        ])
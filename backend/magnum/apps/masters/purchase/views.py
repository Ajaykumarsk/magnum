import csv
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Supplier, SupplierContact
from .serializers import SupplierSerializer, SupplierContactSerializer


class DynamicBaseMasterViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='export-csv')
    def export_csv(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        if not serializer.data:
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="export.csv"'
            return response
        response = HttpResponse(content_type='text/csv')
        model_name = self.queryset.model.__name__.lower()
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
        deleted_count, _ = self.get_queryset().filter(id__in=ids).delete()
        return Response({'deleted': deleted_count}, status=status.HTTP_200_OK)


class SupplierViewSet(DynamicBaseMasterViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer


class SupplierContactViewSet(DynamicBaseMasterViewSet):
    queryset = SupplierContact.objects.select_related('supplier').all()
    serializer_class = SupplierContactSerializer
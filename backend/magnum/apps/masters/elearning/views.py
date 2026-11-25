import csv
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import ELearningProduct, Multimedia, DocumentType, TestMaster
from .serializers import (
    ELearningProductSerializer, MultimediaSerializer,
    DocumentTypeSerializer, TestMasterSerializer
)


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


class ELearningProductViewSet(DynamicBaseMasterViewSet):
    queryset = ELearningProduct.objects.all()
    serializer_class = ELearningProductSerializer


class MultimediaViewSet(DynamicBaseMasterViewSet):
    queryset = Multimedia.objects.all()
    serializer_class = MultimediaSerializer


class DocumentTypeViewSet(DynamicBaseMasterViewSet):
    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer


class TestMasterViewSet(DynamicBaseMasterViewSet):
    queryset = TestMaster.objects.all()
    serializer_class = TestMasterSerializer
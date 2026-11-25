"""Views for notifications REST API."""

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from .models import Notification
from .serializers import NotificationSerializer
from apps.core.utils import success_response


class NotificationListView(generics.ListAPIView):
    """
    GET /api/v1/notifications/
    List all notifications for the current user.
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_read', 'notification_type']

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


class NotificationMarkReadView(APIView):
    """
    POST /api/v1/notifications/<id>/read/
    Mark a specific notification as read.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk, user=request.user)
            notification.mark_as_read()
            return success_response(message='Notification marked as read.')
        except Notification.DoesNotExist:
            return success_response(
                message='Notification not found.',
                status_code=status.HTTP_404_NOT_FOUND
            )


class NotificationMarkAllReadView(APIView):
    """
    POST /api/v1/notifications/read-all/
    Mark all notifications as read.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from django.utils import timezone
        count = Notification.objects.filter(
            user=request.user, is_read=False
        ).update(is_read=True, read_at=timezone.now())

        return success_response(
            message=f'{count} notifications marked as read.'
        )


class UnreadCountView(APIView):
    """
    GET /api/v1/notifications/unread-count/
    Get the count of unread notifications.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = Notification.objects.filter(
            user=request.user, is_read=False
        ).count()
        return success_response(data={'unread_count': count})
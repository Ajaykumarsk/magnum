"""Signals for notifications app."""

from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Notification
from .serializers import NotificationSerializer
import logging

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Notification)
def send_notification_via_websocket(sender, instance, created, **kwargs):
    """Send notification via WebSocket when a new one is created."""
    if created:
        channel_layer = get_channel_layer()
        user_group_name = f"user_{instance.user.id}"

        notification_data = NotificationSerializer(instance).data
        # Convert UUID to string for JSON serialization
        notification_data['id'] = str(notification_data['id'])

        try:
            async_to_sync(channel_layer.group_send)(
                user_group_name,
                {
                    'type': 'send_notification',
                    'notification': notification_data,
                }
            )
            logger.info(f"WebSocket notification sent to {user_group_name}")
        except Exception as e:
            logger.error(f"Failed to send WebSocket notification: {e}")
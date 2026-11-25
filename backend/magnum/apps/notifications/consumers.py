"""WebSocket consumers for real-time notifications and master data events."""

import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser

logger = logging.getLogger(__name__)


class NotificationConsumer(AsyncWebsocketConsumer):
    """
    WebSocket consumer for user-specific notifications and real-time master broadcasts.

    Connect: ws://localhost:8000/ws/notifications/?token=<jwt_token>
    """

    async def connect(self):
        self.user = self.scope.get("user", AnonymousUser())

        if isinstance(self.user, AnonymousUser) or not self.user.is_authenticated:
            logger.warning("WebSocket connection rejected: unauthenticated")
            await self.close(code=4001)
            return

        self.user_group_name = f"user_{self.user.id}"

        # Join personal user group and global broadcast group
        await self.channel_layer.group_add(self.user_group_name, self.channel_name)
        await self.channel_layer.group_add("broadcast", self.channel_name)

        await self.accept()

        unread_count = await self.get_unread_count()
        await self.send(text_data=json.dumps({
            'type': 'connection_established',
            'message': 'Connected to notification service',
            'unread_count': unread_count,
        }))

        logger.info(f"WebSocket connected: user {self.user.email}")

    async def disconnect(self, close_code):
        if hasattr(self, 'user_group_name'):
            await self.channel_layer.group_discard(self.user_group_name, self.channel_name)
            await self.channel_layer.group_discard("broadcast", self.channel_name)
        logger.info(f"WebSocket disconnected: code {close_code}")

    async def receive(self, text_data):
        """Handle incoming WebSocket messages from the client."""
        try:
            data = json.loads(text_data)
            message_type = data.get('type', '')

            if message_type == 'mark_read':
                notification_id = data.get('notification_id')
                if notification_id:
                    await self.mark_notification_read(notification_id)
                    unread_count = await self.get_unread_count()
                    await self.send(text_data=json.dumps({
                        'type': 'notification_read',
                        'notification_id': notification_id,
                        'unread_count': unread_count,
                    }))

            elif message_type == 'mark_all_read':
                await self.mark_all_read()
                await self.send(text_data=json.dumps({
                    'type': 'all_notifications_read',
                    'unread_count': 0,
                }))

            elif message_type == 'ping':
                await self.send(text_data=json.dumps({'type': 'pong'}))

        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid JSON format',
            }))

    # Group message handlers
    async def send_notification(self, event):
        """Dispatches user-targeted notifications."""
        await self.send(text_data=json.dumps({
            'type': 'new_notification',
            'notification': event['notification'],
        }))

    async def send_broadcast(self, event):
        """Dispatches generic broadcast messages."""
        await self.send(text_data=json.dumps({
            'type': 'broadcast',
            'message': event['message'],
        }))

    async def master_event(self, event):
        """Dispatches real-time master table events (create, update, delete, bulk_delete)."""
        await self.send(text_data=json.dumps({
            'type': 'master_update',
            **event['payload'],
        }))

    # Database operations
    @database_sync_to_async
    def get_unread_count(self):
        from .models import Notification
        return Notification.objects.filter(user=self.user, is_read=False).count()

    @database_sync_to_async
    def mark_notification_read(self, notification_id):
        from .models import Notification
        try:
            notification = Notification.objects.get(id=notification_id, user=self.user)
            notification.mark_as_read()
        except Notification.DoesNotExist:
            pass

    @database_sync_to_async
    def mark_all_read(self):
        from .models import Notification
        from django.utils import timezone
        Notification.objects.filter(user=self.user, is_read=False).update(
            is_read=True, read_at=timezone.now()
        )
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.contrib.auth.models import AnonymousUser


class MasterEventsConsumer(AsyncJsonWebsocketConsumer):
    """
    Dedicated WebSocket consumer for clients specifically subscribing to master tables.

    Connect: ws://localhost:8000/ws/masters/all/?token=<jwt_token>
    Or:      ws://localhost:8000/ws/masters/device/?token=<jwt_token>
    """

    async def connect(self):
        self.user = self.scope.get("user", AnonymousUser())

        if isinstance(self.user, AnonymousUser) or not self.user.is_authenticated:
            await self.close(code=4001)
            return

        self.stream_name = self.scope['url_route']['kwargs'].get('stream_name', 'all').lower()
        self.room_group_name = f"master_stream_{self.stream_name}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        await self.send_json({
            "type": "connection_established",
            "stream": self.stream_name,
            "user": self.user.email if hasattr(self.user, 'email') else self.user.username,
        })

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive_json(self, content):
        if content.get('action') == 'ping':
            await self.send_json({'type': 'pong'})

    async def master_event(self, event):
        """Forward broadcasted event to the connected WebSocket."""
        await self.send_json({
            'type': 'master_update',
            **event['payload'],
        })
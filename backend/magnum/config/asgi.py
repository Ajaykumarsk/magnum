"""
ASGI config for Magnum project.
Supports HTTP and WebSocket protocols.
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from apps.notifications.routing import websocket_urlpatterns as notification_ws_urls
from apps.masters.resource.routing import websocket_urlpatterns as master_ws_urls
from apps.notifications.middleware import JWTAuthMiddleware

combined_websocket_urlpatterns = notification_ws_urls + master_ws_urls

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        JWTAuthMiddleware(
            URLRouter(combined_websocket_urlpatterns)
        )
    ),
})
"""WebSocket authentication middleware using JWT."""

from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from urllib.parse import parse_qs
import logging

logger = logging.getLogger(__name__)
User = get_user_model()


@database_sync_to_async
def get_user(token_key):
    """Validate JWT token and return the user."""
    try:
        access_token = AccessToken(token_key)
        user_id = access_token['user_id']
        user = User.objects.get(id=user_id)
        return user
    except (InvalidToken, TokenError, User.DoesNotExist, KeyError) as e:
        logger.warning(f"WebSocket auth failed: {e}")
        return AnonymousUser()


class JWTAuthMiddleware(BaseMiddleware):
    """
    JWT auth middleware for Django Channels.

    Client connects with:
    ws://localhost:8000/ws/notifications/?token=<jwt_access_token>
    """

    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope.get("query_string", b"").decode())
        token_list = query_string.get("token", [])

        if token_list:
            scope["user"] = await get_user(token_list[0])
        else:
            scope["user"] = AnonymousUser()

        return await super().__call__(scope, receive, send)
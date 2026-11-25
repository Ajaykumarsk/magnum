"""Development settings."""

from .base import *

DEBUG = True

INSTALLED_APPS += [
    'django_extensions',
    'debug_toolbar',
]

MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')

INTERNAL_IPS = ['127.0.0.1', '192.168.29.63', 'localhost']

# Browsable API in development
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# Use In-Memory Channel Layer for local development (no Redis version issues)
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}
print("✅ Development settings loaded")
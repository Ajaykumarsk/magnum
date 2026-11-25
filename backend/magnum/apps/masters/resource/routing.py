from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'^ws/masters/(?P<stream_name>[\w-]+)/$', consumers.MasterEventsConsumer.as_asgi()),
]
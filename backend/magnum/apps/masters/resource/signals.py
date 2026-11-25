import logging
from django.db import transaction
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .models import (
    Department, Designation, SkillMatrix, Division, EmployeeType,
    Shift, Holiday, WeeklyOff, Agency, Device, ComplianceChecklist
)

logger = logging.getLogger(__name__)
channel_layer = get_channel_layer()

TRACKED_MODELS = [
    Department, Designation, SkillMatrix, Division, EmployeeType,
    Shift, Holiday, WeeklyOff, Agency, Device, ComplianceChecklist
]


def broadcast_event(payload: dict):
    """
    Sends event to the global 'broadcast' channel group and model-specific channel groups.
    """
    if not channel_layer:
        return

    model_name = payload.get('model', 'master')

    # 1. Send to existing notifications broadcast group
    async_to_sync(channel_layer.group_send)(
        "broadcast",
        {
            "type": "master_event",
            "payload": payload
        }
    )

    # 2. Send to dedicated model stream (e.g., master_stream_department)
    async_to_sync(channel_layer.group_send)(
        f"master_stream_{model_name}",
        {
            "type": "master_event",
            "payload": payload
        }
    )

    # 3. Send to aggregate master stream
    async_to_sync(channel_layer.group_send)(
        "master_stream_all",
        {
            "type": "master_event",
            "payload": payload
        }
    )

    logger.info(f"WebSocket broadcast sent for {model_name} #{payload.get('id', '')}: {payload.get('action')}")


@receiver(post_save)
def master_post_save_handler(sender, instance, created, **kwargs):
    if sender not in TRACKED_MODELS:
        return

    model_name = sender.__name__.lower()
    action = 'created' if created else 'updated'

    payload = {
        'model': model_name,
        'action': action,
        'id': instance.id,
        'data': {
            'id': instance.id,
            'name': getattr(instance, 'name', getattr(instance, 'weekly_off_name', str(instance))),
            'code': getattr(instance, 'code', getattr(instance, 'checklist_id', None)),
        }
    }

    # Model-specific fields
    if sender is Device:
        payload['data']['breakdown'] = instance.breakdown
        payload['data']['device_type'] = instance.device_type
    elif sender is ComplianceChecklist:
        payload['data']['status'] = instance.status
        payload['data']['expiry_date'] = str(instance.expiry_date) if instance.expiry_date else None
    elif sender is Shift:
        payload['data']['is_active'] = instance.is_active
        payload['data']['start_time'] = str(instance.start_time) if instance.start_time else None
        payload['data']['end_time'] = str(instance.end_time) if instance.end_time else None
    elif sender is Holiday:
        payload['data']['holiday_date'] = str(instance.holiday_date) if instance.holiday_date else None
        payload['data']['holiday_type'] = instance.holiday_type

    # Trigger only after database transaction commits
    transaction.on_commit(lambda: broadcast_event(payload))


@receiver(post_delete)
def master_post_delete_handler(sender, instance, **kwargs):
    if sender not in TRACKED_MODELS:
        return

    model_name = sender.__name__.lower()
    payload = {
        'model': model_name,
        'action': 'deleted',
        'id': instance.id
    }
    transaction.on_commit(lambda: broadcast_event(payload))
"""
Custom exception handler for consistent API error responses.
"""

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Returns consistent error format:
    {
        "success": false,
        "message": "Error description",
        "errors": {...},
        "status_code": 400
    }
    """
    response = exception_handler(exc, context)

    if response is not None:
        custom_response_data = {
            'success': False,
            'message': _get_error_message(response),
            'errors': response.data,
            'status_code': response.status_code,
        }
        response.data = custom_response_data
    else:
        logger.error(f"Unhandled exception: {exc}", exc_info=True)
        response = Response(
            {
                'success': False,
                'message': 'An internal server error occurred.',
                'errors': {},
                'status_code': 500,
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return response


def _get_error_message(response):
    """Extract human-readable error message."""
    messages = {
        400: 'Validation error. Please check your input.',
        401: 'Authentication credentials were not provided or are invalid.',
        403: 'You do not have permission to perform this action.',
        404: 'The requested resource was not found.',
        405: 'Method not allowed.',
        429: 'Request was throttled. Please try again later.',
    }
    return messages.get(response.status_code, 'An error occurred.')
"""Utility functions used across the project."""

from rest_framework.response import Response
from rest_framework import status


def success_response(data=None, message="Success", status_code=status.HTTP_200_OK):
    """Standard success response format."""
    return Response({
        'success': True,
        'message': message,
        'data': data,
    }, status=status_code)


def error_response(message="Error", errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    """Standard error response format."""
    return Response({
        'success': False,
        'message': message,
        'errors': errors or {},
    }, status=status_code)


def get_client_ip(request):
    """Get client IP address from request."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
"""Custom middleware for the project."""

import time
import logging

logger = logging.getLogger(__name__)


class RequestTimingMiddleware:
    """Logs the time taken to process each request."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = time.time() - start_time
        response['X-Request-Duration'] = f"{duration:.4f}s"

        if duration > 1.0:
            logger.warning(
                f"Slow request: {request.method} {request.path} took {duration:.4f}s"
            )

        return response
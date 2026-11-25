"""
Custom pagination classes compatible with PrimeNG Table.
"""

from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response
from collections import OrderedDict


class StandardResultsSetPagination(PageNumberPagination):
    """
    Standard pagination for API responses.

    Query params: ?page=1&page_size=10

    Response:
    {
        "count": 100,
        "total_pages": 10,
        "current_page": 1,
        "page_size": 10,
        "next": "http://...?page=2",
        "previous": null,
        "results": [...]
    }
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('total_pages', self.page.paginator.num_pages),
            ('current_page', self.page.number),
            ('page_size', self.get_page_size(self.request)),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data),
        ]))


class PrimeNGPagination(LimitOffsetPagination):
    """
    Alternative pagination for PrimeNG lazy loading.

    Query params: ?limit=10&offset=0
    """
    default_limit = 10
    max_limit = 100
    limit_query_param = 'limit'
    offset_query_param = 'offset'

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('totalRecords', self.count),
            ('data', data),
        ]))
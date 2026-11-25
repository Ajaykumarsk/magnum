"""Reusable filter mixins and base filter classes."""

from django_filters import rest_framework as filters


class BaseFilter(filters.FilterSet):
    """Base filter with common filtering options."""
    created_at_after = filters.DateTimeFilter(
        field_name='created_at', lookup_expr='gte'
    )
    created_at_before = filters.DateTimeFilter(
        field_name='created_at', lookup_expr='lte'
    )
    ordering = filters.OrderingFilter(
        fields=(
            ('created_at', 'created_at'),
            ('updated_at', 'updated_at'),
        )
    )

    class Meta:
        abstract = True
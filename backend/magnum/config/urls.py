"""Main URL Configuration."""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API v1
    path('api/v1/auth/', include('apps.accounts.urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),

    # JWT endpoints
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Masters - Category-based URLs
    path('api/v1/masters/resource/', include('apps.masters.resource.urls')),
    path('api/v1/masters/canteen/', include('apps.masters.canteen.urls')),
    path('api/v1/masters/visitor/', include('apps.masters.visitor.urls')),
    path('api/v1/masters/machine-config/', include('apps.masters.machine_config.urls')),
    path('api/v1/masters/product/', include('apps.masters.product.urls')),
    path('api/v1/masters/crm/', include('apps.masters.crm.urls')),
    path('api/v1/masters/cmms/', include('apps.masters.cmms.urls')),
    path('api/v1/masters/quality/', include('apps.masters.quality.urls')),
    path('api/v1/masters/store/', include('apps.masters.store.urls')),
    path('api/v1/masters/purchase/', include('apps.masters.purchase.urls')),
    path('api/v1/masters/elearning/', include('apps.masters.elearning.urls')),
    path('api/v1/masters/email-config/', include('apps.masters.email_config.urls')),
    path('api/v1/masters/role/', include('apps.masters.role.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    try:
        import debug_toolbar
        urlpatterns = [path('__debug__/', include(debug_toolbar.urls))] + urlpatterns
    except ImportError:
        pass
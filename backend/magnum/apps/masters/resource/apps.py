from django.apps import AppConfig


class ResourceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.masters.resource'
    verbose_name = 'Masters - Resource'

    def ready(self):
        import apps.masters.resource.signals  
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseMasterModel(TimeStampedModel):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)

    class Meta:
        abstract = True
        ordering = ['code']

    def __str__(self):
        return f"{self.code} - {self.name}"


class StoreLocation(BaseMasterModel):
    """Store/Warehouse location master."""
    warehouse_type = models.CharField(max_length=50, choices=[
        ('raw', 'Raw Material'),
        ('finished', 'Finished Goods'),
        ('spare', 'Spare Parts'),
        ('general', 'General'),
    ], default='general')
    capacity = models.CharField(max_length=100, blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_store_location'
        verbose_name_plural = 'Store Locations'


class Rack(BaseMasterModel):
    """Rack/Bin master within store."""
    store_location = models.ForeignKey(StoreLocation, on_delete=models.CASCADE, related_name='racks', null=True, blank=True)
    row_number = models.CharField(max_length=10, blank=True, default='')
    level = models.CharField(max_length=10, blank=True, default='')
    max_weight_kg = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_rack'
        verbose_name_plural = 'Racks'


class EngineerStore(BaseMasterModel):
    """Engineer/Maintenance store master."""
    description = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_engineer_store'
        verbose_name_plural = 'Engineer Stores'
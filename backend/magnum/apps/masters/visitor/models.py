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


class Area(BaseMasterModel):
    """Area/Zone master for visitor management."""
    description = models.TextField(blank=True, default='')
    is_restricted = models.BooleanField(default=False)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_area'
        verbose_name_plural = 'Areas'


class IDProof(BaseMasterModel):
    """ID proof type master (Aadhar, PAN, Driving License etc.)."""
    class Meta(BaseMasterModel.Meta):
        db_table = 'master_id_proof'
        verbose_name_plural = 'ID Proofs'


class VisitorID(BaseMasterModel):
    """Visitor ID card/badge type master."""
    card_type = models.CharField(max_length=50, choices=[
        ('temporary', 'Temporary'),
        ('recurring', 'Recurring'),
        ('vip', 'VIP'),
    ], default='temporary')
    validity_hours = models.PositiveIntegerField(default=8, help_text="Validity in hours")

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_visitor_id'
        verbose_name_plural = 'Visitor IDs'
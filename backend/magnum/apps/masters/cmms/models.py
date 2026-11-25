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


class Breakdown(BaseMasterModel):
    """Breakdown type/reason master for CMMS."""
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]

    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES, default='medium')
    description = models.TextField(blank=True, default='')
    estimated_downtime_minutes = models.PositiveIntegerField(default=0, help_text="Estimated downtime in minutes")

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_breakdown'
        verbose_name_plural = 'Breakdowns'
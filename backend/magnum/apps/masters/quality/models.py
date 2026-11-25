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


class QMSToolManagement(BaseMasterModel):
    """QMS Tool/Instrument master."""
    tool_type = models.CharField(max_length=100, blank=True, default='')
    calibration_frequency_days = models.PositiveIntegerField(default=365)
    last_calibration_date = models.DateField(null=True, blank=True)
    next_calibration_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_qms_tool'
        verbose_name = 'QMS Tool'
        verbose_name_plural = 'QMS Tool Management'


class QMSConfiguration(BaseMasterModel):
    """QMS Configuration parameter master."""
    parameter = models.CharField(max_length=200)
    value = models.CharField(max_length=500, blank=True, default='')
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_qms_configuration'
        verbose_name_plural = 'QMS Configurations'


class QMSModel(BaseMasterModel):
    """QMS Model/Standard master (ISO, etc.)."""
    standard = models.CharField(max_length=100, blank=True, default='')
    version = models.CharField(max_length=20, blank=True, default='')
    description = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_qms_model'
        verbose_name = 'QMS Model'
        verbose_name_plural = 'QMS Models'
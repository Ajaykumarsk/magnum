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


class EmailSenderConfig(BaseMasterModel):
    """Email sender configuration master."""
    smtp_host = models.CharField(max_length=200)
    smtp_port = models.PositiveIntegerField(default=587)
    sender_email = models.EmailField()
    use_tls = models.BooleanField(default=True)
    use_ssl = models.BooleanField(default=False)
    username = models.CharField(max_length=200, blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_email_sender_config'
        verbose_name = 'Email Sender Config'
        verbose_name_plural = 'Email Sender Configs'


class EmailSchedule(BaseMasterModel):
    """Email schedule/template master."""
    FREQUENCY_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('on_event', 'On Event'),
    ]

    subject_template = models.CharField(max_length=500, blank=True, default='')
    body_template = models.TextField(blank=True, default='')
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, default='on_event')
    recipients = models.TextField(blank=True, default='', help_text="Comma-separated email addresses")
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_email_schedule'
        verbose_name_plural = 'Email Schedules'


class EmailSend(BaseMasterModel):
    """Email send log/type master."""
    description = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_email_send'
        verbose_name_plural = 'Email Send Types'
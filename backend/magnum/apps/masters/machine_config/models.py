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


class Company(BaseMasterModel):
    """Company master."""
    address = models.TextField(blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    gst_number = models.CharField(max_length=20, blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_company'
        verbose_name_plural = 'Companies'


class Location(BaseMasterModel):
    """Location/Plant master."""
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='locations', null=True, blank=True)
    address = models.TextField(blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    pincode = models.CharField(max_length=10, blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_location'
        verbose_name_plural = 'Locations'


class Machine(BaseMasterModel):
    """Machine master."""
    MACHINE_TYPES = [
        ('production', 'Production'),
        ('utility', 'Utility'),
        ('testing', 'Testing'),
        ('packaging', 'Packaging'),
    ]

    machine_type = models.CharField(max_length=20, choices=MACHINE_TYPES, default='production')
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True, related_name='machines')
    manufacturer = models.CharField(max_length=200, blank=True, default='')
    model_number = models.CharField(max_length=100, blank=True, default='')
    serial_number = models.CharField(max_length=100, blank=True, default='')
    purchase_date = models.DateField(null=True, blank=True)
    warranty_expiry = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_machine'
        verbose_name_plural = 'Machines'
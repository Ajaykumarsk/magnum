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


class Supplier(BaseMasterModel):
    """Supplier/Vendor master."""
    contact_person = models.CharField(max_length=200, blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    address = models.TextField(blank=True, default='')
    gst_number = models.CharField(max_length=20, blank=True, default='')
    pan_number = models.CharField(max_length=15, blank=True, default='')
    payment_terms_days = models.PositiveIntegerField(default=30)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0, help_text="Rating out of 5")
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_supplier'
        verbose_name_plural = 'Suppliers'


class SupplierContact(TimeStampedModel):
    """Supplier contact person details."""
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=200)
    designation = models.CharField(max_length=100, blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    is_primary = models.BooleanField(default=False)

    class Meta:
        db_table = 'master_supplier_contact'
        ordering = ['-is_primary', 'name']
        verbose_name_plural = 'Supplier Contacts'

    def __str__(self):
        return f"{self.name} ({self.supplier.name})"
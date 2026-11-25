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


class CRMCompany(BaseMasterModel):
    """CRM Company/Client master (separate from MES Company)."""
    contact_person = models.CharField(max_length=200, blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    address = models.TextField(blank=True, default='')
    gst_number = models.CharField(max_length=20, blank=True, default='')
    industry = models.CharField(max_length=100, blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_crm_company'
        verbose_name = 'CRM Company'
        verbose_name_plural = 'CRM Companies'


class Bank(BaseMasterModel):
    """Bank master for payment processing."""
    branch = models.CharField(max_length=200, blank=True, default='')
    ifsc_code = models.CharField(max_length=20, blank=True, default='')
    account_number = models.CharField(max_length=30, blank=True, default='')
    account_type = models.CharField(max_length=20, choices=[
        ('current', 'Current'),
        ('savings', 'Savings'),
    ], default='current')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_bank'
        verbose_name_plural = 'Banks'


class Customer(BaseMasterModel):
    """Customer master."""
    company = models.ForeignKey(CRMCompany, on_delete=models.SET_NULL, null=True, blank=True, related_name='customers')
    contact_person = models.CharField(max_length=200, blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    address = models.TextField(blank=True, default='')
    credit_limit = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    payment_terms_days = models.PositiveIntegerField(default=30)
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_customer'
        verbose_name_plural = 'Customers'


class PaymentTerms(BaseMasterModel):
    """Payment terms master."""
    days = models.PositiveIntegerField(default=30)
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_payment_terms'
        verbose_name = 'Payment Terms'
        verbose_name_plural = 'Payment Terms'


class BillingType(BaseMasterModel):
    """Billing type master."""
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_billing_type'
        verbose_name_plural = 'Billing Types'
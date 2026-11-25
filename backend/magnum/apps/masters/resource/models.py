from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class TimeStampedModel(models.Model):
    """Abstract base model with created/updated timestamps."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseMasterModel(TimeStampedModel):
    """Abstract base for simple code+name masters."""
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)

    class Meta:
        abstract = True
        ordering = ['code']

    def __str__(self):
        return f"{self.code} - {self.name}"


# --- Simple Masters ---

class Department(BaseMasterModel):
    class Meta(BaseMasterModel.Meta):
        db_table = 'master_department'
        verbose_name_plural = 'Departments'


class Designation(BaseMasterModel):
    class Meta(BaseMasterModel.Meta):
        db_table = 'master_designation'
        verbose_name_plural = 'Designations'


class SkillMatrix(BaseMasterModel):
    class Meta(BaseMasterModel.Meta):
        db_table = 'master_skill_matrix'
        verbose_name_plural = 'Skill Matrices'


class Division(BaseMasterModel):
    class Meta(BaseMasterModel.Meta):
        db_table = 'master_division'
        verbose_name_plural = 'Divisions'


class EmployeeType(BaseMasterModel):
    class Meta(BaseMasterModel.Meta):
        db_table = 'master_employee_type'
        verbose_name_plural = 'Employee Types'


# --- Complex Masters ---

class Shift(TimeStampedModel):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

    # Time fields
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    start_minutes = models.PositiveIntegerField(default=0, help_text="Start time in minutes from midnight")
    end_minutes = models.PositiveIntegerField(default=0, help_text="End time in minutes from midnight")
    duration_minutes = models.PositiveIntegerField(default=0)

    # Grace & cutoff
    late_entry_grace = models.PositiveIntegerField(default=0, help_text="Late entry grace in minutes")
    early_exit_grace = models.PositiveIntegerField(default=0, help_text="Early exit grace in minutes")
    punch_in_cutoff_before_start = models.PositiveIntegerField(default=0)
    punch_in_cutoff_after_start = models.PositiveIntegerField(default=0)

    # Overtime
    overtime_threshold = models.PositiveIntegerField(default=0, help_text="Minutes after which OT starts")
    overtime_rate_multiplier = models.DecimalField(max_digits=4, decimal_places=2, default=1.00)

    # Lunch
    lunch_out_minutes = models.PositiveIntegerField(default=0)
    lunch_in_minutes = models.PositiveIntegerField(default=0)

    # Auto-calculate
    auto_calculate_shift = models.BooleanField(default=False)

    class Meta:
        db_table = 'master_shift'
        ordering = ['code']
        verbose_name_plural = 'Shifts'

    def __str__(self):
        return f"{self.code} - {self.name}"


class Holiday(TimeStampedModel):
    HOLIDAY_TYPES = [
        ('public', 'Public Holiday'),
        ('restricted', 'Restricted Holiday'),
        ('company', 'Company Holiday'),
        ('optional', 'Optional Holiday'),
    ]

    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    holiday_type = models.CharField(max_length=20, choices=HOLIDAY_TYPES, default='public')
    holiday_date = models.DateField()

    class Meta:
        db_table = 'master_holiday'
        ordering = ['holiday_date']
        verbose_name_plural = 'Holidays'

    def __str__(self):
        return f"{self.name} ({self.holiday_date})"


class WeeklyOff(TimeStampedModel):
    DAY_CHOICES = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    ]

    weekly_off_name = models.CharField(max_length=200)
    day = models.CharField(max_length=10, choices=DAY_CHOICES)

    class Meta:
        db_table = 'master_weekly_off'
        ordering = ['day']
        verbose_name_plural = 'Weekly Offs'
        unique_together = ['weekly_off_name', 'day']

    def __str__(self):
        return f"{self.weekly_off_name} - {self.day}"


class Agency(TimeStampedModel):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True, default='')
    plant_location = models.CharField(max_length=200, blank=True, default='')

    # Statutory
    epfo_number = models.CharField(max_length=100, blank=True, default='', verbose_name='EPFO Number')
    esic_registration = models.CharField(max_length=100, blank=True, default='', verbose_name='ESIC Registration')

    # Agreement
    lease_validity = models.DateField(null=True, blank=True)
    valid_from = models.DateField(null=True, blank=True)
    valid_to = models.DateField(null=True, blank=True)
    is_agreement_expired = models.BooleanField(default=False)

    # Counts
    contractor_agency_count = models.PositiveIntegerField(default=0)

    # Notes
    notes = models.TextField(blank=True, default='')

    class Meta:
        db_table = 'master_agency'
        ordering = ['code']
        verbose_name_plural = 'Agencies'

    def __str__(self):
        return f"{self.code} - {self.name}"


class Device(TimeStampedModel):
    DEVICE_TYPES = [
        ('biometric', 'Biometric'),
        ('rfid', 'RFID'),
        ('face', 'Face Recognition'),
        ('card', 'Card Reader'),
    ]

    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    controller_id = models.CharField(max_length=100, blank=True, default='')
    device_id = models.CharField(max_length=100, blank=True, default='')
    device_type = models.CharField(max_length=20, choices=DEVICE_TYPES, default='biometric')
    breakdown = models.BooleanField(default=False)

    class Meta:
        db_table = 'master_device'
        ordering = ['code']
        verbose_name_plural = 'Devices'

    def __str__(self):
        return f"{self.code} - {self.name}"


class ComplianceChecklist(TimeStampedModel):
    DOCUMENT_TYPES = [
        ('labour_license', 'Labour License'),
        ('factory_license', 'Factory License'),
        ('fire_noc', 'Fire NOC'),
        ('pollution_consent', 'Pollution Consent'),
        ('trade_license', 'Trade License'),
        ('shops_establishment', 'Shops & Establishment'),
        ('building_plan_approval', 'Building Plan Approval'),
        ('environmental_clearance', 'Environmental Clearance'),
        ('hazardous_waste', 'Hazardous Waste Authorization'),
        ('boiler_license', 'Boiler License'),
        ('electrical_license', 'Electrical License'),
        ('lift_license', 'Lift License'),
        ('pressure_vessel', 'Pressure Vessel License'),
        ('contract_labour', 'Contract Labour License'),
        ('epfo_registration', 'EPFO Registration'),
        ('esic_registration', 'ESIC Registration'),
        ('gst_registration', 'GST Registration'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expiring_soon', 'Expiring Soon'),
        ('pending_renewal', 'Pending Renewal'),
        ('expired', 'Expired'),
        ('draft', 'Draft'),
    ]

    checklist_id = models.CharField(max_length=20, unique=True, editable=False)
    company = models.ForeignKey(
        'machine_config.Company',
        on_delete=models.CASCADE,
        related_name='compliance_checklists'
    )
    location = models.ForeignKey(
        'machine_config.Location',
        on_delete=models.CASCADE,
        related_name='compliance_checklists'
    )
    document_type = models.CharField(max_length=50, choices=DOCUMENT_TYPES)
    document_name = models.CharField(max_length=300)
    issuing_authority = models.CharField(max_length=300, blank=True, default='')
    license_number = models.CharField(max_length=200, blank=True, default='')
    issue_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    renewal_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    document_file = models.FileField(upload_to='compliance_docs/', blank=True, null=True)
    remarks = models.TextField(blank=True, default='')
    history_log = models.JSONField(default=list, blank=True)

    class Meta:
        db_table = 'master_compliance_checklist'
        ordering = ['-created_at']
        verbose_name_plural = 'Compliance Checklists'

    def __str__(self):
        return f"{self.checklist_id} - {self.document_name}"

    def save(self, *args, **kwargs):
        if not self.checklist_id:
            last = ComplianceChecklist.objects.order_by('-id').first()
            next_id = (last.id + 1) if last else 1
            self.checklist_id = f"CL-{next_id:05d}"
        super().save(*args, **kwargs)
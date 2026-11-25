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


class ELearningProduct(BaseMasterModel):
    """E-Learning course/product master."""
    COURSE_TYPES = [
        ('video', 'Video Course'),
        ('document', 'Document Course'),
        ('interactive', 'Interactive'),
        ('assessment', 'Assessment Only'),
    ]

    course_type = models.CharField(max_length=20, choices=COURSE_TYPES, default='video')
    duration_hours = models.DecimalField(max_digits=5, decimal_places=1, default=0)
    description = models.TextField(blank=True, default='')
    is_mandatory = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_elearning_product'
        verbose_name = 'E-Learning Product'
        verbose_name_plural = 'E-Learning Products'


class Multimedia(BaseMasterModel):
    """Multimedia type master."""
    MEDIA_TYPES = [
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('image', 'Image'),
        ('presentation', 'Presentation'),
        ('pdf', 'PDF'),
    ]

    media_type = models.CharField(max_length=20, choices=MEDIA_TYPES, default='video')
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_multimedia'
        verbose_name_plural = 'Multimedia'


class DocumentType(BaseMasterModel):
    """E-Learning document type master."""
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_elearning_document_type'
        verbose_name_plural = 'Document Types'


class TestMaster(BaseMasterModel):
    """E-Learning test/quiz master."""
    total_questions = models.PositiveIntegerField(default=0)
    passing_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=60.00)
    duration_minutes = models.PositiveIntegerField(default=30)
    max_attempts = models.PositiveIntegerField(default=3)
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_elearning_test'
        verbose_name = 'Test'
        verbose_name_plural = 'Tests'
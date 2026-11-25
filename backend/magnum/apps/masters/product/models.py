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


class ProductGrade(BaseMasterModel):
    """Product grade/quality level master."""
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_product_grade'
        verbose_name_plural = 'Product Grades'


class ProductCategory(BaseMasterModel):
    """Product category master."""
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_product_category'
        verbose_name_plural = 'Product Categories'


class BOM(BaseMasterModel):
    """Bill of Materials master."""
    product_name = models.CharField(max_length=200)
    version = models.CharField(max_length=20, default='1.0')
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_bom'
        verbose_name = 'Bill of Materials'
        verbose_name_plural = 'Bills of Materials'


class RawMaterial(BaseMasterModel):
    """Raw material master."""
    UNIT_CHOICES = [
        ('kg', 'Kilogram'),
        ('g', 'Gram'),
        ('l', 'Litre'),
        ('ml', 'Millilitre'),
        ('pcs', 'Pieces'),
        ('m', 'Metre'),
        ('ft', 'Feet'),
    ]

    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='raw_materials')
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default='kg')
    hsn_code = models.CharField(max_length=20, blank=True, default='')
    gst_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_raw_material'
        verbose_name_plural = 'Raw Materials'
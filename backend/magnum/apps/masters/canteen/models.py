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


class FoodOrder(BaseMasterModel):
    """Food order type/category master."""
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_food_order'
        verbose_name_plural = 'Food Orders'


class FoodUtilization(BaseMasterModel):
    """Food utilization tracking master."""
    description = models.TextField(blank=True, default='')

    class Meta(BaseMasterModel.Meta):
        db_table = 'master_food_utilization'
        verbose_name_plural = 'Food Utilizations'


class FoodRate(TimeStampedModel):
    """Food rate master with pricing."""
    food_item = models.CharField(max_length=200)
    meal_type = models.CharField(max_length=50, choices=[
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('snacks', 'Snacks'),
    ])
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    effective_from = models.DateField()
    effective_to = models.DateField(null=True, blank=True)

    class Meta:
        db_table = 'master_food_rate'
        ordering = ['-effective_from']
        verbose_name_plural = 'Food Rates'

    def __str__(self):
        return f"{self.food_item} - {self.meal_type} (₹{self.rate})"
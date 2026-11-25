from rest_framework import serializers
from .models import CRMCompany, Bank, Customer, PaymentTerms, BillingType


class CRMCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = CRMCompany
        fields = ['id', 'code', 'name', 'contact_person', 'phone', 'email',
                  'address', 'gst_number', 'industry', 'is_active',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['id', 'code', 'name', 'branch', 'ifsc_code',
                  'account_number', 'account_type', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class CustomerSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True, default='')

    class Meta:
        model = Customer
        fields = ['id', 'code', 'name', 'company', 'company_name', 'contact_person',
                  'phone', 'email', 'address', 'credit_limit', 'payment_terms_days',
                  'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'company_name', 'created_at', 'updated_at']


class PaymentTermsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTerms
        fields = ['id', 'code', 'name', 'days', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class BillingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingType
        fields = ['id', 'code', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
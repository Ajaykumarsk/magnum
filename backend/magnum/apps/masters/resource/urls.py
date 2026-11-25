from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet, DesignationViewSet, SkillMatrixViewSet,
    DivisionViewSet, EmployeeTypeViewSet,
    ShiftViewSet, HolidayViewSet, WeeklyOffViewSet,
    AgencyViewSet, DeviceViewSet, ComplianceChecklistViewSet
)

router = DefaultRouter()
router.register(r'department', DepartmentViewSet, basename='department')
router.register(r'designation', DesignationViewSet, basename='designation')
router.register(r'skillmatrix', SkillMatrixViewSet, basename='skillmatrix')
router.register(r'division', DivisionViewSet, basename='division')
router.register(r'employeetype', EmployeeTypeViewSet, basename='employeetype')
router.register(r'shift', ShiftViewSet, basename='shift')
router.register(r'holidays', HolidayViewSet, basename='holidays')
router.register(r'weeklyoff', WeeklyOffViewSet, basename='weeklyoff')
router.register(r'agency', AgencyViewSet, basename='agency')
router.register(r'device', DeviceViewSet, basename='device')
router.register(r'compliance', ComplianceChecklistViewSet, basename='compliance')

urlpatterns = [
    path('', include(router.urls)),
]
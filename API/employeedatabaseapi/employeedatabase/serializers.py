# File converts complex types into native python datatypes that are then further converted.
from rest_framework import serializers
from employeedatabase.models import Departments, Employees

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ("DepartmentId", "DepartmentName")

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ("EmployeeId", "EmployeeName", "Department", "JoinDate", "PhotoFile")
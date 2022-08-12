from importlib.metadata import requires
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt # Allows other domains to access methods.
from rest_framework.parsers import JSONParser # Parses incoming data into data models.
from django.http.response import JsonResponse

from employeedatabase.models import Departments, Employees
from employeedatabase.serializers import DepartmentSerializer, EmployeeSerializer

from django.core.files.storage import default_storage
# Create your views here.

@csrf_exempt
def departmentapi(request, id = 0):
    if request.method == "GET":
        # Return records in JSON format.
        departments = Departments.objects.all()
        departments_serializer = DepartmentSerializer(departments, many = True)
        return JsonResponse(departments_serializer.data, safe = False)
    elif request.method == "POST":
        # Insert records into departments table.
        department_data = JSONParser().parse(request) # Parse request
        departments_serializer = DepartmentSerializer(data = department_data) # Convert to model
        # Save records into database if model is valid
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Record successfully added.", safe = False)
        return JsonResponse("Failed to add record.", safe = False)
    elif request.method == "PUT":
        # Update records.
        department_data = JSONParser().parse(request)
        department = Departments.objects.get(DepartmentId = department_data["DepartmentId"]) # Store current record.
        departments_serializer = DepartmentSerializer(department, data = department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Record successfully updated.", safe = False)
        return JsonResponse("Failed to update record.", safe = False)
    elif request.method == "DELETE":
        # Delete records.
        department = Departments.objects.get(DepartmentId = id)
        department.delete()
        return JsonResponse("Record successfully deleted.", safe = False)

@csrf_exempt
def employeeapi(request, id = 0):
    if request.method == "GET":
        # Return records in JSON format.
        employees = Employees.objects.all()
        employees_serializer = EmployeeSerializer(employees, many = True)
        return JsonResponse(employees_serializer.data, safe = False)
    elif request.method == "POST":
        # Insert records into departments table.
        employee_data = JSONParser().parse(request) # Parse request
        employees_serializer = EmployeeSerializer(data = employee_data) # Convert to model
        # Save records into database if model is valid
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("Record successfully added.", safe = False)
        return JsonResponse("Failed to add record.", safe = False)
    elif request.method == "PUT":
        # Update records.
        employee_data = JSONParser().parse(request)
        employee = Employees.objects.get(EmployeeId = employee_data["EmployeeId"]) # Store current record.
        employees_serializer = EmployeeSerializer(employee, data = employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("Record successfully updated.", safe = False)
        return JsonResponse("Failed to update record.", safe = False)
    elif request.method == "DELETE":
        # Delete records.
        employee = Employees.objects.get(EmployeeId = id)
        employee.delete()
        return JsonResponse("Record successfully deleted.", safe = False)

@csrf_exempt
def SaveFile(request):
    file = request.FILES["file"]
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe = False)

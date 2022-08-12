from django.urls import re_path
from employeedatabase import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    re_path(r"^department$", views.departmentapi),
    re_path(r"^department/([0-9]+)$", views.departmentapi),

    re_path(r"^employee$", views.employeeapi),
    re_path(r"^employee/([0-9]+)$", views.employeeapi),

    re_path(r"^employee/savefile", views.SaveFile)
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

# To test database:
# Run commands in SQLite Studio database
# Run project server
# Open url in postman
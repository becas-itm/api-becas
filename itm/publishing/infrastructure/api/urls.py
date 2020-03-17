from django.urls import path

from . import views


urlpatterns = [
    path('scholarships/', views.list_pendings),
    path('scholarships/<scholarship_id>/approve/', views.approve),
    path('scholarships/<scholarship_id>/deny/', views.deny),
]

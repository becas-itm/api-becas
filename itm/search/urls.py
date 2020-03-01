from django.urls import path

from . import views


urlpatterns = [
    path('scholarships/', views.search),
    path('scholarships/<scholarship_id>/', views.search_detail),
]

from django.urls import path

from . import views


urlpatterns = [
    path('scholarships/', views.search),
]

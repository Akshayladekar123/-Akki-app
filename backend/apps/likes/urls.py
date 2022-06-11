from django.urls import path   
from . import views

urlpatterns = [
    path('add/', views.LikeAdd.as_view(), name='likes'),

]
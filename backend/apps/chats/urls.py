from django.urls import path
from . import views

urlpatterns = [
    path('', views.ChatList.as_view(), name='chats'),
    path('add/', views.ChatAdd.as_view(), name='chat_add'),
]

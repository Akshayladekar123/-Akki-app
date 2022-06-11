from django.contrib import admin
from .models import User

# Register your models here.


@admin.register(User)
class UserModel(admin.ModelAdmin):
    fields = ['username', 'email', 'main_image', 'gender', 'token', 'token_expires','date_of_birth','contact_no']
    list_filter = []
    list_display = fields
    search_fields = ['username', 'email']

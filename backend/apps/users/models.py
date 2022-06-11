from django.db import models
from cloudinary.models import CloudinaryField
from config.constants import *


class User(models.Model):
    class Meta(object):
        db_table = 'user'

    username = models.CharField(
        'User Name', blank=False, null=False, max_length=50, db_index=True
    )
    password = models.CharField(
        'Password', blank=False, null=False, max_length=100, db_index=True
    )
    email = models.EmailField(
        'Email', blank=False, null=False, max_length=100, db_index=True
    )
    main_image = CloudinaryField(
        "Profile Picture", blank=True, null=True
    )
    gender = models.CharField(
        'Gender', blank=False, null=False, db_index=True, max_length=15, choices=GENDER
    )
    date_of_birth = models.DateField(
        'Date of Birth', null=True, blank=True
    )
    contact_no = models.IntegerField(
        "Contact No", null =True, blank=True
    )
    token = models.CharField(
        'Token', blank=True, null=True, max_length=500, db_index=True
    )
    token_expires = models.DateTimeField(
        'Token Expiration Date', blank=True, null=True
    )
    created_at = models.DateTimeField(
        'Creation Date', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Update Date', blank=True, auto_now=True
    )
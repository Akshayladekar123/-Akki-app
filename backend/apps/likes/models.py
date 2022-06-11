from django.db import models
from django.db.models.deletion import CASCADE
from apps.users.models import User


class Like(models.Model):
    class Meta(object):
        db_table = 'like'

    send_user_id = models.ForeignKey(
        User, related_name='related_send_like_user_id', on_delete=CASCADE, db_index=True
    )
    receive_user_id = models.ForeignKey(
        User, related_name='related_recieve_like_user_id', on_delete=CASCADE, db_index=True
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=True, auto_now=True
    )
    updated_at = models.DateTimeField(
        'Update Date', blank=True, auto_now=True
    )

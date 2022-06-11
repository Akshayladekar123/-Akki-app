from django.db import models
from django.db.models.deletion import CASCADE
from apps.users.models import User
from apps.matches.models import Match


class Chat(models.Model):
    class Meta(object):
        db_table = 'chat'

    match_id = models.ForeignKey(
        Match, related_name='chats', on_delete=CASCADE, db_index=True
    )
    send_user_id = models.ForeignKey(
        User, related_name='related_send_message_user_id', on_delete=CASCADE, db_index=True
    )
    receive_user_id = models.ForeignKey(
        User, related_name='related_recieve_message_user_id', on_delete=CASCADE, db_index=True
    )
    body = models.CharField(
        "Body", blank=False, null=False, max_length=250
    )
    created_at = models.DateTimeField(
        "Created Date", blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        "Update Date", blank=True, auto_now=True
    )

    def __str__(self):
        return self.body
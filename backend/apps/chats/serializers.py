from apps.users.serializers import UserSerializer
from .models import Chat
from rest_framework import serializers

class ChatSerializer(serializers.ModelSerializer):
    send_user_id = UserSerializer(many=False, read_only= True)
    receive_user_id = UserSerializer(many=False, read_only= True)
    class Meta:
        model = Chat
        fields = '__all__'
        depth = 1
from apps.users.serializers import UserSerializer
from apps.chats.serializers import ChatSerializer
from .models import Match
from rest_framework import serializers


class MatchSerializer(serializers.ModelSerializer):
    user_id_1 = UserSerializer(many=False, read_only=True)
    user_id_2 = UserSerializer(many=False, read_only=True)
    latest_chat = serializers.SerializerMethodField()
    class Meta:
        model = Match
        fields = '__all__'

    def get_latest_chat(self, obj):
        latest_chat = obj.chats.order_by('-created_at').first()
        if not latest_chat:
            return None

        serializer = ChatSerializer(latest_chat)
        return serializer.data
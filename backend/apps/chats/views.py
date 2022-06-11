from django.db.models.query_utils import Q
from rest_framework.filters import BaseFilterBackend
from apps.matches.models import Match
from apps.users.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serializers import ChatSerializer
from .models import Chat
from django_filters.rest_framework import DjangoFilterBackend
from apps.users.mixins import CustomLoginRequiredMixin


class CustomizeFilterBackend(BaseFilterBackend):
    """
    Customize filter fields.
    """
    def filter_queryset(self, request, queryset, view):
        # More customize field to filter goes here
        chat_id = request.query_params.get("chat_id", None)

        # Declare dict for filter
        kwargs = {}

        # Filter chat ID less than lastest chat ID (Prevent duplicated chat)
        if chat_id: kwargs['id__lt'] = chat_id

        return queryset.filter(**kwargs)

class ChatList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Chat.objects.order_by('-id').all()
    serializer_class = ChatSerializer
    filter_backends = [DjangoFilterBackend, CustomizeFilterBackend]
    filterset_fields = ['match_id']

    def get(self, request, *args, **kwargs):
        # Get match id from query param
        match_id = request.GET.get("match_id")
        # Check if the login_user belongs to the match.
        match = Match.objects.get(id=match_id)
        if (match.user_id_1.id != request.login_user.id) and (match.user_id_2.id != request.login_user.id):
            response = Response({'error': "You do not have the authority to get messages."}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response
        
        return self.list(request, *args, **kwargs)


class ChatAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def post(self, request, *args, **kwargs):
        chat_data = request.data
        # Check if the match owner is the login user
        match = Match.objects.get(id=chat_data['match_id'])
        if (match.user_id_1.id != request.login_user.id) and (match.user_id_2.id != request.login_user.id):
            response = Response({'error': "You can not send a message to the person who you do not match."}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        # Set the other user id for receive_user_id
        if match.user_id_1.id == request.login_user.id:
            receive_user_id = match.user_id_2.id
        else:
            receive_user_id = match.user_id_1.id

        #Override create chat method to get depth response
        new_chat = Chat.objects.create(
            send_user_id=User.objects.get(id=request.login_user.id), 
            receive_user_id=User.objects.get(id=receive_user_id), 
            match_id=Match.objects.get(id=chat_data['match_id']), 
            body=chat_data['body']
        )

        # Convert Model to Serializer
        serializer = ChatSerializer(new_chat)

        # Response data as Dict
        return Response(serializer.data)

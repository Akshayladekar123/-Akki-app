from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import generics
from .serializers import LikeSerializer
from .models import Like
from apps.matches.models import Match
from apps.users.models import User
from apps.users.mixins import CustomLoginRequiredMixin


class LikeAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def post(self, request, *args, **kwargs):
        # Show error if we've already liked
        like = Like.objects.filter(send_user_id=request.login_user.id, receive_user_id=request.data['receive_user_id'])
        if len(like) > 0:
            response = Response({'error': "You've sent a like before."}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        # Set the user who login
        request.data._mutable = True
        request.data['send_user_id'] = request.login_user.id

        # In case, the counterpart had liked the login user
        # We insert the data into the match table.
        check_if_liked = Like.objects.filter(send_user_id=request.data['receive_user_id'], receive_user_id=request.login_user.id)
        if check_if_liked:
            user_1 = User.objects.get(id=request.login_user.id)
            user_2 = User.objects.get(id=request.data['receive_user_id'])
            new_match = Match.objects.create(user_id_1=user_1, user_id_2=user_2)
            new_match.save()

        return self.create(request, *args, **kwargs)

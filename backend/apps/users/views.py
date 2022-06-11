from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer, UserUpdateSerializer, UserSignUpSerializer, UserSignInSerializer
from django.http import JsonResponse
from .models import User
from apps.likes.models import Like
from .mixins import CustomLoginRequiredMixin


class UserList( generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserSignUp( generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer


class UserSignIn(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignInSerializer


class UserCheckLogin(CustomLoginRequiredMixin, generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        # We can get login_user information when we use CustomLoginRequiredMixin.
        # - request.login_user
        serializer = UserSerializer([request.login_user], many=True)
        return Response(serializer.data[0])


class UserList(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
 
    def get(self, request, *args, **kwargs):
        # The opposite gender of the logged-in user
        search_gender = "male"
        print(request)
        if request.login_user.gender == "male":
            search_gender = "female"

        # List of like users
        exclude_user_id_list = []
        likes = Like.objects.filter(send_user_id=request.login_user.id)
        for like in likes:
            exclude_user_id_list.append(like.receive_user_id.id)

        # Set Search Conditions
        self.queryset = User.objects.filter(gender=search_gender).exclude(id__in=exclude_user_id_list).all()
        return self.list(request, *args, **kwargs)


class UpdateProfile(CustomLoginRequiredMixin, generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):

        serializer = UserUpdateSerializer()
        serializer.validate(request.data)
        return self.update(request, *args, **kwargs)


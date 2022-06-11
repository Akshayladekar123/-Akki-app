from django.shortcuts import render
from rest_framework import generics
from apps.users.mixins import CustomLoginRequiredMixin
from .serializers import MatchSerializer
from .models import Match
from django.db.models import Q


class MatchList(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class = MatchSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Match.objects.filter(
            Q(user_id_1=request.login_user.id) | Q(user_id_2=request.login_user.id)
        )
        return self.list(request, *args, **kwargs)

from rest_framework import generics
from .serializers import PostSerializer, PostUpdateSerializer
from .models import Post

class PostList(generics.ListAPIView):
    queryset = Post.objects.order_by('-created_at').all()
    serializer_class = PostSerializer


class PostAdd(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostUpdate(generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostUpdateSerializer
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


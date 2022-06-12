from .models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(allow_null=True)

    class Meta:
        model = Post
        fields = '__all__'

class PostUpdateSerializer(serializers.ModelSerializer):
    # main_image = serializers.ImageField(required=False)

    class Meta:
        model = Post
        fields = ('id', 'image','name','body')



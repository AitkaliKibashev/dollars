from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from collections import Counter

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView
from .pusher import pusher_client
from .models import *

from .serializers import *
from django.contrib.auth.models import User


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)

        temp_list = super(LoginAPI, self).post(request, format=None)
        temp_list.data["user"] = {
            "username": user.username,
            "id": user.id,
            "email": user.email,
        }

        return temp_list


class MessagesAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        pusher_client.trigger('chat', 'messages', {
            'username': request.data['username'],
            'message': request.data['message'],
            'send_date': request.data['send_date'],
        })

        serializer = MessageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    def get(self, request):
        messages = Message.objects.all()[:100]
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data)


class UsersAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, pk=None):
        if pk is None:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)

            return Response(serializer.data)
        else:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user, many=False)

            return Response(serializer.data)


class ReputationAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            Reputation.objects.get(username=request.data["username"], post=request.data["post"])
            return Response({"error": "Вы уже поставили репутацию"})
        except:
            serializer = ReputationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

            return Response(serializer.data)


class GetReputationAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, user_id):
        reputations = Reputation.objects.filter(user=user_id)
        reputation = 0
        for r in reputations:
            reputation += int(r.value)

        return Response(status=status.HTTP_200_OK, data={"reputation": reputation})


class PostsAPIView(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        page = request.GET.get('page', 1)
        category = request.GET.get('category', 1)
        posts = Post.objects.filter(category=category).order_by("-id")
        paginator = Paginator(posts, 6)
        page_num = request.GET.get('page', page)
        if int(page) > paginator.num_pages:
            return Response({"error": "Превышен лимит страниц"})
        page_objects = paginator.get_page(page_num)
        serializer = PostSerializer(page_objects, many=True)
        temp_data = {
            "posts": serializer.data,
            "pages": paginator.num_pages
        }
        return Response(temp_data)

    def post(self, request):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)



class RatingAPIView(APIView):
    def get(self, request, post_id=None):
        ratings = Rating.objects.filter(post=post_id)
        serializer = RatingSerializer(ratings, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = RatingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)


class RateAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            Rating.objects.get(post=request.data["post"], user=request.data["user"])
            return Response({"error": "Вы уже поставили рейтинг"})
        except:
            serializer = RatingSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()

            return Response(serializer.data)


class PostDetail(APIView):

    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        serializer = PostSerializer(post, many=False)

        return Response(serializer.data)

    def patch(self, request, pk):
        post = Post.objects.get(pk=pk)
        serializer = PostSerializer(post, data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    def delete(self, request, pk):
        post = Post.objects.get(pk=pk)
        post.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentAPIView(APIView):
    def get(self, request, post_id):
        comments = Comment.objects.filter(post=post_id).order_by("-pk")
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data)



class PostComment(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)


class DeleteComment(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, pk):
        comment = Comment.objects.get(pk=pk)
        comment.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)


class UserNotification(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def post(self, request, formate=None):
        serializer = NotificationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    def get(self, request):
        user_id = request.GET.get('user_id', None)
        notifications = Notification.objects.filter(user=user_id, watched=False).order_by("-pk")
        serializer = NotificationSerializer(notifications, many=True)

        return Response(serializer.data)

    def patch(self, request):
        pk = request.GET.get('notification_id', None)
        notification = Notification.objects.get(pk=pk)
        serializer = NotificationSerializer(notification, data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)


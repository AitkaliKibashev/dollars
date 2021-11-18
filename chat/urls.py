from django.urls import path
from .views import *
from knox import views as knox_views

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('messages/', MessagesAPIView.as_view(), name='messages-view'),
    path('user-reputation/', ReputationAPIView.as_view(), name='reputation-view'),
    path('get-user-reputation/<str:user_id>', GetReputationAPIView.as_view(), name='get-reputation-view'),
    path('post/<str:page>', GetPostsAPIView.as_view(), name='post-view'),
    path('post/', AddPostAPIView.as_view(), name='post-view'),
    path('post-rating/<str:post_id>', RatingAPIView.as_view(), name='rating-view'),
    path('post-rate/', RateAPIView.as_view(), name='rate-view'),
    path('post-detail/<str:pk>', PostDetail.as_view(), name='post-detail'),
    path('comment/<str:post_id>', CommentAPIView.as_view(), name='post-comments'),
    path('user/<str:pk>', UsersAPIView.as_view(), name='user-view'),
    path('add-comment/', PostComment.as_view(), name='add-comment-view'),
    path('delete-comment/<str:pk>', DeleteComment.as_view(), name='delete-comment-view'),
]
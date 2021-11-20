from django.db import models
from django.contrib.auth.models import User
from django.core.paginator import Paginator

class Message(models.Model):
    username = models.CharField(max_length=150)
    message = models.TextField(max_length=500)
    send_date = models.CharField(max_length=150)

    def __str__(self):
        return self.username.capitalize()


class Category(models.Model):
    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=150)
    text = models.TextField(max_length=2000)
    image = models.ImageField(upload_to='posts/', blank=True)
    published_date = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.text


class Reputation(models.Model):
    value = models.SmallIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=150, default="username")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.value)


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.SmallIntegerField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.rating}'


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=250)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)

    def __str__(self):
        return self.text


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notification')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='notification', blank=True, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='notification', blank=True, null=True)
    message = models.CharField(max_length=200)
    watched = models.BooleanField(default=False)

    def __str__(self):
        return self.message
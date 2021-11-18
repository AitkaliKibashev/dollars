from django.contrib import admin
from .models import *

admin.site.register(Message)
admin.site.register(Rating)
admin.site.register(Reputation)
admin.site.register(Post)
admin.site.register(Comment)

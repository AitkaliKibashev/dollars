from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path



urlpatterns = [
    path('api/', include('chat.urls')),
    path('admin/', admin.site.urls),
    path('/', include('frontend.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [url(r'^(?:.*)?$', include('frontend.urls'))]
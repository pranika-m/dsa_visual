"""dsavisual URL Configuration."""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # API v1
    path('api/', include('core.urls')),
    path('api/', include('concepts.urls')),
    path('api/', include('visualizer.urls')),
    # DRF browsable API auth (optional, for development)
#    path('api-auth/', include('rest_framework.urls')),
]

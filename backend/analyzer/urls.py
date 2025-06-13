from django.urls import path
from .views import getAnimeDetails

urlpatterns = [
    path('getAnimeMetadata/', getAnimeDetails.analyze, name = 'analyze')
]
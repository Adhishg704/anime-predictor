from django.urls import path
from .views import main, get_anilist_url

urlpatterns = [
    path('', main),
    path('get-anilist-url', get_anilist_url)
]
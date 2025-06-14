from django.urls import path
from .views import getAnimeDetails
from .views import sentimentAnalysisView

urlpatterns = [
    path('getAnimeMetadata/', getAnimeDetails.analyze, name = 'getAnimeMetaData'),
    path('getAnimeReviews/', sentimentAnalysisView.getReviews, name = 'getAnimeReviews')
]
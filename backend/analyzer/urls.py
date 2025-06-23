from django.urls import path
from .views import getAnimeDetails
from .views import sentimentAnalysisView
from .views import keywordsView

urlpatterns = [
    path('getAnimeMetadata/', getAnimeDetails.analyze, name = 'getAnimeMetaData'),
    path('getAnimeReviews/', sentimentAnalysisView.get_reviews, name = 'getAnimeReviews'),
    path('getReviewSentiment/', sentimentAnalysisView.analyze_entiment, name = 'getReviewSentiment'),
    path('getReviewKeywords/', keywordsView.extract_keywords, name = 'getReviewKeywords')
]
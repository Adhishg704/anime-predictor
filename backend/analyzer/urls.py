from django.urls import path
from .views import getAnimeDetails
from .views import sentimentAnalysisView
from .views import keywordsView
from .views import autoCompleteView
from .views import comparisonView
from .views import healthCheckView

urlpatterns = [
    path('getAnimeMetadata/', getAnimeDetails.analyze, name = 'getAnimeMetaData'),
    path('getAnimeReviews/', sentimentAnalysisView.get_reviews, name = 'getAnimeReviews'),
    path('getReviewSentiment/', sentimentAnalysisView.analyze_entiment, name = 'getReviewSentiment'),
    path('getReviewKeywords/', keywordsView.extract_keywords, name = 'getReviewKeywords'),
    path('getClosestAnime/', autoCompleteView.get_closest_anime, name = 'getClosestAnime'),
    path('getSimilarityScore/', comparisonView.compare_anime, name = 'getSimilarityScore'),
    path('getSimilarityScore/', healthCheckView.health_check, name = 'getHealthStatus')
]
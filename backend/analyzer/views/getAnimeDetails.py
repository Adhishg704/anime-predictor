import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def analyze(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        anime_name = data.get('anime', 'Attack on Titan')

        if not anime_name:
            return JsonResponse({'error': 'Anime name required'})

        query = """
        query($animeName: String) {
            Media(search: $animeName, type: ANIME) {
                id
                title {
                    english
                    romaji
                }
                studios {
                    edges {
                        node {
                            name
                            isAnimationStudio
                        }
                    }
                }
                averageScore
                popularity
                stats {
                    scoreDistribution {
                        score
                        amount
                    }
                }
                characters(sort: FAVOURITES_DESC, perPage: 12) {
                    edges {
                        node {
                            name {
                                full
                            }
                            favourites
                            gender
                            image {
                                large
                                medium
                            }
                        }
                    }
                }
            }
        }
        """

        url = 'https://graphql.anilist.co'

        variables = {
            'animeName': anime_name
        }

        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.post(url, json = {'query': query, 'variables': variables}, headers=headers)

        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({'error': 'Failed to get analytics from anilist API'}, status = 500)
    
    except(json.JSONDecodeError):
        return JsonResponse({'error': 'Invalid JSON'}, status = 400)
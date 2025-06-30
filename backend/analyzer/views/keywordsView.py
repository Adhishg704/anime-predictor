import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests

@csrf_exempt
def extract_keywords(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        anime_name = data.get('anime', 'Attack on Titan')
        print(anime_name)

        if not anime_name:
            return JsonResponse({'error': 'Anime name required'})
        
        query = """
        query($animeName: String) {
            Media(search: $animeName, type: ANIME) {
                tags {
                    name
                    rank
                    isGeneralSpoiler
                    isMediaSpoiler
                }
            }
        }
        """

        url = "https://graphql.anilist.co"

        variables = {
            "animeName": anime_name
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(url, json={'query': query, 'variables': variables}, headers=headers)

        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({'error': 'Failed to get reviews from anilist API'}, status = 500)

        
    except(json.JSONDecodeError):
        return JsonResponse({'error': 'Invalid JSON'}, status = 400)
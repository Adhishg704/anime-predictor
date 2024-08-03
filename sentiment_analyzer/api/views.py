from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from bs4 import BeautifulSoup

# Create your views here.
def main(request):
    return HttpResponse("Hello")

@csrf_exempt
def get_anilist_url(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            anime_title = data.get('anime_title', '')
            if not anime_title:
                return JsonResponse({'error': 'No anime title provided'}, status = 400)
            query = anime_title + ' anilist'
            search_url = 'https://www.google.com/search'
            params = {'q': query}
            response = requests.get(search_url, params=params, headers={'User-Agent': 'Mozilla/5.0'})
            if response.status_code != 200:
                return JsonResponse({'error': 'Failed to retrieve search results'}, status = 500)
            soup = BeautifulSoup(response.text, 'html.parser')
            for link in soup.findAll('a'):
                href = link.get('href')
                if href and 'anilist.co/anime' in href:
                    anilist_url = href.split('&')[0].split('=')[1]
                    return JsonResponse({'anilist_url': anilist_url})
            
            return JsonResponse({'error': 'Anilist URL not found'}, status = 404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status = 400)
    
    return JsonResponse({'error': 'Invalid request method'}, status = 400)




        

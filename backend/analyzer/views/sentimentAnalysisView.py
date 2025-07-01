import os
import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from analyzer.utils import preprocess

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

HF_TOKEN = os.getenv("HF_TOKEN")
SUMMARY_API_URL = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}


@csrf_exempt
def get_reviews(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        anime_name = data.get('anime', 'Attack on Titan')

        if not anime_name:
            return JsonResponse({'error': 'Anime name required'})
        
        query = """
        query($animeName: String) {
            Media(search: $animeName, type: ANIME) {
                reviews(sort: RATING_DESC, perPage: 5) {
                    nodes {
                        rating
                        score
                        summary
                        body
                    }
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

@csrf_exempt
def analyze_entiment(request):
    try:
        data = json.loads(request.body)
        review = data.get('body')
        preprocessed_review = preprocess.preprocess_review(review)

        if not review:
            return JsonResponse({"error": "No review provided"})

        review_summary = summarize_text(preprocessed_review)
        
        return JsonResponse({"summary": review_summary}, status=200)
            

    except(json.JSONDecodeError):
        return JsonResponse({"error": "Invalid JSON format"}, status=400)


def summarize_text(text):
    try:
        response = requests.post(
            SUMMARY_API_URL ,
            headers=headers,
            json={"inputs": text}
        )

        if response.status_code == 200:
            return response.json()[0]['summary_text']
        else:
            print(f"Request failed with status {response.status_code}")
            return "Summary failed."
    
    except requests.exceptions.RequestException as e:
        print(f"Request exception occurred: {e}")
        return "Summary failed due to request error."

    except Exception as e:
        print(f"Unexpected error occurred: {e}")
        return "Summary failed due to unknown error."
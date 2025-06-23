import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from analyzer.utils import preprocess
from rake_nltk import Rake

@csrf_exempt
def extract_keywords(request):
    try:
        data = json.loads(request.body)
        review = data.get('body')

        if not review:
            return JsonResponse({"error": "No review provided"})

        preprocessed_review = preprocess.basic_preprocess_review(review)
        keywords = extract_keywords_rake(preprocessed_review)
        
        return JsonResponse({"keywords": keywords[:10]}, status=200)
            

    except(json.JSONDecodeError):
        return JsonResponse({"error": "Invalid JSON format"}, status=400)


def extract_keywords_rake(preprocessed_review):
    rake =  Rake()
    rake.extract_keywords_from_text(preprocessed_review)
    return rake.get_ranked_phrases()
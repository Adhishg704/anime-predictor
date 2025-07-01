import json
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.metrics.pairwise import cosine_similarity


@csrf_exempt
def compare_anime(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            anime_1_tags = data.get('analyzed_anime_tags')
            anime_2_tags = data.get('favorite_anime_tags')

            if not anime_1_tags or not anime_2_tags:
                return JsonResponse({"error": "Tags of both anime are required"}, status=400)

            similarity_score = weighted_cosine_similarity(anime_1_tags, anime_2_tags)

            return JsonResponse({
                "similarity": similarity_score
            })
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Request type should be post"})


def normalize_ranks_and_amplify(tags):
    if not tags:
        return {}
    
    max_rank = max(tag["rank"] for tag in tags)
    if max_rank == 0:
        return {tag["name"]: 0 for tag in tags}
    
    return {tag["name"]: (tag["rank"] / max_rank)**2 for tag in tags}


def weighted_cosine_similarity(tags1, tags2):
    tag_score_map1 = normalize_ranks_and_amplify(tags1)
    tag_score_map2 = normalize_ranks_and_amplify(tags2)

    all_tags = set(tag_score_map1.keys()) | set(tag_score_map2.keys())

    if not all_tags:
        return 0.0

    vec1 = [tag_score_map1.get(tag, 0) for tag in all_tags]
    vec2 = [tag_score_map2.get(tag, 0) for tag in all_tags]

    np_vec1 = np.array(vec1)
    np_vec2 = np.array(vec2)

    dot_product = np.dot(np_vec1, np_vec2)

    norm_vec1 = np.linalg.norm(np_vec1)
    norm_vec2 = np.linalg.norm(np_vec2)

    if norm_vec1 == 0 or norm_vec2 == 0:
        return 0.0

    cosine_score = dot_product / (norm_vec1 * norm_vec2)

    return round(cosine_score * 100, 2)
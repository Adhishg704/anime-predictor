import json
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.metrics.pairwise import cosine_similarity

GENERIC_TAGS = {
    "Male Protagonist",
    "Female Protagonist",
}


@csrf_exempt
def compare_anime(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            anime_1_tags = filter_generic_tags(data.get('analyzed_anime_tags'))
            anime_2_tags = filter_generic_tags(data.get('favorite_anime_tags'))

            if not anime_1_tags or not anime_2_tags:
                return JsonResponse({"error": "Tags of both anime are required"}, status=400)

            similarity_score = weighted_cosine_similarity(anime_1_tags, anime_2_tags)
            top_3_tags = get_top_3_tags(anime_1_tags, anime_2_tags)

            return JsonResponse({
                "similarity": similarity_score,
                "top_3_tags": top_3_tags
            })
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Request type should be post"})


def filter_generic_tags(tags):
    return [tag for tag in tags if tag["name"] not in GENERIC_TAGS]


def normalize_ranks_and_amplify(tags):
    if not tags:
        return {}
    
    max_rank = max(tag["rank"] for tag in tags)
    if max_rank == 0:
        return {tag["name"]: 0 for tag in tags}
    
    return {tag["name"]: (tag["rank"] / max_rank)**2 for tag in tags}


def get_all_tags(tags1, tags2):
    tag_score_map1 = normalize_ranks_and_amplify(tags1)
    tag_score_map2 = normalize_ranks_and_amplify(tags2)
    all_tags = sorted(list(set(tag_score_map1.keys()) | set(tag_score_map2.keys())))
    return all_tags


def get_np_vector(tag_score_map, all_tags):
    vec = [tag_score_map.get(tag, 0) for tag in all_tags]
    np_vec = np.array(vec)
    return np_vec


def weighted_cosine_similarity(tags1, tags2):
    all_tags = get_all_tags(tags1, tags2)

    if not all_tags:
        return 0.0

    np_vec1 = get_np_vector(normalize_ranks_and_amplify(tags1), all_tags)
    np_vec2 = get_np_vector(normalize_ranks_and_amplify(tags2), all_tags)

    dot_product = np.dot(np_vec1, np_vec2)

    norm_vec1 = np.linalg.norm(np_vec1)
    norm_vec2 = np.linalg.norm(np_vec2)

    if norm_vec1 == 0 or norm_vec2 == 0:
        return 0.0

    cosine_score = dot_product / (norm_vec1 * norm_vec2)

    return round(cosine_score * 100, 2)


def get_top_3_tags(tags1, tags2):
    all_tags = get_all_tags(tags1, tags2)
    np_vec_1 = get_np_vector(normalize_ranks_and_amplify(tags1), all_tags)
    np_vec_2 = get_np_vector(normalize_ranks_and_amplify(tags2), all_tags)

    individual_products = np_vec_1 * np_vec_2

    tag_contributions = []
    for i, product in enumerate(individual_products):
        if product > 0:
            tag_contributions.append((all_tags[i], product))
    
    sorted_tags = sorted(tag_contributions, key=lambda x: x[1], reverse=True)
    top_3_tags = [tag for (tag, product) in sorted_tags][:3]
    return top_3_tags
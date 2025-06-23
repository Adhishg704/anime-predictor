import re

def preprocess_review(review_text):
    review_text = basic_preprocess_review(review_text)

    review_length = len(review_text)
    if review_length > 3000:
        half = 3000 // 2
        review_text = review_text[:half] + " ... " + review_text[-half:]

    return review_text


def basic_preprocess_review(review_text):
    review_text = re.sub(r'img\d+\(.*?\)', ' ', review_text)
    review_text = re.sub(r'youtube\([^)]+\)', '', review_text)
    review_text = re.sub(r'<[^>]+>', '', review_text)
    review_text = re.sub(r'\n+', ' ', review_text)
    review_text = re.sub(r'\s+', ' ', review_text)
    review_text = re.sub(r'[_*~`]+', '', review_text)
    review_text = re.sub(r'\s+([?.!,])', r'\1', review_text)
    review_text = review_text.strip()
    return review_text
# 🧠 Anime Analyzer

An intelligent anime analysis tool that fetches real-time data from AniList, performs sentiment analysis on user reviews, and provides similarity score between analyzed anime and your favorite anime.

### 🚀 Features
- Real-time anime data via AniList GraphQL API
- Review summary of top 5 reviews(DistilBERT)
- Score distribution, top tags, and gender-based favorites breakdown
- 3x3 anime grid similarity matching using cosine similarity

### 🛠️ Tech Stack
- **Frontend:** ReactJS
- **Backend:** Python (Django)
- **NLP:** Hugging Face Transformers, NLTK
- **Similarity:** Cosine similarity on tag vectors
- **Data:** AniList GraphQL API

import yt_dlp
import json

playlists = [
    { 'sport': 'Freediving', 'id': 'PLjZeh-au1Gz7whOqZKdLXYf0pmplP5tzg' },
    { 'sport': 'Pumpfoiling', 'id': 'PLjZeh-au1Gz4rENRli-B8RY5Gk_-9ywBn' },
    { 'sport': 'Weightlifting', 'id': 'PLjZeh-au1Gz7cp5ninOHHfsqTSjgORnDU' },
]

ydl_opts = {
    'quiet': True,
    'extract_flat': True,
    'skip_download': True,
}

results = {}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for p in playlists:
        url = f"https://www.youtube.com/playlist?list={p['id']}"
        try:
            info = ydl.extract_info(url, download=False)
            videos = []
            for entry in info.get('entries', []):
                if entry and entry.get('id'):
                    videos.append({ 'id': entry['id'], 'title': entry.get('title', '') })
            results[p['sport']] = videos
            print(f"[OK] {p['sport']}: {len(videos)} videos")
        except Exception as e:
            print(f"[ERR] {p['sport']}: {e}")
            results[p['sport']] = []

with open('scripts/playlist_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nDone! Results written to scripts/playlist_results.json")

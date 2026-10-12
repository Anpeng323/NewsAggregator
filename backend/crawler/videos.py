"""
视频爬虫 - 使用公开稳定的 CC0/示例视频直链（免密钥）
仅存储直链与封面，播放由前端 <video> 完成。
"""
import random

# 一组稳定可公开访问的示例视频直链（Google 公开 bucket，长期可用）
SAMPLE_VIDEOS = [
    ('Big Buck Bunny', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'nature'),
    ('Elephants Dream', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'animation'),
    ('For Bigger Blazes', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'sports'),
    ('For Bigger Escapes', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'adventure'),
    ('For Bigger Fun', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'entertainment'),
    ('For Bigger Joyrides', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 'cars'),
    ('For Bigger Meltdowns', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', 'tech'),
    ('Sintel', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', 'animation'),
    ('Subaru Outback', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', 'cars'),
    ('Tears of Steel', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', 'scifi'),
    ('Volkswagen GTI Review', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4', 'cars'),
    ('We Are Going On Bullrun', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', 'adventure'),
    ('What Car Can You Get For A Grand', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', 'cars'),
]


def crawl_videos(count: int = 20, seed_prefix: str = 'nav') -> list[dict]:
    """生成视频条目（循环使用稳定直链）。"""
    items = []
    for i in range(count):
        title, url, tag = SAMPLE_VIDEOS[i % len(SAMPLE_VIDEOS)]
        seed = f'{seed_prefix}-{i + 1}'
        items.append({
            'title': f'{title} #{i + 1}',
            'video_url': url,
            'thumbnail_url': f'https://picsum.photos/seed/{seed}/800/450',
            'source': 'SampleVideos',
            'duration': random.randint(15, 600),
            'width': 1920,
            'height': 1080,
            'tags': tag,
        })
    return items


if __name__ == '__main__':
    import json
    print(json.dumps(crawl_videos(2), ensure_ascii=False, indent=2))

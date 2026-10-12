"""
NewsAggregator 爬虫聚合入口
提供 crawl_all()：依次调用四类爬虫并增量写入 SQLite。
每个数据源独立 try/except 隔离，单源失败不影响整体。
"""
import db
from crawler.news import crawl_rss_news
from crawler.images import crawl_picsum_images
from crawler.videos import crawl_videos
from crawler.social import crawl_all_hot

NEWS_PER_SOURCE = 15
IMAGE_COUNT = 40
VIDEO_COUNT = 20
HOT_PER_SOURCE = 20


def crawl_all() -> dict:
    """聚合四类爬虫并增量写入数据库，返回各源数量。"""
    summary: dict = {'news': 0, 'images': 0, 'videos': 0, 'hot': 0}

    # ── 新闻 ──────────────────────────────────────
    try:
        items = crawl_rss_news(per_source=NEWS_PER_SOURCE)
        if items:
            db.insert_news(items)
            summary['news'] = len(items)
    except Exception as e:
        print(f'[爬虫] ❌ 新闻: {e}')

    # ── 图片 ─────────────────────────────────────
    try:
        items = crawl_picsum_images(count=IMAGE_COUNT)
        if items:
            db.insert_images(items)
            summary['images'] = len(items)
    except Exception as e:
        print(f'[爬虫] ❌ 图片: {e}')

    # ── 视频 ─────────────────────────────────────
    try:
        items = crawl_videos(count=VIDEO_COUNT)
        if items:
            db.insert_videos(items)
            summary['videos'] = len(items)
    except Exception as e:
        print(f'[爬虫] ❌ 视频: {e}')

    # ── 热搜 ─────────────────────────────────────
    try:
        items = crawl_all_hot(limit_per=HOT_PER_SOURCE)
        if items:
            db.insert_social_hot(items)
            summary['hot'] = len(items)
    except Exception as e:
        print(f'[爬虫] ❌ 热搜: {e}')

    try:
        counts = db.get_counts()
        print(f'[爬虫] ✅ 完成 | 📰{counts["news"]} 🖼️{counts["images"]} '
              f'🎬{counts["videos"]} 🔥{counts["social_hot"]}')
    except Exception:
        pass

    return summary


__all__ = ['crawl_all']

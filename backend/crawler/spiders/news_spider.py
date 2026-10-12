"""
兼容层 - 新版爬虫已迁移至 crawler 包（news/images/videos/social）。
保留常用别名，避免旧代码/脚本导入报错。
"""
from crawler import crawl_all
from crawler.news import crawl_rss_news
from crawler.images import crawl_picsum_images
from crawler.videos import crawl_videos
from crawler.social import crawl_all_hot

# 旧别名
crawl_all_news = crawl_rss_news
get_sample_images = crawl_picsum_images
get_sample_videos = crawl_videos
get_sample_hot = crawl_all_hot

__all__ = ['crawl_all', 'crawl_rss_news', 'crawl_picsum_images',
           'crawl_videos', 'crawl_all_hot', 'crawl_all_news',
           'get_sample_images', 'get_sample_videos', 'get_sample_hot']

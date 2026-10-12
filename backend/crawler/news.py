"""
新闻爬虫 - 通过公开 RSS 聚合多源新闻（免密钥）
"""
import requests
from bs4 import BeautifulSoup
import re
from bs4 import XMLParsedAsHTMLWarning
import warnings

warnings.filterwarnings('ignore', category=XMLParsedAsHTMLWarning)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
}

# 公开 RSS 源（无需密钥）。每个源独立容错，单源失败不影响整体。
RSS_SOURCES = [
    ('https://www.zaobao.com.sg/rss/realtime/china', '联合早报'),
    ('https://www.rfi.fr/zh/rss', '法广中文'),
    ('https://www.36kr.com/feed', '36氪'),
    ('https://sspai.com/feed', '少数派'),
    ('https://www.ruanyifeng.com/blog/atom.xml', '阮一峰的网络日志'),
]


def _clean_html(text: str) -> str:
    if not text:
        return ''
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'&[a-z]+;', ' ', text)
    return text.strip()


def _parse_date(value: str) -> str:
    if not value:
        return ''
    return value[:16]


def crawl_rss_news(per_source: int = 15) -> list[dict]:
    """聚合多个 RSS 源，返回新闻条目列表。"""
    items: list[dict] = []
    for url, source in RSS_SOURCES:
        try:
            resp = requests.get(url, headers=HEADERS, timeout=10)
            if resp.status_code != 200:
                continue
            resp.encoding = resp.apparent_encoding or 'utf-8'
            soup = BeautifulSoup(resp.text, 'xml')

            # RSS 2.0: <item>; Atom: <entry>
            nodes = soup.select('item') or soup.select('entry')
            for node in nodes[:per_source]:
                title_el = node.select_one('title')
                title = _clean_html(title_el.get_text(strip=True)) if title_el else ''
                if not title:
                    continue

                link = ''
                link_el = node.select_one('link')
                if link_el:
                    link = link_el.get('href') or link_el.get_text(strip=True)

                desc_el = node.select_one('description') or node.select_one('summary')
                summary = _clean_html(desc_el.get_text(strip=True))[:200] if desc_el else ''

                pub_el = node.select_one('pubDate') or node.select_one('updated') or node.select_one('published')
                published = _parse_date(pub_el.get_text(strip=True)) if pub_el else ''

                items.append({
                    'title': title,
                    'content': summary,
                    'source': source,
                    'url': link,
                    'published_at': published,
                    'summary': summary,
                    'keywords': '',
                })
        except Exception as e:
            print(f'[新闻爬虫] ⚠️ 源失败 {source}: {e}')

    # 去重（按标题）
    seen = set()
    deduped = []
    for it in items:
        if it['title'] not in seen:
            seen.add(it['title'])
            deduped.append(it)
    return deduped


if __name__ == '__main__':
    import json
    data = crawl_rss_news()
    print(f'共获取 {len(data)} 条新闻')
    print(json.dumps(data[:2], ensure_ascii=False, indent=2))

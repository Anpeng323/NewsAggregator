import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'news_aggregator.db')


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_conn()
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL UNIQUE,
            content TEXT,
            source TEXT,
            url TEXT,
            published_at TEXT,
            summary TEXT,
            keywords TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            image_url TEXT NOT NULL UNIQUE,
            thumbnail_url TEXT,
            source TEXT,
            photographer TEXT,
            width INTEGER,
            height INTEGER,
            tags TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS videos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            video_url TEXT NOT NULL UNIQUE,
            thumbnail_url TEXT,
            source TEXT,
            duration INTEGER,
            width INTEGER,
            height INTEGER,
            tags TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS social_hot (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL UNIQUE,
            rank INTEGER,
            heat INTEGER,
            platform TEXT,
            url TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        )
    ''')

    # Indexes
    c.execute('CREATE INDEX IF NOT EXISTS idx_news_updated ON news(updated_at DESC)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_news_title ON news(title)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_images_updated ON images(updated_at DESC)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_images_tags ON images(tags)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_videos_updated ON videos(updated_at DESC)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_videos_tags ON videos(tags)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_hot_updated ON social_hot(updated_at DESC)')

    conn.commit()
    conn.close()


def _auto_keywords(text: str) -> str:
    """从标题/内容自动提取关键词"""
    if not text:
        return ''
    # 简单中文分词
    keywords = set()
    # 高信息量词
    important = ['人工智能', 'AI', '大模型', '新能源汽车', '碳中和', '半导体', '机器人', '量子计算',
                 '云计算', '5G', '元宇宙', '区块链', '生物医药', '数字经济', '智能驾驶',
                 '电商', '直播', '芯片', '光伏', '储能', '氢能', '风电', '苹果', '华为',
                 '特斯拉', '比亚迪', '茅台', '宁德', '小米', '腾讯', '阿里', '字节', 'OpenAI', 'GPT']
    for kw in important:
        if kw in text:
            keywords.add(kw)

    # 来源提取
    sources = ['36氪', '虎嗅', '新浪财经', '腾讯新闻', '凤凰网', '知乎', '微博', 'B站', '人民日报', '央视']
    for s in sources:
        if s in text:
            keywords.add(s)

    return ','.join(list(keywords)[:8])


def _now():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


# ── INSERT (upsert with dedup by title/image_url) ────────────────────────────

def insert_news(items: list[dict]):
    if not items:
        return
    conn = get_conn()
    c = conn.cursor()
    now = _now()
    for item in items:
        title = item.get('title', '').strip()
        if not title:
            continue
        url = item.get('url') or ''
        # 自动生成关键词
        keywords = item.get('keywords') or _auto_keywords(title + ' ' + (item.get('summary') or '') + ' ' + (item.get('content') or ''))
        # 自动生成摘要（如果没有）
        summary = item.get('summary')
        if not summary and item.get('content'):
            summary = item.get('content')[:200]
        c.execute('''
            INSERT INTO news (title, content, source, url, published_at, summary, keywords, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(title) DO UPDATE SET
                content=excluded.content,
                source=COALESCE(excluded.source, source),
                url=excluded.url,
                published_at=excluded.published_at,
                summary=excluded.summary,
                keywords=CASE WHEN excluded.keywords IS NOT NULL AND excluded.keywords != '' THEN excluded.keywords ELSE news.keywords END,
                updated_at=excluded.updated_at
        ''', (title, item.get('content'), item.get('source'), url,
              item.get('published_at') or now, summary, keywords, now))
    conn.commit()
    conn.close()


def insert_images(items: list[dict]):
    if not items:
        return
    conn = get_conn()
    c = conn.cursor()
    now = _now()
    for item in items:
        image_url = item.get('image_url', '').strip()
        if not image_url:
            continue
        keywords = item.get('tags') or item.get('keywords') or _auto_keywords(item.get('title') or '')
        c.execute('''
            INSERT INTO images (title, image_url, thumbnail_url, source, photographer, width, height, tags, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(image_url) DO UPDATE SET
                title=excluded.title,
                thumbnail_url=excluded.thumbnail_url,
                source=COALESCE(excluded.source, images.source),
                photographer=excluded.photographer,
                width=excluded.width,
                height=excluded.height,
                tags=CASE WHEN excluded.tags IS NOT NULL AND excluded.tags != '' THEN excluded.tags ELSE images.tags END,
                updated_at=excluded.updated_at
        ''', (item.get('title'), image_url, item.get('thumbnail_url'), item.get('source'),
              item.get('photographer'), item.get('width'), item.get('height'), keywords, now))
    conn.commit()
    conn.close()


def insert_videos(items: list[dict]):
    if not items:
        return
    conn = get_conn()
    c = conn.cursor()
    now = _now()
    for item in items:
        video_url = item.get('video_url', '').strip()
        if not video_url:
            continue
        keywords = item.get('tags') or item.get('keywords') or _auto_keywords(item.get('title') or '')
        c.execute('''
            INSERT INTO videos (title, video_url, thumbnail_url, source, duration, width, height, tags, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(video_url) DO UPDATE SET
                title=excluded.title,
                thumbnail_url=excluded.thumbnail_url,
                source=COALESCE(excluded.source, videos.source),
                duration=excluded.duration,
                width=excluded.width,
                height=excluded.height,
                tags=CASE WHEN excluded.tags IS NOT NULL AND excluded.tags != '' THEN excluded.tags ELSE videos.tags END,
                updated_at=excluded.updated_at
        ''', (item.get('title'), video_url, item.get('thumbnail_url'), item.get('source'),
              item.get('duration'), item.get('width'), item.get('height'), keywords, now))
    conn.commit()
    conn.close()


def insert_social_hot(items: list[dict]):
    if not items:
        return
    conn = get_conn()
    c = conn.cursor()
    now = _now()
    for item in items:
        title = item.get('title', '').strip()
        if not title:
            continue
        c.execute('''
            INSERT INTO social_hot (title, rank, heat, platform, url, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(title) DO UPDATE SET
                rank=excluded.rank,
                heat=excluded.heat,
                platform=COALESCE(excluded.platform, social_hot.platform),
                url=excluded.url,
                updated_at=excluded.updated_at
        ''', (title, item.get('rank'), item.get('heat'), item.get('platform'), item.get('url'), now))
    conn.commit()
    conn.close()


# ── GET (sorted by updated_at desc) ─────────────────────────────────────────

def get_news(limit=50, offset=0, keyword=None):
    conn = get_conn()
    c = conn.cursor()
    if keyword:
        c.execute('''
            SELECT * FROM news
            WHERE title LIKE ? OR content LIKE ? OR keywords LIKE ? OR summary LIKE ?
            ORDER BY updated_at DESC LIMIT ? OFFSET ?
        ''', (f'%{keyword}%', f'%{keyword}%', f'%{keyword}%', f'%{keyword}%', limit, offset))
    else:
        c.execute('SELECT * FROM news ORDER BY updated_at DESC LIMIT ? OFFSET ?', (limit, offset))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_images(limit=50, offset=0, keyword=None):
    conn = get_conn()
    c = conn.cursor()
    if keyword:
        c.execute('''
            SELECT * FROM images
            WHERE title LIKE ? OR tags LIKE ?
            ORDER BY updated_at DESC LIMIT ? OFFSET ?
        ''', (f'%{keyword}%', f'%{keyword}%', limit, offset))
    else:
        c.execute('SELECT * FROM images ORDER BY updated_at DESC LIMIT ? OFFSET ?', (limit, offset))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_videos(limit=50, offset=0, keyword=None):
    conn = get_conn()
    c = conn.cursor()
    if keyword:
        c.execute('''
            SELECT * FROM videos
            WHERE title LIKE ? OR tags LIKE ?
            ORDER BY updated_at DESC LIMIT ? OFFSET ?
        ''', (f'%{keyword}%', f'%{keyword}%', limit, offset))
    else:
        c.execute('SELECT * FROM videos ORDER BY updated_at DESC LIMIT ? OFFSET ?', (limit, offset))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_social_hot(platform=None, limit=50):
    conn = get_conn()
    c = conn.cursor()
    if platform:
        c.execute('SELECT * FROM social_hot WHERE platform=? ORDER BY rank ASC LIMIT ?', (platform, limit))
    else:
        c.execute('SELECT * FROM social_hot ORDER BY updated_at DESC LIMIT ?', (limit,))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_counts():
    conn = get_conn()
    c = conn.cursor()
    counts = {}
    for table in ['news', 'images', 'videos', 'social_hot']:
        c.execute(f'SELECT COUNT(*) FROM {table}')
        counts[table] = c.fetchone()[0]
    conn.close()
    return counts


if __name__ == '__main__':
    init_db()
    print("Database initialized.")

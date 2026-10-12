"""
图片爬虫 - 使用 picsum.photos 动态生成（完全免密钥）
通过稳定的 seed 生成可缓存的图片与缩略图。
"""


def crawl_picsum_images(count: int = 40, seed_prefix: str = 'na') -> list[dict]:
    """生成 picsum 图片条目。"""
    categories = ['nature', 'technology', 'business', 'city', 'food',
                  'travel', 'science', 'sports', 'art', 'people']
    titles = ['山间云雾日出', '城市霓虹夜景', '森林晨曦', '现代城市建筑', '海岛日落',
              '科技感电路板', '商务会议', '城市天际线', '自然风光', '美食摄影',
              '旅行风景', '体育运动', '科技产品', '建筑设计', '艺术创作',
              '静物摄影', '人文景观', '商业摄影', '创意设计', '自然纹理']

    items = []
    for i in range(count):
        seed = f'{seed_prefix}-{i + 1}'
        pid = 100 + i  # picsum 有效 id 范围，配合 seed 让图片稳定
        full = f'https://picsum.photos/seed/{seed}/1920/1080'
        thumb = f'https://picsum.photos/seed/{seed}/400/300'
        items.append({
            'title': f'{titles[i % len(titles)]} #{i + 1}',
            'image_url': full,
            'thumbnail_url': thumb,
            'source': 'Picsum',
            'photographer': 'Picsum',
            'width': 1920,
            'height': 1080,
            'tags': categories[i % len(categories)],
        })
    return items


if __name__ == '__main__':
    import json
    data = crawl_picsum_images(3)
    print(json.dumps(data, ensure_ascii=False, indent=2))

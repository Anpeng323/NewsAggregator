import { useState } from 'react';
import type { NewsItem } from '../api/client';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { SkeletonGrid, EmptyState } from '../components/Loading';

interface Props {
  items: NewsItem[];
  loading: boolean;
}

export default function NewsPage({ items, loading }: Props) {
  const [selected, setSelected] = useState<NewsItem | null>(null);
  return (
    <div>
      {loading ? (
        <SkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon="📭" text="暂无新闻，试试刷新或搜索其他关键词" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div key={it.id} className="animate-fadeIn" style={{ animationDelay: `${Math.min(i, 16) * 30}ms` }}>
              <NewsCard item={it} onClick={() => setSelected(it)} />
            </div>
          ))}
        </div>
      )}
      {selected && <NewsModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

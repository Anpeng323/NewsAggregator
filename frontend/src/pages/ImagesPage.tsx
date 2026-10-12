import { useState } from 'react';
import type { ImageItem } from '../api/client';
import ImageCard from '../components/ImageCard';
import ImageModal from '../components/ImageModal';
import { SkeletonGrid, EmptyState } from '../components/Loading';

interface Props {
  items: ImageItem[];
  loading: boolean;
}

export default function ImagesPage({ items, loading }: Props) {
  const [selected, setSelected] = useState<ImageItem | null>(null);
  return (
    <div>
      {loading ? (
        <SkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon="🖼️" text="暂无图片，试试刷新或搜索其他关键词" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div key={it.id} className="animate-fadeIn" style={{ animationDelay: `${Math.min(i, 16) * 30}ms` }}>
              <ImageCard item={it} onClick={() => setSelected(it)} />
            </div>
          ))}
        </div>
      )}
      {selected && <ImageModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

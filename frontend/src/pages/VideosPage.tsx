import { useState } from 'react';
import type { VideoItem } from '../api/client';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import { SkeletonGrid, EmptyState } from '../components/Loading';

interface Props {
  items: VideoItem[];
  loading: boolean;
}

export default function VideosPage({ items, loading }: Props) {
  const [selected, setSelected] = useState<VideoItem | null>(null);
  return (
    <div>
      {loading ? (
        <SkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon="🎬" text="暂无视频，试试刷新或搜索其他关键词" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div key={it.id} className="animate-fadeIn" style={{ animationDelay: `${Math.min(i, 16) * 30}ms` }}>
              <VideoCard item={it} onClick={() => setSelected(it)} />
            </div>
          ))}
        </div>
      )}
      {selected && <VideoModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

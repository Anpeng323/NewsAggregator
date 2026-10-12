import { useState } from 'react';
import type { HotItem } from '../api/client';
import HotCard from '../components/HotCard';
import HotModal from '../components/HotModal';
import Loading, { EmptyState } from '../components/Loading';

interface Props {
  items: HotItem[];
  loading: boolean;
}

export default function HotPage({ items, loading }: Props) {
  const [selected, setSelected] = useState<HotItem | null>(null);
  return (
    <div className="max-w-3xl mx-auto">
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <EmptyState icon="🔥" text="暂无热搜，点击右上角刷新试试" />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((it, i) => (
            <div key={it.id} className="animate-fadeIn" style={{ animationDelay: `${Math.min(i, 20) * 25}ms` }}>
              <HotCard item={it} onClick={() => setSelected(it)} />
            </div>
          ))}
        </div>
      )}
      {selected && <HotModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

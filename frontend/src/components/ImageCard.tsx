import type { ImageItem } from '../api/client';
import { fmtTime } from '../utils/format';

export default function ImageCard({ item, onClick }: { item: ImageItem; onClick: () => void }) {
  return (
    <div className="glass-card overflow-hidden cursor-pointer img-card" onClick={onClick}>
      <div className="h-36 relative overflow-hidden bg-space-700">
        {item.thumbnail_url || item.image_url ? (
          <img
            src={item.thumbnail_url || item.image_url}
            alt={item.title || ''}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">🖼️</div>
        )}
        {item.photographer && (
          <span className="absolute bottom-1 left-1 text-[9px] font-data px-1.5 py-0.5 rounded bg-black/70 text-text-secondary">
            📷 {item.photographer}
          </span>
        )}
        {item.width && (
          <span className="absolute top-1 right-1 text-[9px] font-data px-1.5 py-0.5 rounded bg-purple-500/80 text-white">
            {item.width}p
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-[11px] text-text-secondary truncate">{item.title || '无标题'}</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[10px] font-data text-text-muted">{fmtTime(item.updated_at)}</span>
          {item.tags && (
            <span className="text-[9px] font-data px-1.5 py-0.5 rounded bg-purple-500/10 text-neon-purple">{item.tags}</span>
          )}
        </div>
      </div>
    </div>
  );
}

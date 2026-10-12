import type { VideoItem } from '../api/client';
import { fmtTime } from '../utils/format';

export default function VideoCard({ item, onClick }: { item: VideoItem; onClick: () => void }) {
  return (
    <div className="glass-card overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="h-32 relative overflow-hidden bg-space-700">
        {item.thumbnail_url ? (
          <img src={item.thumbnail_url} alt={item.title || ''} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">🎬</div>
        )}
        <div className="absolute inset-0 flex items-center justify-center group">
          <div className="w-12 h-12 rounded-full bg-cyan-400/90 flex items-center justify-center text-lg text-space-900 shadow-[0_0_20px_rgba(0,212,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity">
            ▶
          </div>
        </div>
        {item.duration && (
          <span className="absolute bottom-1.5 right-1.5 text-[10px] font-data px-1.5 py-0.5 rounded bg-black/80 text-white">
            {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-[11px] text-text-secondary truncate">{item.title || '无标题'}</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[10px] font-data text-text-muted">{fmtTime(item.updated_at)}</span>
          {item.tags && (
            <span className="text-[9px] font-data px-1.5 py-0.5 rounded bg-emerald-500/10 text-profit">{item.tags}</span>
          )}
        </div>
      </div>
    </div>
  );
}

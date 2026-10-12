import type { NewsItem } from '../api/client';
import { fmtTime } from '../utils/format';

export default function NewsCard({ item, onClick }: { item: NewsItem; onClick: () => void }) {
  const cats = item.keywords ? item.keywords.split(',').filter((k) => k.trim()).slice(0, 3) : [];
  return (
    <div className="glass-card p-4 cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] font-data px-2 py-0.5 rounded bg-cyan-500/10 text-neon-cyan border border-cyan-400/20">
          {item.source || '新闻'}
        </span>
        <span className="text-[11px] font-data text-text-muted">{fmtTime(item.updated_at || item.published_at)}</span>
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-2 leading-snug line-clamp-2">{item.title}</h3>
      {item.summary && (
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-2">{item.summary}</p>
      )}
      {cats.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {cats.map((c) => (
            <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-neon-purple border border-purple-400/20">
              #{c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

import type { NewsItem } from '../api/client';
import { fmtTime } from '../utils/format';

export default function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  const cats = item.keywords ? item.keywords.split(',').filter((k) => k.trim()) : [];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/88 backdrop-blur-md" onClick={onClose}>
      <div
        className="glass-elevated max-w-[700px] w-full max-h-[88vh] overflow-y-auto p-8 relative"
        style={{ boxShadow: '0 0 60px rgba(0,212,255,0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-400/30 text-rose-400 cursor-pointer text-base">✕</button>
        <div className="flex gap-2 items-center mb-3">
          <span className="text-xs font-data px-2 py-0.5 rounded bg-cyan-500/10 text-neon-cyan border border-cyan-400/20">{item.source || '新闻'}</span>
          <span className="text-xs font-data text-text-muted">{fmtTime(item.updated_at || item.published_at)}</span>
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-3 leading-relaxed">{item.title}</h2>
        {cats.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cats.map((c) => (
              <span key={c} className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-neon-purple border border-purple-400/20">#{c}</span>
            ))}
          </div>
        )}
        <div className="text-sm leading-8 text-text-secondary bg-space-700/50 p-4 rounded-xl border border-white/5 max-h-[50vh] overflow-y-auto whitespace-pre-wrap break-words">
          {item.content || item.summary || '暂无详细内容'}
        </div>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-space-700/60 border border-white/10 text-text-secondary text-[13px] no-underline hover:border-neon-cyan">
            🔗 访问原文
          </a>
        )}
      </div>
    </div>
  );
}

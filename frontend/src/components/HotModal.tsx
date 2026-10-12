import type { HotItem } from '../api/client';
import { fmtHeat, fmtTime } from '../utils/format';

export default function HotModal({ item, onClose }: { item: HotItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/88 backdrop-blur-md" onClick={onClose}>
      <div
        className="glass-elevated max-w-[500px] w-full p-8 relative"
        style={{ boxShadow: '0 0 60px rgba(239,68,68,0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-400/30 text-rose-400 cursor-pointer text-base">✕</button>
        <div className="flex items-center gap-4 mb-4">
          <span className={`text-5xl font-bold font-data ${item.rank <= 3 ? 'text-amber-400' : 'text-text-muted'}`}>
            {item.rank <= 3 ? '🏆' : ''}{item.rank}
          </span>
          <div>
            <span className="text-xs font-data px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-400/20">{item.platform || '微博热搜'}</span>
            {item.heat && <p className="text-hot text-sm mt-1 font-data">🔥 热度: {fmtHeat(item.heat)}</p>}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">{item.title}</h2>
        <p className="text-text-muted text-[13px] font-data">更新时间: {fmtTime(item.updated_at)}</p>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-space-700/60 border border-white/10 text-text-secondary text-[13px] no-underline hover:border-rose-400">
            🔗 访问链接
          </a>
        )}
      </div>
    </div>
  );
}

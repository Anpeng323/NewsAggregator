import type { HotItem } from '../api/client';
import { fmtHeat, fmtTime } from '../utils/format';

const RANK_STYLE: Record<number, string> = {
  1: 'text-neon-cyan',
  2: 'text-neon-purple',
  3: 'text-hot',
};

export default function HotCard({ item, onClick }: { item: HotItem; onClick: () => void }) {
  const top = item.rank <= 3;
  const rankCls = RANK_STYLE[item.rank] ?? 'text-text-muted';
  return (
    <div className="glass-card p-4 cursor-pointer flex items-center gap-3" onClick={onClick}>
      <span className={`text-2xl font-bold w-12 text-center font-data ${rankCls} drop-shadow-[0_0_8px_currentColor]`}>
        {top ? '🏆' : item.rank}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-text-primary truncate">{item.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          {item.heat ? (
            <span className="text-[11px] font-data text-hot">🔥 {fmtHeat(item.heat)}</span>
          ) : null}
          <span className="text-[10px] font-data px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-400/20">
            {item.platform || '微博热搜'}
          </span>
        </div>
      </div>
      <span className="text-[10px] font-data text-text-muted flex-shrink-0">{fmtTime(item.updated_at)}</span>
    </div>
  );
}

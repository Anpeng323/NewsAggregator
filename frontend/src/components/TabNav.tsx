import type { TabType } from '../api/client';

const TABS: { id: TabType; label: string; icon: string; key: string }[] = [
  { id: 'news', label: '新闻', icon: '📰', key: 'news' },
  { id: 'images', label: '图片', icon: '🖼️', key: 'images' },
  { id: 'videos', label: '视频', icon: '🎬', key: 'videos' },
  { id: 'hot', label: '热搜', icon: '🔥', key: 'social_hot' },
];

interface TabNavProps {
  tab: TabType;
  setTab: (t: TabType) => void;
  counts?: Record<string, number>;
}

export default function TabNav({ tab, setTab, counts = {} }: TabNavProps) {
  return (
    <nav className="px-4 pt-3 pb-1">
      <div className="glass-card-static inline-flex p-1 gap-1 rounded-xl">
        {TABS.map((t) => {
          const active = tab === t.id;
          const count = counts[t.key] ?? 0;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                active
                  ? 'text-space-900 bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_18px_rgba(0,212,255,0.35)]'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              <span
                className={`font-data text-[10px] px-1.5 py-0.5 rounded leading-none ${
                  active ? 'bg-black/20 text-space-900' : 'bg-white/5 text-text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

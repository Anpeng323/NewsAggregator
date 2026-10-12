interface HeaderProps {
  counts: Record<string, number>;
  crawling: boolean;
  onRefresh: () => void;
}

export default function Header({ counts, crawling, onRefresh }: HeaderProps) {
  const stat = (label: string, value?: number, icon?: string) => (
    <span className="flex items-center gap-1 text-xs text-text-secondary">
      <span className="opacity-70">{icon}</span>
      <span className="font-data text-text-primary">{value ?? 0}</span>
      <span className="text-text-muted">{label}</span>
    </span>
  );

  return (
    <header className="relative">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">🌐</span>
          <h1 className="text-xl font-bold tracking-wide neon-text">NewsAggregator</h1>
          <span className="hidden sm:inline text-[10px] font-data text-neon-cyan/80 border border-cyan-400/30 rounded px-2 py-0.5">
            AGGREGATOR
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {stat('新闻', counts.news, '📰')}
            {stat('图片', counts.images, '🖼️')}
            {stat('视频', counts.videos, '🎬')}
            {stat('热搜', counts.social_hot, '🔥')}
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                crawling ? 'bg-hot animate-pulse' : 'bg-profit'
              }`}
              style={{ boxShadow: crawling ? '0 0 8px #f59e0b' : '0 0 8px #10b981' }}
            />
            <span className="font-data text-text-muted">{crawling ? 'CRAWLING' : 'LIVE'}</span>
          </div>

          <button className="btn-secondary text-sm" onClick={onRefresh} disabled={crawling}>
            {crawling ? '⏳ 爬取中…' : '🔄 刷新数据'}
          </button>
        </div>
      </div>
      <div className="header-flow" />
    </header>
  );
}

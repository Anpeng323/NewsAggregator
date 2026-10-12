export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="progress-bar w-56">
        <div className="progress-fill" />
      </div>
      <p className="text-sm font-data text-text-muted animate-pulse">数据加载中…</p>
    </div>
  );
}

export function EmptyState({ icon = '📭', text }: { icon?: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-4xl mb-3 opacity-60">{icon}</div>
      <p className="font-data text-sm text-text-muted">{text}</p>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card-static overflow-hidden">
          <div className="skeleton h-36 w-full rounded-none" />
          <div className="p-3 space-y-2.5">
            <div className="skeleton h-3 w-4/5" />
            <div className="skeleton h-3 w-3/5" />
            <div className="skeleton h-2.5 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

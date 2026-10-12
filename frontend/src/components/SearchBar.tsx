interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className="px-4 pb-3">
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-neon-cyan transition-colors">🔍</span>
        <input
          className="input-field pl-10 pr-10 tracking-wide"
          placeholder="搜索新闻、图片、视频、热搜关键词…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center text-text-muted hover:text-loss hover:bg-loss/10 transition-colors cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

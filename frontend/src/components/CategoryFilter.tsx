interface CategoryFilterProps {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
}

export default function CategoryFilter({ categories, active, onSelect }: CategoryFilterProps) {
  if (!categories.length) return null;
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {categories.map((c) => {
        const isActive = active === c;
        return (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`font-data px-3 py-1 rounded-full text-xs transition-all cursor-pointer border ${
              isActive
                ? 'text-neon-cyan border-neon-cyan/50 bg-neon-cyan/10 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                : 'text-text-muted border-white/10 hover:border-white/25 hover:text-text-secondary'
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

export function fmtTime(t?: string): string {
  if (!t) return '';
  try {
    const d = new Date(t.includes(' ') ? t.replace(' ', 'T') : t);
    if (isNaN(d.getTime())) return t.slice(0, 10);
    return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  } catch {
    return t.slice(0, 10);
  }
}

export function fmtHeat(n?: number): string {
  if (!n) return '';
  if (n >= 100000000) return `${(n / 100000000).toFixed(1)}亿`;
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  return String(n);
}

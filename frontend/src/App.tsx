import { useContent } from './hooks/useContent';
import type { NewsItem, ImageItem, VideoItem, HotItem } from './api/client';
import Header from './components/Header';
import TabNav from './components/TabNav';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import NewsPage from './pages/NewsPage';
import ImagesPage from './pages/ImagesPage';
import VideosPage from './pages/VideosPage';
import HotPage from './pages/HotPage';

const CATEGORIES: Record<string, string[]> = {
  news: ['人工智能', '新能源', '财经', '科技', '数码', '国际'],
  images: ['nature', 'technology', 'business', 'city', 'food', 'travel'],
  videos: ['nature', 'technology', 'business', 'cars', 'animation'],
  hot: [],
};

export default function App() {
  const { tab, setTab, query, setQuery, data, loading, crawling, counts, onTriggerCrawl } = useContent();

  const handleCategory = (c: string) => setQuery(query === c ? '' : c);

  return (
    <div className="h-full flex flex-col grid-bg relative">
      <div className="scanline" />
      <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col min-h-0">
        <Header counts={counts} crawling={crawling} onRefresh={onTriggerCrawl} />
        <TabNav tab={tab} setTab={setTab} counts={counts} />
        <SearchBar query={query} setQuery={setQuery} />
        <CategoryFilter categories={CATEGORIES[tab]} active={query} onSelect={handleCategory} />
        <main className="flex-1 overflow-y-auto px-4 pb-10">
          {tab === 'news' && <NewsPage items={data as NewsItem[]} loading={loading} />}
          {tab === 'images' && <ImagesPage items={data as ImageItem[]} loading={loading} />}
          {tab === 'videos' && <VideosPage items={data as VideoItem[]} loading={loading} />}
          {tab === 'hot' && <HotPage items={data as HotItem[]} loading={loading} />}
        </main>
      </div>
    </div>
  );
}

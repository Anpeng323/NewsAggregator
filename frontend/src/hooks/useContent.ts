import { useCallback, useEffect, useState } from 'react';
import {
  getCounts, getNews, getImages, getVideos, getHot, triggerCrawl,
  type TabType, type AnyItem,
} from '../api/client';

const LIMIT = 50;

export function useContent() {
  const [tab, setTab] = useState<TabType>('news');
  const [query, setQuery] = useState('');
  const [data, setData] = useState<AnyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const fetchCounts = useCallback(async () => {
    try { setCounts(await getCounts()); } catch { /* ignore */ }
  }, []);

  const fetchData = useCallback(async (t: TabType, q?: string) => {
    setLoading(true);
    try {
      let items: AnyItem[] = [];
      if (t === 'news') items = await getNews(LIMIT, 0, q || undefined);
      else if (t === 'images') items = await getImages(LIMIT, 0, q || undefined);
      else if (t === 'videos') items = await getVideos(LIMIT, 0, q || undefined);
      else items = await getHot();
      setData(items);
    } catch (e) {
      console.error('加载失败', e);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 首次加载 + 统计
  useEffect(() => {
    fetchCounts();
    fetchData('news');
  }, [fetchCounts, fetchData]);

  // tab / query 变化重新拉取
  useEffect(() => {
    fetchData(tab, query);
  }, [tab, query, fetchData]);

  const onTriggerCrawl = useCallback(async () => {
    setCrawling(true);
    try {
      await triggerCrawl();
      setTimeout(async () => {
        await fetchCounts();
        await fetchData(tab, query);
        setCrawling(false);
      }, 4500);
    } catch (e) {
      console.error('触发爬取失败', e);
      setCrawling(false);
    }
  }, [tab, query, fetchCounts, fetchData]);

  return {
    tab, setTab, query, setQuery, data, loading,
    crawling, counts, fetchData, onTriggerCrawl,
  };
}

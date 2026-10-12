export type TabType = 'news' | 'images' | 'videos' | 'hot';

export interface NewsItem {
  id: number; title: string; content: string; source: string; url: string;
  published_at: string; summary: string; keywords: string; updated_at: string;
}
export interface ImageItem {
  id: number; title: string; image_url: string; thumbnail_url: string;
  source: string; photographer: string; width: number; height: number;
  tags: string; updated_at: string;
}
export interface VideoItem {
  id: number; title: string; video_url: string; thumbnail_url: string;
  source: string; duration: number; width: number; height: number;
  tags: string; updated_at: string;
}
export interface HotItem {
  id: number; title: string; rank: number; heat: number;
  platform: string; url: string; updated_at: string;
}
export type AnyItem = NewsItem | ImageItem | VideoItem | HotItem;

const API = '/api';

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`请求失败 ${res.status}`);
  return res.json() as Promise<T>;
}

export function getNews(limit = 50, offset = 0, keyword?: string): Promise<NewsItem[]> {
  const q = keyword ? `&keyword=${encodeURIComponent(keyword)}` : '';
  return getJSON<NewsItem[]>(`/news?limit=${limit}&offset=${offset}${q}`);
}
export function getImages(limit = 50, offset = 0, keyword?: string): Promise<ImageItem[]> {
  const q = keyword ? `&keyword=${encodeURIComponent(keyword)}` : '';
  return getJSON<ImageItem[]>(`/images?limit=${limit}&offset=${offset}${q}`);
}
export function getVideos(limit = 50, offset = 0, keyword?: string): Promise<VideoItem[]> {
  const q = keyword ? `&keyword=${encodeURIComponent(keyword)}` : '';
  return getJSON<VideoItem[]>(`/videos?limit=${limit}&offset=${offset}${q}`);
}
export function getHot(platform?: string): Promise<HotItem[]> {
  const q = platform ? `?platform=${encodeURIComponent(platform)}` : '';
  return getJSON<HotItem[]>(`/hot${q}`);
}
export function searchAll(q: string) {
  return getJSON<{ news: NewsItem[]; images: ImageItem[]; videos: VideoItem[]; total_news: number; total_images: number; total_videos: number }>(`/search?q=${encodeURIComponent(q)}`);
}
export function getCounts(): Promise<Record<string, number>> {
  return getJSON<Record<string, number>>('/counts');
}

export async function triggerCrawl(): Promise<void> {
  await fetch(`${API}/crawl`, { method: 'POST' });
}

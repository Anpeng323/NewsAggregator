import type { VideoItem } from '../api/client';

export default function VideoModal({ item, onClose }: { item: VideoItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white border-none cursor-pointer text-lg">✕</button>
      {item.video_url ? (
        <video controls autoPlay className="max-w-[90vw] max-h-[85vh] rounded-2xl" style={{ boxShadow: '0 0 80px rgba(0,212,255,0.2)' }} onClick={(e) => e.stopPropagation()}>
          <source src={item.video_url} type="video/mp4" />
          您的浏览器不支持视频播放
        </video>
      ) : (
        <div className="text-center text-text-muted">
          <div className="text-6xl mb-4">🎬</div>
          <p>视频链接不可用</p>
        </div>
      )}
    </div>
  );
}

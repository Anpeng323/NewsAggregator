import type { ImageItem } from '../api/client';

export default function ImageModal({ item, onClose }: { item: ImageItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white border-none cursor-pointer text-lg">✕</button>
      <img
        src={item.image_url}
        alt={item.title}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
        style={{ boxShadow: '0 0 80px rgba(0,212,255,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

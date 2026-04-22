import { useState, useEffect } from 'react';

export default function ImageViewer({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = Array.isArray(images) && images.length > 0;

  useEffect(() => {
    if (!hasImages) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, hasImages]);

  if (!hasImages) return null;

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="w-full h-[150px] overflow-hidden">
        <div
          className="flex gap-2 transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * 258}px)`,
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={img + '-' + i}
              className="w-[250px] h-[150px] object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-[6px] rounded-full transition ${
              i === currentIndex ? 'bg-orange-700 w-6' : 'bg-gray-300 w-[6px]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

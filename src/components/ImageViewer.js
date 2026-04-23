import { useEffect } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ImageViewer({ images = [] }) {
  const hasImages = Array.isArray(images) && images.length > 0;

  useEffect(() => {
    new Swiper('.swiper', {
      modules: [Pagination, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
      },
      autoplay: {
        delay: 3000,
      },
      loop: true,
    });
  }, [images.length, hasImages]);

  if (!hasImages) return null;

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="w-full">
        <div className="swiper">
          <div className="swiper-wrapper">
            {images.map((img, i) => (
              <div key={i} className="swiper-slide cursor-grab">
                <img src={img} alt={img + '-' + i} />
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

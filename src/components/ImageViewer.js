import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ImageViewer({ images = [] }) {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const hasImages = Array.isArray(images) && images.length > 0;

  useEffect(() => {
    if (!hasImages || !containerRef.current) return;

    if (swiperRef.current) {
      swiperRef.current.destroy(true, true);
    }

    swiperRef.current = new Swiper(containerRef.current, {
      modules: [Pagination, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 8,
      pagination: {
        el: containerRef.current.querySelector('.swiper-pagination'),
        clickable: true,
        type: 'bullets',
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [images.length, hasImages]);

  if (!hasImages) return null;

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="w-full">
        <div ref={containerRef} className="swiper">
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

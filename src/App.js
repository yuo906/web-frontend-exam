import { useEffect, useRef } from 'react';
import JobCardList from './components/JobCardList';

function getDistance() {
  const isDesktop = window.innerWidth >= 1440;

  return {
    X_MAX: isDesktop ? 10 : 4,
    Y_MAX: isDesktop ? 6 : 3,
  };
}

function App() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const distanceRef = useRef({ X_MAX: 0, Y_MAX: 0 });

  useEffect(() => {
    const updateDistance = () => {
      distanceRef.current = getDistance();
    };

    updateDistance();
    window.addEventListener('resize', updateDistance);

    return () => window.removeEventListener('resize', updateDistance);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const { X_MAX, Y_MAX } = distanceRef.current;

      const eyes = [
        { ref: leftRef, bias: -0.6 },
        { ref: rightRef, bias: 0.6 },
      ];

      eyes.forEach(({ ref, bias }) => {
        if (!ref.current) return;

        const rect = ref.current.parentElement.getBoundingClientRect(); // 取得元素長/寬/x/y座標
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2; // (cx, cy)眼睛的中心點

        let dx = clientX - cx; // 眼睛中心到鼠標的水平距離
        let dy = clientY - cy; // 眼睛中心到鼠標的垂直距離

        // 加左右眼校正偏移
        dx += bias * 2;

        // 限制在container內
        dx = Math.max(-X_MAX, Math.min(X_MAX, dx));
        dy = Math.max(-Y_MAX, Math.min(Y_MAX, dy));

        ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
        ref.current.style.transition = 'transform 0.1s linear';
      });
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div className="w-full max-w-[1440px] mx-auto relative min-h-screen">
      <div className="w-full">
        <img
          src="/img/Background-01.jpg"
          alt="Background"
          className="w-full h-[238px] xl:h-[823px]"
        />
        <img
          src="/img/Character-01-White.png"
          alt="Character"
          className="absolute left-0 top-0 z-10 w-[317px] h-[238px] min-w-[317px] xl:w-[1097px] xl:h-[823px]"
        />
        <img
          src="/img/Character-01.png"
          alt="Character"
          className="absolute left-0 top-0 z-30 w-[317px] h-[238px] min-w-[317px] xl:w-[1097px] xl:h-[823px]"
        />

        <div className="absolute left-[166px] top-[88px] xl:left-[582.04px] xl:top-[307.82px] w-[12.39px] h-[10.1px] xl:w-[40.2px] xl:h-[32.76px] z-20">
          <img
            ref={leftRef}
            src="/img/Lefteye-01.png"
            alt="Lefteye"
            className="w-[12.28px] h-[9.95px] xl:w-[39.82px] xl:h-[32.29px] rotate-[0.68deg]"
          />
        </div>

        <div className="absolute left-[212px] top-[87px] xl:left-[729px] xl:top-[302px] w-[9.99px] h-[7.42px] xl:w-[33.76px] xl:h-[25.05px] rotate-[-11.93deg] z-20">
          <img
            ref={rightRef}
            src="/img/Righteye-01.png"
            alt="Righteye"
            className="w-[9.77px] h-[7.1px] xl:w-[33px] xl:h-[24px] rotate-[10.08deg]"
          />
        </div>

        <img
          src="/img/Logo-01.png"
          alt="Logo"
          className="absolute left-[227px] top-[133px] xl:left-[817px] xl:top-[350px] z-40 w-[137px] h-[82px] xl:w-[540px] xl:h-[323px] animate-zoomIn"
        />
      </div>
      <main className="w-full max-w-[1384px] mx-auto xl:-mt-[120px] z-50 relative mb-7">
        <JobCardList />
      </main>
    </div>
  );
}

export default App;

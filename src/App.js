import JobCardList from './components/JobCardList';

function App() {
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
          className="absolute left-0 top-0 z-20 w-[317px] h-[238px] min-w-[317px] xl:w-[1097px] xl:h-[823px]"
        />

        <div className="absolute left-[166px] top-[88px] xl:left-[582.04px] xl:top-[307.82px] w-[12.39px] h-[10.1px] xl:w-[40.2px] xl:h-[32.76px] z-30">
          <img
            ref="leftEyeRef"
            src="/img/Lefteye-01.png"
            alt="Lefteye"
            className="w-[12.28px] h-[9.95px] xl:w-[39.82px] xl:h-[32.29px] rotate-[0.68deg]"
          />
        </div>

        <div className="absolute left-[212px] top-[87px] xl:left-[729px] xl:top-[302px] w-[9.99px] h-[7.42px] xl:w-[33.76px] xl:h-[25.05px] rotate-[-11.93deg] z-30">
          <img
            ref="rightEyeRef"
            src="/img/Righteye-01.png"
            alt="Righteye"
            className="w-[9.77px] h-[7.1px] xl:w-[33px] xl:h-[24px] rotate-[10.08deg]"
          />
        </div>

        <img
          src="/img/Logo-01.png"
          alt="Logo"
          className="absolute left-[227px] top-[133px] xl:left-[817px] xl:top-[350px] z-30 w-[137px] h-[82px] xl:w-[540px] xl:h-[323px] animate-zoomIn"
        />
      </div>
      <main className="w-full max-w-[1384px] mx-auto xl:-mt-[120px] z-40 relative mb-7">
        <JobCardList />
      </main>
    </div>
  );
}

export default App;

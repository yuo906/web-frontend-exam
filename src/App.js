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
          className="absolute left-0 top-0 z-10 w-[317px] h-[238px] xl:w-[1097px] xl:h-[823px]"
        />
        <img
          src="/img/Character-01.png"
          alt="Character"
          className="absolute left-0 top-0 z-20 w-[317px] h-[238px] xl:w-[1097px] xl:h-[823px]"
        />
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

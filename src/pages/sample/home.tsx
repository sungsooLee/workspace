const Home = () => {
  return (
    <>
      <div>
        <div className='h-[472px] w-full bg-cyan-50 px-240pxr py-80pxr'>
          {/* <HomeFrame /> */}
        </div>
        <section className='h-[180px] w-full bg-gray-300 px-240pxr py-60pxr'>
          유저 정보
        </section>
        <div className='h-[1248px] w-full items-center bg-gray-400 px-240pxr py-60pxr'>
          <div className='w-1/1 h-[296px] bg-blue-100'>구독 채널</div>
          <div className='w-1/1 h-[832px] bg-orange-200 pb-[30px] pt-[60px]'>
            채널명
          </div>
        </div>
        <div className='h-[480px] w-full bg-yellow-50 px-240pxr py-60pxr'>
          추천 패키지
        </div>
        <div className='h-[1250px] w-full bg-green-50 px-240pxr py-60pxr'>
          AI 추천
        </div>
      </div>
    </>
  );
};

export default Home;

const Home = () => {
  return (
    <>
      <div>
        <div className='w-full h-[472px] px-240pxr py-80pxr bg-cyan-50'>
          Strategic Contents
        </div>
        <section className='w-full h-[180px] px-240pxr py-60pxr bg-gray-300'>
          유저 정보
        </section>
        <div className='w-full h-[1248px] px-240pxr py-60pxr bg-gray-400 items-center'>
          <div className='w-1/1 h-[296px] bg-blue-100'>구독 채널</div>
          <div className='w-1/1 h-[832px] pt-[60px] pb-[30px] bg-orange-200'>
            채널명
          </div>
        </div>
        <div className='w-full h-[480px] py-60pxr px-240pxr bg-yellow-50'>
          추천 패키지
        </div>
        <div className='w-full h-[1250px] px-240pxr py-60pxr bg-green-50'>
          AI 추천
        </div>
      </div>
    </>
  );
};

export default Home;

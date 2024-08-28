import { axiosInstance } from '@/app/api/instance';
import { Button } from '@/shared/components/Button/button';
import { useAuthStore } from '@/shared/stores/useAuthStore';

interface commonApiResponse<T> {
  timestamp: Date;
  status: number;
  data: T;
  message: string;
}

const errorData = async () => {
  const data = await axiosInstance.get('/error401');
  return data.data;
};
const call401Error = async () => errorData();
const Home = () => {
  // const test = async () => {

  //   // try {
  //   //   await axiosInstance.get('/error401');
  //   // } catch (error) {
  //   //   if (axios.isAxiosError(error) && error.response?.status === 401) {
  //   //     console.error('401 에러 발생:', error.message);
  //   //   } else {
  //   //     console.error('기타 에러 발생:', error);
  //   //   }
  //   // }
  // };
  // const { data } = useCallApi2<{ msg: string }>('/error401');
  // const { data, error } = useCallApi2<{ msg: string }>('/error401');

  const test = async () => {
    // console.log('데이터:', data);
  };

  const test2 = () => {
    const { clearToken } = useAuthStore.getState();
    clearToken();
  };
  return (
    <>
      <div>
        <div className='h-[472px] w-full bg-cyan-50 px-240pxr py-80pxr'>
          <Button onClick={() => test()} className='mb-10pxr'>
            401에러
          </Button>
          <br />
          <Button onClick={test2}>토큰 스토리지 삭제</Button>
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

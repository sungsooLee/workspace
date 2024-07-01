import { HttpResponse, http } from 'msw';
import user from './user.json';

interface LoginUserType {
  email: string;
  password: string;
}
const mockToken = 'testToken';

export const handlers = [
  http.post('/user', async ({ request }) => {
    const { password } = (await request.json()) as LoginUserType;

    if (password !== '1234') {
      return HttpResponse.json(
        {
          msg: '로그인 정보를 다시 확인해주세요.(비밀번호 1234)',
        },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      id: user.id,
      email: user.email,
      token: user.accessToken,
    });
  }),
  http.get('/users/me', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (authHeader !== `Bearer ${mockToken}`) {
      return HttpResponse.json(
        { msg: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }),

  http.get('/api/video', async ({ request }) => {
    return HttpResponse.json({
      videoUrl: '/video/test.mp4',
    });
  }),
];

///서스펜스 테스트용 페치 데이터
export const fetchData = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('데이터 로딩 완료');
    }, 2000);
  });
};

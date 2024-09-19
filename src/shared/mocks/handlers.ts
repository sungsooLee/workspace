import { HttpResponse, http } from 'msw';
import user from './data/user.json';
import hugeData from './data/commentsLarge.json';
import { menuConfig } from '@/app/layout/types';

interface LoginUserType {
  email: string;
  password: string;
}

interface regComment {
  id: string;
  comment: string;
  email: string;
}
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ACCESS_TOKEN_EXPIRY = 1 * 10 * 1000;

const getVideoProgressKey = (videoId: string, userId: string) =>
  `video-progress-${userId}-${videoId}`;

const mockToken = 'testToken';

const getNextCommentId = () => {
  const currentId = localStorage.getItem('commentId');
  const nextId = currentId ? parseInt(currentId) + 1 : 1;
  localStorage.setItem('commentId', nextId.toString());
  return nextId;
};

export const handlers = [
  http.post('/user', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginUserType;

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
      email: email,
      token: user.accessToken,
    });
  }),

  http.post('/login', async ({ request }) => {
    const { password } = (await request.json()) as LoginUserType;
    await wait(1000);

    if (password !== '1234') {
      return HttpResponse.json(
        {
          error: '로그인 정보를 다시 확인해주세요. (비밀번호 1234)',
        },
        {
          status: 401,
        }
      );
    }

    return HttpResponse.json(
      {
        accessToken: 'mocked-access-token',
        refreshToken: 'mocked-refresh-token',
      },
      {
        status: 200,
      }
    );
  }),

  http.post('/refresh-token', async ({ request }) => {
    const { refreshToken } = (await request.json()) as { refreshToken: string };

    if (refreshToken === 'mocked-refresh-token') {
      return HttpResponse.json(
        {
          accessToken: 'mocked-new-access-token',
        },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      { msg: 'invalid refresh token' },
      {
        status: 401,
      }
    );
  }),

  http.get('/error401', async ({ request }) => {
    return HttpResponse.json(
      { msg: 'TEST NO TOKEN' },
      {
        status: 401,
      }
    );
  }),
  //////////////////
  http.get('/error/:codeNum', async ({ params, request }) => {
    await wait(2000);

    const { codeNum } = params;
    // const randomResponse = () => Math.random() >= 0.1;
    // // console.log(randomResponse());
    // if (Math.random() >= 0.5) {
    switch (codeNum) {
      case '400':
        return HttpResponse.json(
          {
            message: '실패..',
            code: 400,
          },
          { status: 400 }
        );
      case '401':
        return HttpResponse.json(
          { message: 'Forbidden', code: 401 },
          { status: 401 }
        );
      case '403':
        return HttpResponse.json(
          { message: 'Forbidden', code: 403 },
          { status: 403 }
        );
      case 'CUSTOM_ERROR':
        return HttpResponse.json(
          {
            message: '또잉..',
            code: 'CUSTOM_ERROR',
          },
          { status: 400 }
        );

      case '200':
        return HttpResponse.json(
          {
            message: '성공.',
            code: 200,
            data: { title: '성공 타이틀', content: '성공 ~' },
          },
          { status: 200 }
        );
    }
    // }
    // return HttpResponse.json(
    //   {
    //     message: '성공.',
    //     code: 200,
    //     data: { title: '성공 타이틀', content: '성공 ~' },
    //   },
    //   { status: 200 }
    // );
  }),
  http.post('/error/mutation', async ({ request }) => {
    const randomResponse = () => Math.random() >= 0.5;

    if (randomResponse()) {
      return HttpResponse.json(
        {
          message: '에러 발생 X',
          code: 200,
        },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      {
        message: '서버 에러 발생',
        code: 'CUSTOM_ERROR',
      },
      { status: 500 }
    );
  }),
  //////////////////
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

  // ** 비디오 상세 페이지 **
  // 1.댓글 불러오기
  // 2.댓글 저장하기
  // 3.비디오 정보 불러오기
  // 4.추천 리스트 비디오 목록 불러오기

  // 1.댓글 불러오기
  http.get('/api/video/comment/:id', async ({ params, request }) => {
    const url = new URL(request.url);
    const commentDbStr = localStorage.getItem('comment');
    const commentDb = JSON.parse(commentDbStr || '{}');
    const { id } = params;
    const page = url.searchParams.get('page');
    const pageSize = url.searchParams.get('pageSize');
    if (page && pageSize) {
      const start = parseInt(page) * parseInt(pageSize);
      const end = start + parseInt(pageSize);
      console.log('start=' + start + ', end=' + end);
      const comments = commentDb[`${id}`] || [];
      const commentArr = comments.slice(start, end);
      const isLastPage = end >= comments.length;
      console.log(
        'end=' +
          end +
          ', lenght=' +
          comments.length +
          ', isLastPage=' +
          isLastPage
      );
      return HttpResponse.json({
        id: id,
        comments: commentArr,
        isLastPage,
        nextCursor: isLastPage ? undefined : parseInt(page) + 1,
      });
    }
    return HttpResponse.json({
      comments: [],
      isLastPage: true,
    });
  }),

  // 1-1. 테스트 대용량 댓글 데이터 불러오기
  http.get('/api/video/comments', async ({ params, request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const pageSize = url.searchParams.get('pageSize');

    if (page && pageSize) {
      const start = parseInt(page) * parseInt(pageSize);
      const end = start + parseInt(pageSize);
      const comments = hugeData;
      const commentArr = comments.slice(start, end);
      const isLastPage = end >= comments.length;
      return HttpResponse.json({
        comments: commentArr,
        isLastPage,
      });
    }
    return HttpResponse.json({
      comments: [],
      isLastPage: true,
    });
  }),

  // 2.댓글 저장하기
  http.post('/api/video/comment', async ({ request }) => {
    // console.log(request);
    const requsetJson: regComment = (await request.json()) as regComment;
    const { id, comment, email } = requsetJson;
    const commentDbStr = localStorage.getItem('comment');
    const commentDb = JSON.parse(commentDbStr || '{}');
    const commentId = getNextCommentId();
    if (!commentDb[id]) commentDb[id] = [];
    commentDb[id].push({
      commentId: commentId,
      comment: comment,
      email: email,
      time: Date.now(),
    });
    localStorage.setItem('comment', JSON.stringify(commentDb));
    return HttpResponse.json({
      commentId: commentId,
      comment: comment,
      email: email,
      id: id,
    });
  }),
  http.get('/api/video', async ({ request }) => {
    return HttpResponse.json({
      videoUrl: '/videos/test.mp4',
    });
  }),
  // 댓글 삭제하기
  http.delete('/api/video/comment/:commentId', async ({ params }) => {
    const { commentId } = params;
    const commentDbStr = localStorage.getItem('comment');
    const commentDb = JSON.parse(commentDbStr || '{}');

    for (const videoId in commentDb) {
      commentDb[videoId] = commentDb[videoId].filter(
        (comment: any) => comment.commentId !== parseInt(commentId as string)
      );
    }
    localStorage.setItem('comment', JSON.stringify(commentDb));

    return HttpResponse.json({ commentId });
  }),

  http.get('/api/menus', async ({ request }) => {
    return HttpResponse.json({
      statusCode: 'OK',
      message: '',
      data: {
        items: menuConfig.gnb || [],
      },
    });
  }),
  http.get('/api/channel/:id/profile', ({ params, request }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      title: '인재개발원 역량혁신센터',
      description: '여행자를 위한 10가지 필수 아이템 추천',
      subscribers: '구독자 449 만명',
      videos: '동영상 251,412 개',
      views: '조회수 16,516 회',
      profileImage: 'https://via.placeholder.com/150',
      details: {
        youtubeLink: 'http://youtube.com/@MBCNEWS111',
        joinDate: '2006. 11. 6.',
      },
    });
  }),
  http.get('/api/channel/:id/videos', async ({ request }) => {
    return HttpResponse.json({
      statusCode: 'OK',
      message: '',
      data: {
        items: [
          {
            id: 327972,
            course: {
              title: '피그마로 콘텐츠 디자인하기',
              type: 'REGULAR',
              format: 'VIDEO',
              thumbnailUrl:
                'https://cdn.inflearn.com/public/courses/327972/cover/0e64ce46-8dfd-4cb8-b6bd-914b87358461/인프런 메인.jpg',
            },
          },
          {
            id: 333931,
            course: {
              title: 'Real MySQL 시즌 1 - Part 1',
              type: 'ON_DEMAND',
              format: 'VIDEO',
              thumbnailUrl:
                'https://cdn.inflearn.com/public/courses/333931/cover/e2c8565a-76c4-4b80-bfcc-98384e18d1c2/333931.png',
            },
          },
          {
            id: 326063,
            course: {
              title: '피그마(Figma)를 활용한 UI디자인 입문부터 실전까지 A to Z',
              type: 'PACKAGE',
              format: 'DIGITAL',
              thumbnailUrl:
                'https://cdn.inflearn.com/public/course-326063-cover/4aff7ad8-ebd6-49ea-8d19-64d7e746c4fe',
            },
          },
          {
            id: 325446,
            course: {
              title: '[직딩꿀템] 직장인 글쓰기 트레이닝, 일하는 문장들',
              type: 'PLAYLIST',
              format: 'SPECIALIZE',
              thumbnailUrl:
                'https://cdn.inflearn.com/public/courses/325446/course_cover/0fe7b8b2-69a4-4c5f-b59d-8c04d79d3dca/mulcam-worksmart-writing-eng.png',
            },
          },
          {
            id: 333682,
            course: {
              title:
                'Supabase, Next 풀 스택 시작하기 (feat. 슈파베이스 OAuth, nextjs 14)',
              type: 'PACKAGE',
              format: 'SPECIALIZE',
              thumbnailUrl:
                'https://cdn.inflearn.com/public/courses/333682/cover/4c11de3e-6aa7-475c-9258-62bc2257417d/333682.png',
            },
          },
          {
            id: 325903,
            course: {
              title:
                'IT 회사에서 비개발자가 살아남기 위한 모든 개발 지식 A to Z',
              type: 'ON_DEMAND',
              format: 'GENERAL',
              thumbnailUrl:
                'https://cdn.inflearn.com/public/course-325903-cover/335d6f7d-bb22-4ea8-b1dc-131d79b721cd',
            },
          },
          {
            id: 328413,
            course: {
              title: '견고한 기본기 HTML&CSS',
              type: 'REGULAR',
              format: 'WORK_MANUL',
              thumbnailUrl:
                'https://cdn.inflearn.com/public/courses/328413/cover/6f95ce3b-a70b-438d-90f8-e1e47e11f03f/328413-eng.png',
            },
          },
        ],
      },
    });
  }),

  //진도율 저장
  http.post('/api/video/progress', async ({ request }) => {
    const { videoId, progress, userId } =
      (await request.json()) as VideoProgress;
    const key = getVideoProgressKey(videoId, userId);
    localStorage.setItem(key, progress + '');

    return HttpResponse.json({
      videoId,
      progress,
      userId,
    });
  }),

  //비디오 상세 조회
  http.post('/api/video', async ({ request }) => {
    const { videoId, userId } = (await request.json()) as VideoDetailRequest;
    // console.log(await request.json());
    // return;
    const key = getVideoProgressKey(videoId, userId);
    const progress = localStorage.getItem(key) || 0;

    return HttpResponse.json({
      videoId,
      progress: parseFloat(progress as string),
      url: `/videos/${videoId}.mp4`,
    });
  }),

  // 모든 Response 필드 string type
  http.post('/api/testResponse', async ({ request }) => {
    const test = {
      timestamp: '2024-07-30T10:45:52.093772',
      status: 200,
      data: {
        courseNo: '601656710953689572',
        courseName: '1',
        courseDesc: '과정설명입니다. 2000자까지 가능합니다.',
        orgNo: '1',
        courseType: 'ONLINE',
        categories: [],
        channel: { channelNo: '1', channelName: '1' },
        isDeleted: 'FALSE',
        isPublished: 'TRUE',
        url: 'http://campus.autoever.com/course/uu4849-2893484-384982',
        kitNo: '1',
      },
      message: null,
    };
    return HttpResponse.json(test);
  }),
];

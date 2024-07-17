export const HTTP_ERROR_MESSAGE = {
  401: {
    HEADING: '401',
    BODY: '로그인 후 다시 시도해주세요.',
    BUTTON: '로그인',
  },
  404: {
    HEADING: '404',
    BODY: '요청하신 페이지를 찾을 수 없습니다.',
    BUTTON: '홈으로 돌아가기',
  },
  500: {
    HEADING: '서버 오류가 발생했습니다',
    BODY: '잠시 후 다시 요청해주세요.',
    BUTTON: '새로고침',
  },
  400: {
    HEADING: '잘못된 요청입니다.',
    BODY: '확인 후 다시 시도해주세요.',
    BUTTON: '홈으로 돌아가기',
  },
} as const;

import { LEARNING_TYPE } from '@learnway/config';

export const getDetailPathByContentType = (contentType: string): string => {
  switch (contentType) {
    case LEARNING_TYPE.VIDEO:
      return '/learning/learning-resource/video/view';
    case LEARNING_TYPE.BLOG:
      return '/learning/resource/blog/view';
    case LEARNING_TYPE.HTML5_VIDEO:
      return '/learning/resource/html-video/view';
    case LEARNING_TYPE.EXAM:
      return '/learning/resource/test-paper/view';
    case LEARNING_TYPE.EXAM_POOL:
      return '/learning/resource/question-bank/view';
  }
  return '';
};

export const getDetailRouterState = (contentUuid: string, contentType: string) => {
  const state = { contentUuid };
  switch (contentType) {
    case LEARNING_TYPE.EXAM:
      Object.assign(state, { mode: 'UPDATE' });
      break;
    // 컨텐츠 유형에 따라 state 추가 설정
  }
  return state;
};

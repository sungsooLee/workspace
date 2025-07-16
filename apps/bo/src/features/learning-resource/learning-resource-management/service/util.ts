import { LEARNING_TYPE } from '@learnway/config';

export const getDetailPathByContentType = (contentType: string) => {
  switch (contentType) {
    case LEARNING_TYPE.VIDEO:
      return '/learning/learning-resource/video/view';
    case LEARNING_TYPE.BLOG:
      return '/learning/resource/blog/view';
      break;
    case LEARNING_TYPE.HTML5_VIDEO:
      return '/learning/resource/html-video/view';
      break;
    // TODO: 유형 추가
  }
  return '';
};

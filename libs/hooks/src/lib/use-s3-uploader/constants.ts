export const S3_PATH = {
  'upload/content/original': 'upload/content/original', // 학습자원 원본 파일
  'upload/content/thumbnail': 'upload/content/thumbnail', // 학습자원 썸네일
  'upload/content/image': 'upload/content/image', // URL 접근이 필요한 이미지
  'public/image/channel/profile': 'public/image/channel/profile', // 채널 프로필 이미지
  'public/image/channel/main': 'public/image/channel/main', // 채널 홈 이미지
  'public/image/banner': 'public/image/banner', // 배너 이미지
  'public/image/board': 'public/image/board', // 게시판 편집기 이미지
  'public/image/logo': 'public/image/logo', // 로고 이미지
  'public/image/thumbnail': 'public/image/thumbnail', // 썸네일 이미지
  'public/i18n': 'public/i18n', // 다국어 JSON
  'upload/course/thumbnail': 'upload/course/thumbnail', // 과정 썸네일
};

export type S3_PATH_TYPE = (typeof S3_PATH)[keyof typeof S3_PATH];

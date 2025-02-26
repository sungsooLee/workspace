export const PAGE_TITLE_BY_PATH: Record<string, string> = {
  '/pb-bo/signup': '회원가입',
  '/pb-bo/login': 'Welcome\nLearning-Way',
  '/pb-bo/success': '',
  '/pb-bo/progress-status': '진행현황',
  '/pb-bo/search-account': '아이디 찾기',
  '/pb-bo/search-account-pw': '비밀번호 찾기',
};

export function isSigninPage(path: string): boolean {
  return path === '/pb-bo/login';
}

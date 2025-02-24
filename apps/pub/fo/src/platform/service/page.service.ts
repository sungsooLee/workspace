export const PAGE_TITLE_BY_PATH: Record<string, string> = {
  '/signup': '회원가입',
  '/signup-step1': '회원가입',
  '/signup-step2': '회원가입',
  '/signup-step3': '회원가입',
  '/login': 'Welcome\nLearning-Way',
  '/success': '',
  '/progress-status': '진행현황',
  '/search-account': '아이디 / 비밀번호 찾기',
  '/search-id-success': '아이디찾기',
};

export function isSigninPage(path: string): boolean {
  return path === '/login';
}

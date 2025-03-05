export const PAGE_TITLE_BY_PATH: Record<string, string> = {
  '/pb-fo/signup-step1': '회원가입',
  '/pb-fo/signup-step2': '회원가입',
  '/pb-fo/signup-step3': '회원가입',
  '/pb-fo/login': 'Welcome\nLearning-Way',
  '/pb-fo/success': '가입완료',
  '/pb-fo/progress-status': '진행현황',
  '/pb-fo/search-account': '아이디 / 비밀번호 찾기',
  '/pb-fo/password-input': '비밀번호 입력',
  '/pb-fo/password-modify': '비밀번호 변경',
  '/pb-fo/search-id-success': '아이디찾기',
  '/pb-fo/mpass_cert': 'MPASS 인증',
};

export function isSigninPage(path: string): boolean {
  return path === '/pb-fo/login';
}

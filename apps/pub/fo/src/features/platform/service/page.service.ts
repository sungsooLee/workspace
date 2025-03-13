export const PAGE_TITLE_BY_PATH: Record<string, string> = {
  '/pb-fo/signup-step1': '회원가입',
  '/pb-fo/signup-step2': '회원가입',
  '/pb-fo/signup-step3': '회원가입',
  '/pb-fo/login': 'Welcome\nLearning-Way',
  '/pb-fo/success': '', // 휴먼 계정 해제결과와 동일,
  '/pb-fo/progress-status-email': '회원가입 진행현황',
  '/pb-fo/progress-status-cert': '회원가입 진행현황',
  '/pb-fo/progress-status-result': '회원가입 진행현황',
  '/pb-fo/search-account': '아이디 / 비밀번호 찾기',
  '/pb-fo/dormant-account': '휴면 계정 해제',
  '/pb-fo/password-input': '비밀번호 입력', // 휴먼 계정 해제와 동일
  '/pb-fo/password-modify': '비밀번호 변경',
  '/pb-fo/search-id-success': '아이디찾기',
  '/pb-fo/mpass-cert': 'MPASS 인증',
  '/pb-fo/google-cert': '구글 OTP 인증',
};

export function isSigninPage(path: string): boolean {
  return path === '/pb-fo/login';
}

export const PAGE_TITLE_BY_PATH: Record<string, string> = {
  '/pb-bo/signup': '회원가입',
  '/pb-bo/login': 'Welcome\nLearning-Way',
  '/pb-bo/success': '',
  '/pb-bo/progress-status-email': '진행현황',
  '/pb-bo/progress-status-cert': '진행현황',
  '/pb-bo/progress-status-admin': '관리자 권한 신청 진행현황',
  '/pb-bo/progress-status-admin-fail': '관리자 권한 신청 진행현황', // 반려
  '/pb-bo/progress-status-cp': 'CP 회원가입 신청 진행현황',
  '/pb-bo/search-account': '아이디 찾기',
  '/pb-bo/search-id-success': '아이디 찾기',
  '/pb-bo/search-account-pw': '비밀번호 찾기',
  '/pb-bo/password-modify': '비밀번호 변경',
  '/pb-bo/signup-step1': '관리자 회원가입',
  '/pb-bo/mpass-cert': 'MPASS 인증',
};

export function isSigninPage(path: string): boolean {
  return path === '/pb-bo/login';
}

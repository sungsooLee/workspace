export const PAGE_TITLE_BY_PATH: Record<string, string> = {
  '/signup': '회원가입',
  '/login': 'LEARNING WAY (시스템명)',
  '/success': '',
  '/progress-status': '진행현황',
  '/search-account': '아이디/비밀번호 찾기',
};

export function isSigninPage(path: string): boolean {
  return path === '/login';
}

interface PageMeta {
  title: string;
  info: string;
}

export const PAGE_META_BY_PATH: Record<string, PageMeta> = {
  '/pb-fo/login': {
    title: 'Welcome Back',
    info: 'Please enter your details to login.',
  },
  '/pb-fo/agreement_check': {
    title: '약관동의',
    info: '이용약관을 확인하고 동의해주세요.',
  },
  '/pb-fo/signup-step1': {
    title: '회원가입',
    info: '간단한 정보 입력만으로 시작할 수 있어요.',
  },
  '/pb-fo/signup-step2': {
    title: '회원가입',
    info: '추가 정보를 입력해주세요.',
  },
  '/pb-fo/signup-step3': {
    title: '회원가입',
    info: '가입을 마무리합니다.',
  },
  '/pb-fo/success': {
    title: '',
    info: '',
  },
  '/pb-fo/progress-status-email': {
    title: '회원가입 진행현황',
    info: '입력하신 이메일로 가입 진행 현황을 확인하세요.',
  },
  '/pb-fo/progress-status-cert': {
    title: '회원가입 진행현황',
    info: '인증 상태를 확인해주세요.',
  },
  '/pb-fo/progress-status-result': {
    title: '회원가입 진행현황',
    info: '가입 진행 결과를 확인하세요.',
  },
  '/pb-fo/search-account': {
    title: '아이디 / 비밀번호 찾기',
    info: '계정을 찾기 위한 정보를 입력해주세요.',
  },
  '/pb-fo/dormant-account': {
    title: '휴면 계정 해제',
    info: '본인인증 수단을 선택하세요.',
  },
  '/pb-fo/password-input': {
    title: '비밀번호 입력',
    info: '비밀번호를 입력해주세요.',
  },
  '/pb-fo/password-set': {
    title: '비밀번호 설정',
    info: '새 비밀번호를 설정하세요.',
  },
  '/pb-fo/password-modify': {
    title: '비밀번호 변경',
    info: '기존 비밀번호를 변경하세요.',
  },
  '/pb-fo/search-id-success': {
    title: '아이디찾기',
    info: '아이디를 찾았습니다.',
  },
  '/pb-fo/mpass-cert': {
    title: 'MPASS 인증',
    info: 'MPASS 인증을 진행합니다.',
  },
  '/pb-fo/google-cert': {
    title: '구글 OTP 인증',
    info: '구글 OTP 인증을 진행합니다.',
  },
  '/pb-fo/signup-step2-en': {
    title: 'Create An Account',
    info: 'Just a few more details to complete your account.',
  },
  '/pb-fo/signup-step3-en': {
    title: 'Create An Account',
    info: 'Finish your account setup.',
  },
  '/pb-fo/agreement-privacy': {
    title: '이용약관 및 개인정보 처리방침',
    info: '이용약관과 개인정보 처리방침을 확인해주세요.',
  },
  '/pb-fo/tenant-select': {
    title: '테넌트 선택',
    info: '입장하실 테넌트를 선택하세요',
  },
  '/pb-fo/dormant-info': {
    title: '휴면 계정 안내',
    info: '',
  },
};

export function isSigninPageInfo(path: string): boolean {
  return path === '/pb-fo/login';
}

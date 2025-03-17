// 퍼블리스트 데이터
// 완료시 completionDate 에 날짜를 기입해주세요. (ex.2024-12.31)

// layoutType: 반응형/적응형 구분
// screenName: 스크린 명
// pageId: 화면 경로(파일명) .tsx 생략
// screenId: 스크린아이디
// pageType: 페이지 타입 Page,Pop-up
// completionDate: 완료일
// lastUpdateDate: 수정일
// remarks: 비고

export const guideData = [
  {
    layoutType: '반응형 (PC)',
    screenName: '로그인',
    pageId: 'login',
    screenId: 'NLP_FO_LOG_1000', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-24', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '아이디/비밀번호찾기_아이디_휴대폰인증',
    pageId: 'search-account',
    screenId: 'NLP_FO_LOG_1001', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-24', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '아이디/비밀번호찾기_아이디_이메일인증',
    pageId: 'search-account',
    screenId: 'NLP_FO_LOG_1002', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-24', // 완료일
    lastUpdateDate: '',
    remarks: '- NLP_FO_LOG_1001에 포함\n- 케이스별 (주석처리)',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '아이디찾기_아이디찾기결과',
    pageId: 'search-id-success',
    screenId: 'NLP_FO_LOG_1003', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-26', // 완료일
    lastUpdateDate: '',
    remarks: '- 케이스별 (주석처리)',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '아이디/비밀번호찾기_비밀번호찾기_휴대폰인증',
    pageId: 'search-account',
    screenId: 'NLP_FO_LOG_1004', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-26', // 완료일
    lastUpdateDate: '',
    remarks: '- NLP_FO_LOG_1001에 포함\n- 케이스별 (주석처리)',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '아이디/비밀번호찾기_비밀번호찾기_이메일인증',
    pageId: 'search-account',
    screenId: 'NLP_FO_LOG_1005', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-26', // 완료일
    lastUpdateDate: '',
    remarks: '- NLP_FO_LOG_1001에 포함\n- 케이스별 (주석처리)',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '비밀번호찾기_비밀번호입력',
    pageId: 'password-input',
    screenId: 'NLP_FO_LOG_1006', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-28', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '비밀번호변경_180일',
    pageId: 'password-modify',
    screenId: 'NLP_FO_LOG_1007', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-28', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: 'MPASS 2차인증_OTP',
    pageId: 'mpass-cert',
    screenId: 'NLP_FO_LOG_1008', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-05', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: 'MPASS 2차인증_FIDO',
    pageId: 'mpass-cert',
    screenId: 'NLP_FO_LOG_1009', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-05', // 완료일
    lastUpdateDate: '',
    remarks: 'NLP_FO_LOG_1008에 포함\n- 케이스별 (주석처리)',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: 'MPASS 2차인증_FIDO 인증안내팝업',
    pageId: 'mpass-cert',
    screenId: 'NLP_FO_LOG_1010', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '2025-03-05', // 완료일
    lastUpdateDate: '',
    remarks: '- 버튼 클릭\n- mpass-popup.tsx',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증',
    pageId: 'google-cert',
    screenId: 'NLP_FO_LOG_1011', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-05', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증키 생성_QR 인증키생성팝업',
    pageId: 'google-cert',
    screenId: 'NLP_FO_LOG_1012', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '2025-03-05', // 완료일
    lastUpdateDate: '',
    remarks: '- 버튼 클릭\n- google-qrcode-popup.tsx',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증키 생성_인증키생성팝업',
    pageId: 'google-cert',
    screenId: 'NLP_FO_LOG_1013', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '2025-03-07', // 완료일
    lastUpdateDate: '',
    remarks: '- 페이지내 버튼 클릭\n- google-key-popup.tsx',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증_OTP번호입력팝업',
    pageId: 'google-cert',
    screenId: 'NLP_FO_LOG_1014', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '2025-03-07', // 완료일
    lastUpdateDate: '',
    remarks: '- 페이지내 버튼 클릭\n- google-input-popup.tsx',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증 가이드팝업',
    pageId: 'google-cert',
    screenId: 'NLP_FO_LOG_1015', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '2025-03-07', // 완료일
    lastUpdateDate: '',
    remarks: '- 페이지내 버튼 클릭\n- google-cert-guide-popup.tsx',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '문의하기',
    pageId: '',
    screenId: 'NLP_FO_LOG_1018', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '휴먼계정해제_휴대폰인증',
    pageId: 'dormant-account',
    screenId: 'NLP_FO_LOG_1018', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-12', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '휴먼계정해제_이메일인증',
    pageId: 'dormant-account',
    screenId: 'NLP_FO_LOG_1019', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-12', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '휴먼계정해제_비밀번호변경',
    pageId: 'password-input',
    screenId: 'NLP_FO_LOG_1020', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-12', // 완료일
    lastUpdateDate: '',
    remarks: '- 비밀변호 변경과 동일(타이틀 제외)',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '휴먼계정해제_해제결과',
    pageId: 'success',
    screenId: 'NLP_FO_LOG_1021', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-12', // 완료일
    lastUpdateDate: '',
    remarks: '- 가입신청완료와 동일',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '약관동의',
    pageId: 'agreement',
    screenId: 'NLP_FO_LOG_1022', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-14', // 완료일
    lastUpdateDate: '',
    remarks: '- 3월5일 신규 추가',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '신규 비밀번호 설정',
    pageId: 'password-set',
    screenId: 'NLP_FO_LOG_1023', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-14', // 완료일
    lastUpdateDate: '',
    remarks: '- 3월5일 신규 추가',
  },

  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입진행현황_이메일입력_KR',
    pageId: 'progress-status-email',
    screenId: 'NLP_FO_CPS_1000', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-13', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입진행현황_휴대폰인증_KR',
    pageId: 'progress-status-cert',
    screenId: 'NLP_FO_CPS_1001', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-13', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입진행현황_이메일인증_KR',
    pageId: 'progress-status-cert',
    screenId: 'NLP_FO_CPS_1002', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-13', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입진행현황_결과',
    pageId: 'progress-status-result',
    screenId: 'NLP_FO_CPS_1003', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-28', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입_유형선택',
    pageId: 'signup-step1',
    screenId: 'NLP_FO_MER_1000', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-24', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입_사업자정보조회',
    pageId: 'signup-step2',
    screenId: 'NLP_FO_MER_1001', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-24', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입_정보입력',
    pageId: 'signup-step3',
    screenId: 'NLP_FO_MER_1002', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-24', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '업무담당회사정보조회',
    pageId: '',
    screenId: 'NLP_FO_MER_1003', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '기획(피그마) 미정',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입_약관상세(공통)',
    pageId: '',
    screenId: 'NLP_FO_MER_1004', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '2025-03-14', // 완료일
    lastUpdateDate: '',
    remarks: '- 로그인 하단 footer 이용약관 버튼클릭\n- agreement-pop.tsx',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입_신청가입완료',
    pageId: 'success',
    screenId: 'NLP_FO_MER_1005', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-02-24', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '개인정보처리방침(회원가입시정보입력)',
    pageId: '',
    screenId: 'NLP_FO_MER_1007', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-14', // 완료일
    lastUpdateDate: '',
    remarks: '- 로그인 하단 footer 이용약관 버튼클릭\n- privacy-pop.tsx',
  },
  {
    layoutType: '적응형 (PC)',
    screenName: '카테고리_상세화면',
    pageId: 'category/detail',
    screenId: 'NLP_FO_CAT_1001', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-10', // 완료일
    lastUpdateDate: '',
    remarks: 'NLP_FO_CAT_1000 (레이어창 카테고리) 포함\nNLP_FO_CAT_1002 (필터 레이어팝업) 포함',
  },
  {
    layoutType: '적응형 (PC)',
    screenName: '통합검색결과_전체 TAB',
    pageId: 'integrated-search/integrated-search',
    screenId: 'NLP_FO_USE_1001', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
];

export default guideData;

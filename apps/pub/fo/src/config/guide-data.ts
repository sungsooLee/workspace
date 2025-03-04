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
    pageId: 'mpass_cert',
    screenId: 'NLP_FO_LOG_1008', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-05', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: 'MPASS 2차인증_FIDO',
    pageId: 'mpass_cert',
    screenId: 'NLP_FO_LOG_1009', //스크린아이디
    pageType: 'Page',
    completionDate: '2025-03-05', // 완료일
    lastUpdateDate: '',
    remarks: 'NLP_FO_LOG_1008에 포함\n- 케이스별 (주석처리)',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: 'MPASS 2차인증_FIDO 인증안내팝업',
    pageId: 'mpass_cert',
    screenId: 'NLP_FO_LOG_1010', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '2025-03-05', // 완료일
    lastUpdateDate: '',
    remarks: 'NLP_FO_LOG_1008에 포함\n- 버튼 클릭',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증',
    pageId: '',
    screenId: 'NLP_FO_LOG_1011', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증키 생성_QR 인증키생성팝업',
    pageId: '',
    screenId: 'NLP_FO_LOG_1012', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증키 생성_인증키생성팝업',
    pageId: '',
    screenId: 'NLP_FO_LOG_1013', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증키 생성_인증키생성팝업',
    pageId: '',
    screenId: 'NLP_FO_LOG_1013', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증_OTP번호입력팝업',
    pageId: '',
    screenId: 'NLP_FO_LOG_1014', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '구글 OTP인증 가이드팝업',
    pageId: '',
    screenId: 'NLP_FO_LOG_1015', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '이용약관_FOOTER',
    pageId: '',
    screenId: 'NLP_FO_LOG_1016', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '개인정보처리방침_FOOTER',
    pageId: '',
    screenId: 'NLP_FO_LOG_1017', //스크린아이디
    pageType: 'Pop-up',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
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
    pageId: '',
    screenId: 'NLP_FO_LOG_1018', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '휴먼계정해제_이메일인증',
    pageId: '',
    screenId: 'NLP_FO_LOG_1019', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '휴먼계정해제_비밀번호변경',
    pageId: '',
    screenId: 'NLP_FO_LOG_1020', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '휴먼계정해제_해제결과',
    pageId: '',
    screenId: 'NLP_FO_LOG_1021', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },

  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입진행현황_이메일입력_KR',
    pageId: 'progress-status',
    screenId: 'NLP_FO_CPS_1000', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입진행현황_휴대폰인증_KR',
    pageId: '',
    screenId: 'NLP_FO_CPS_1001', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입진행현황_이메일인증_KR',
    pageId: '',
    screenId: 'NLP_FO_CPS_1002', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입진행현황_결과',
    pageId: 'progress-status',
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
    remarks: '',
  },
  {
    layoutType: '반응형 (PC)',
    screenName: '회원가입_약관상세(공통)',
    pageId: '',
    screenId: 'NLP_FO_MER_1004', //스크린아이디
    pageType: 'Page',
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
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
    completionDate: '', // 완료일
    lastUpdateDate: '',
    remarks: '',
  },
];

export default guideData;

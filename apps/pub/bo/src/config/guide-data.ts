// 퍼블리스트 데이터
// 완료시 completionDate 에 날짜를 기입해주세요. (ex.2024-12.31)

// screenName: 스크린 명
// pageId: 화면 경로(파일명) .tsx 생략
// screenId: 스크린아이디
// pageType: 페이지 타입 Page,Pop-up
// completionDate: 완료일
// lastUpdateDate: 수정일
// remarks: 비고
export const guideData = [
  {
    screenName: '로그인',
    pageId: 'login',
    screenId: 'NLP_BO_LOG_1000',
    pageType: 'Page',
    completionDate: '2025-02-26',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '로그인/비밀번호 변경',
    pageId: 'password-change',
    screenId: 'NLP_BO_LOG_1000_02',
    pageType: 'Page',
    completionDate: '2025-02-26',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '로그인/아이디 찾기',
    pageId: 'search-account',
    screenId: 'NLP_BO_LOG_1008',
    pageType: 'Page',
    completionDate: '2025-02-26',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '로그인/비밀번호 찾기',
    pageId: 'search-account-pw',
    screenId: 'NLP_BO_LOG_1013',
    pageType: 'Page',
    completionDate: '2025-02-26',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },

  {
    screenName: '로그인/진행 현황 확인',
    pageId: 'progress-status',
    screenId: 'NLP_BO_LOG_1001',
    pageType: 'Page',
    completionDate: '2025-02-26',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '로그인/본인인증(휴대폰/이메일 인증)',
    pageId: 'progress-status-certify',
    screenId: 'NLP_BO_LOG_1014',
    pageType: 'Page',
    completionDate: '2025-02-26',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '로그인/관리자 권한 신청 결과',
    pageId: 'progress-status-admin',
    screenId: 'NLP_BO_LOG_1001_02',
    pageType: 'Page',
    completionDate: '2025-02-26',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '로그인/CP사 회원가입 결과',
    pageId: 'progress-status-cp',
    screenId: 'NLP_BO_LOG_1001_03',
    pageType: 'Page',
    completionDate: '2025-02-26',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '로그인/회원유형선택(관리자 회원가입)',
    pageId: 'signup-step1',
    screenId: '',
    pageType: 'Page',
    completionDate: '2025-03-05',
    lastUpdateDate: '',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '로그인/MPASS 인증',
    pageId: 'mpass-cert',
    screenId: 'NLP_BO_LOG_1018',
    pageType: 'Page',
    completionDate: '2025-03-06',
    lastUpdateDate: '',
    remarks: '작업완료', // 비고
  },
  {
    screenName: 'CMS/학습유형선택',
    pageId: 'learning/popup-learningRegisteration',
    screenId: '',
    pageType: 'Pop-up',
    completionDate: '2025-03-06',
    lastUpdateDate: '',
    remarks: '완료(아이콘 추후 적용 예정)', // 비고
  },
  {
    screenName: 'CMS/파일업로드',
    pageId: 'learning/popup-upload',
    screenId: '',
    pageType: 'Pop-up',
    completionDate: '2025-03-06',
    lastUpdateDate: '',
    remarks: '완료(아이콘 추후 적용 예정)', // 비고
  },
  {
    screenName: 'CMS/학습자원등록 동영상 등록',
    pageId: 'learning/mediaRegister',
    screenId: '',
    pageType: 'Page',
    completionDate: '2025-03-06',
    lastUpdateDate: '',
    remarks: '완료', // 비고
  },
  // {
  //   screenName: 'CMS/학습자원 조회상세(동영상)',
  //   pageId: 'learning/mediaDetail',
  //   screenId: '',
  //   pageType: 'Page',
  //   completionDate: '',
  //   lastUpdateDate: '',
  //   remarks: '진행중', // 비고
  // },
  {
    screenName: 'CMS/학습자원조회',
    pageId: 'learning/learningSearch',
    screenId: '',
    pageType: 'Page',
    completionDate: '',
    lastUpdateDate: '',
    remarks: '진행중', // 비고
  },
];

export default guideData;

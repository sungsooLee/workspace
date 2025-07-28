export enum ExternalEducationTab {
  BASIC_INFO = 'basic-info',
  APPLICATION_ITEMS = 'application-items',
  RESULT_ITEMS = 'result-items',
  POPUP = 'popup',
}

export const EXTERNAL_EDUCATION_TAB_LABELS: Record<ExternalEducationTab, string> = {
  [ExternalEducationTab.BASIC_INFO]: '기본정보',
  [ExternalEducationTab.APPLICATION_ITEMS]: '신청항목',
  [ExternalEducationTab.RESULT_ITEMS]: '결과항목',
  [ExternalEducationTab.POPUP]: '팝업',
};

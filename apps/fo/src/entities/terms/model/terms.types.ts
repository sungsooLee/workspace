export type TermsType =
  | 'TERMS_OF_SERVICE' // 이용약관
  | 'PRIVACY_POLICY' // 개인정보처리방침
  | 'SENSITIVE_PERSONAL_INFO' // 민감개인정보수집동의
  | 'PERSONAL_INFO_COLLECTION'; // 개인정보수집동의

export interface Terms {
  termsId: number;
  translation: {
    locale: string;
    termsName: string;
    termsContents: string;
    termsIdNotice: string;
  };
}

export interface TermsVersion {
  termsId: number;
  termsVersion: string;
}

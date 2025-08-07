export type TermsType =
  | 'terms-of-service' // 이용약관
  | 'privacy-policy' // 개인정보처리방침
  | 'sensitive-personal-info' // 민감개인정보수집동의
  | 'personal-info-collection'; // 개인정보수집동의

export enum TermsTypeCode {
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  SENSITIVE_PERSONAL_INFO = 'SENSITIVE_PERSONAL_INFO',
  PERSONAL_INFO_COLLECTION = 'PERSONAL_INFO_COLLECTION',
}

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

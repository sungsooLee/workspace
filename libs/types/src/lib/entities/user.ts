import { Company } from './company';
import { CompanyDept } from './companyDept';

export interface UserState {
  /**
   * 회원상태코드
   */
  WAIT: 'WAIT';
  NORMAL: 'NORMAL';
  HALT: 'HALT';
  LEAVE: 'LEAVE';
  DELETE: 'DELETE';
}

export type User = {
  /**
   * UUID
   */
  uuid?: string;
  /**
   * 사번
   */
  employeeNumber?: string;
  /**
   * 성명
   */
  name?: string;
  /**
   * 영문성명
   */
  engName?: string;
  /**
   * 생년월일
   */
  birthday?: string;
  /**
   * Email
   */
  email?: string;
  /**
   * 회사 전화번호
   */
  companyTelephoneNumber?: string;
  /**
   * 휴대전화번호
   */
  phoneNumber?: string;
  /**
   * 회원상태코드
   */
  userState?: UserState;
  /**
   * 회원기본언어셋코드
   */
  locale?: {
    language?: string;
    script?: string;
    variant?: string;
    displayName?: string;
    country?: string;
    unicodeLocaleAttributes?: Array<string>;
    unicodeLocaleKeys?: Array<string>;
    displayLanguage?: string;
    displayScript?: string;
    displayCountry?: string;
    displayVariant?: string;
    extensionKeys?: Array<string>;
    iso3Language?: string;
    iso3Country?: string;
  };
  /**
   * 최종로그인일시
   */
  lastLoginDate?: string;
  /**
   * 로그인실패횟수
   */
  loginFailCount?: number;
  company?: Company;
  dept?: CompanyDept;
  /**
   * 사용자구분
   */
  accountType?: string;
  /**
   * 근무지코드
   */
  workPlaceCode?: string;
  /**
   * 등록자ID
   */
  createdBy?: string;
  /**
   * 등록일시
   */
  createdDate?: string;
  /**
   * 최종수정자ID
   */
  lastModifiedBy?: string;
  /**
   * 최종수정일시
   */
  modifiedDate?: string;
};

/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 회사로그인제한 설정정보
 */
export type CompanyLoginRestrictionDetail = {
  /**
   * 회사로그인제한정보 ID
   */
  companyLoginRestrictionId?: number;
  /**
   * 회사 ID
   */
  companyId?: number;
  /**
   * 회사로그인제한 설정정보 ID
   */
  companyLoginRestrictionDetailId?: number;
  /**
   * 요일
   */
  dayOfWeekType?: CompanyLoginRestrictionDetail.dayOfWeekType;
  startTime?: string;
  endTime?: string;
  /**
   * 사용여부
   */
  isUsed?: boolean;
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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CompanyLoginRestrictionDetail {
  /**
   * 요일
   */
  export enum dayOfWeekType {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
  }
}

/**
 * 로그인 제한 정보
 */
export type CompanyLoginRestriction = {
  /**
   * 회사ID
   */
  companyId?: number;
  /**
   * 회사로그인제한정보 ID
   */
  companyLoginRestrictionId?: number;
  /**
   * 로그인 제한명
   */
  loginRestrictionName?: string;
  /**
   * 로그인 제한 구분
   */
  loginRestrictionType?: CompanyLoginRestriction.loginRestrictionType;
  /**
   * 로그인 제한 설정 방식
   */
  loginRestrictionSettingType?: CompanyLoginRestriction.loginRestrictionSettingType;
  /**
   * 제한시작일(yyyyMMdd)
   */
  restrictionStartDate?: string;
  /**
   * 제한종료일(yyyyMMdd)
   */
  restrictionEndDate?: string;
  /**
   * 사용여부
   */
  isUsed?: boolean;
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
  /**
   * 회사로그인제한 설정정보
   */
  companyLoginRestrictionDetailList?: Array<CompanyLoginRestrictionDetail>;
};

export namespace CompanyLoginRestriction {
  /**
   * 로그인 제한 구분
   */
  export enum loginRestrictionType {
    LOGIN_TIME_RESTRICTION = 'LOGIN_TIME_RESTRICTION',
    WORK_TIME_RESTRICTION = 'WORK_TIME_RESTRICTION',
    NONE = 'NONE',
  }
  /**
   * 로그인 제한 설정 방식
   */
  export enum loginRestrictionSettingType {
    TIME_SETTING = 'TIME_SETTING',
    HR_INFO_SETTING = 'HR_INFO_SETTING',
  }
}

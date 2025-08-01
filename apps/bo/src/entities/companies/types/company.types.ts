/**
 * 회사 목록 조회 요청
 */
export interface CompanyListParams {
  page?: number;
  size?: number;
  sort?: string[];
  tenantId?: number;
  isUseLinkageSystem?: string;
  companyCode?: string;
  name?: string;
  isUsed?: boolean;
  managerName?: string;
  companyType?: CompanyType;
  regStartDate?: string;
  regEndDate?: string;
  modifyStartDate?: string;
  modifyEndDate?: string;
}

/**
 * 회사 코드 중복 체크 요청
 */
export interface CompanyCodeExistParams {
  companyCode: string;
  companyId?: number;
}

/**
 * 회사 정보 응답
 */
export interface CompanyResponse extends CompanyCreateRequest {
  /**
   * 회사 ID
   */
  companyId: number;
  /**
   * 연동시스템 사용여부
   */
  isUseLinkageSystem: boolean;
  /**
   * 연동시스템 유형
   */
  linkageType: LinkageType;
  /**
   * 삭제여부
   */
  isDeleted: boolean;
  /**
   * 등록자 ID
   */
  createdBy: string;
  /**
   * 등록일시
   */
  createdDate: string;
  /**
   * 최종수정자 ID
   */
  lastModifiedBy: string;
  /**
   * 최종수정일시
   */
  modifiedDate: string;
}

/**
 * 회사 생성/수정 요청
 */
export interface CompanyCreateRequest {
  /**
   * 회사코드
   */
  companyCode: string;
  /**
   * 회사유형
   */
  companyType: CompanyType;
  /**
   * 회사명
   */
  name: string;
  /**
   * 회사영문명
   */
  engName: string;
  /**
   * 사업자등록번호
   */
  brn: string;
  /**
   * 법인 약어
   */
  abbreviationName: string;
  /**
   * 대표자명
   */
  rpsntrName: string;

  /**
   * 대표 전화번호 국가코드
   */
  companyTelNoCountryCode: string;
  /**
   * 대표 전화번호
   */
  companyTelNo: string;
  /**
   * 대표 팩스번호 국가코드
   */
  companyFaxNoCountryCode: string;
  /**
   * 대표 팩스번호
   */
  companyFaxNo: string;
  /**
   * 대표 이메일
   */
  companyEmail: string;
  /**
   * 기본주소
   */
  basicAddress: string;
  /**
   * 상세주소
   */
  detailAddress: string;
  /**
   * 우편번호
   */
  postNo: string;
  /**
   * 인사 데이터 수동 관리 유형
   */
  hrInfoManageType: HrInfoManageType;
  /**
   * 회원 가입 유형
   */
  companyMemberJoinTypeList: CompanyMemberJoinType[];
  /**
   * 연동시스템
   */
  linkageSystem: LinkageSystem;
  /**
   * 서비스 타입
   */
  serviceTypeList: PlatformServiceType[];
  /**
   * 비용결제용 법인코드
   */
  paymentCompanyCode?: string;
  /**
   * SSO 사용여부
   */
  isUseSso: boolean;
  /**
   * 서비스유형타입(SSO 로그인 유형)
   */
  ssoTypeList: SsoType[];
  /**
   * 비밀번호 인증유형
   */
  passwordAuthType: PasswordAuthType;
  /**
   * 2차 인증 사용여부
   */
  isUseTwoFactorAuth: boolean;
  /**
   * 2차인증 플랫폼유형
   */
  twoFactorAuthPlatformTypeList: TwoFactorAuthPlatformType[];
  /**
   * 2차 인증 유형
   */
  twoFactorAuthType: TwoFactorAuthType;
  /**
   * 워터마크 사용여부
   */
  isUseWatermark: boolean;
  /**
   * 워터마크 문구
   */
  watermarkText: string;
  /**
   * 워터마크 위치
   */
  watermarkPosition: WatermarkPosition;
  /**
   * 플레이어 재생바 제어 제한 사용여부
   */
  isPlayerControlLimit: boolean;
  /**
   * 플레이어 재생바 제어 제한 유형
   */
  playerControlLimitType: SettingBasisType;
  /**
   * 동영상 배속 제한 사용여부
   */
  isPlayBackRateLimit: boolean;
  /**
   * 플레이어 재생바 제어 제한 유형
   */
  playBackRateLimitType: SettingBasisType;
  /**
   * 학습창 캡처 방지 사용여부
   */
  isCaptureBlockType: boolean;
  /**
   * 학습창 캡처 방지 유형
   */
  captureBlockType: SettingBasisType;
  /**
   * 이러닝 집중 모드 유형
   */
  focusModeType: SettingBasisType;
  /**
   * IP 접근 제한 설정(FO)
   */
  ipAccessControlTypeFo: IpAccessControlType;
  /**
   * IP 접근 제한 설정(BO)
   */
  ipAccessControlTypeBo: IpAccessControlType;
  /**
   * 담당부서
   */
  managerDept: string;
  /**
   * 담당자 직위/직책
   */
  managerPosition: string;
  /**
   * 담당자 이름
   */
  managerName: string;
  /**
   * 담당자 이메일
   */
  managerEmail: string;
  /**
   * 회사담당자사무실전화번호 국가번호
   */
  managerOfficeTelCountryCode: string;
  /**
   * 회사담당자사무실 전화번호
   */
  managerOfficeTel: string;
  /**
   * 회사담당자전화번호 국가번호
   */
  managerPhoneCountryCode: string;
  /**
   * 회사담당자 전화번호
   */
  managerPhone: string;
  /**
   * 로그인 제한 정보
   */
  companyLoginRestrictionList?: CompanyLoginRestriction[];
  /**
   * 사용여부
   */
  isUsed: boolean;
}

/**
 * 로그인 제한 정보
 */
export interface CompanyLoginRestriction {
  /**
   * 회사 ID
   */
  companyId?: number;
  /**
   * 회사로그인제한정보 ID
   */
  companyLoginRestrictionId?: number;
  /**
   * 로그인 제한명
   */
  loginRestrictionName: string;
  /**
   * 로그인 제한 구분
   */
  loginRestrictionType: LoginRestrictionType;
  /**
   * 로그인 제한 설정 방식
   */
  loginRestrictionSettingType: LoginRestrictionSettingType;
  /**
   * 제한시작일 (yyyyMMdd)
   */
  restrictionStartDate: string;
  /**
   * 제한종료일 (yyyyMMdd)
   */
  restrictionEndDate: string;
  /**
   * 사용여부
   */
  isUsed: boolean;
  /**
   * 등록자ID
   */
  createdBy?: string;
  /**
   * 등록일시
   */
  createdDate?: string;
  /**
   * 최종수정자 ID
   */
  lastModifiedBy?: string;
  /**
   * 최종수정일시
   */
  modifiedDate?: string;
  /**
   * 회사 로그인 제한 설정 정보
   */
  companyLoginRestrictionDetailList: CompanyLoginRestrictionDetail[];
  /**
   * 회사 로그인 제한 유저그룹
   */
  companyLoginRestrictionWhiteUserGroupList: WhiteUserGroup[];
}

/**
 * 회사 로그인 제한 설정 정보
 */
export interface CompanyLoginRestrictionDetail {
  /**
   * 회사 로그인 제한 정보 ID
   */
  companyLoginRestrictionId?: number;
  /**
   * 회사 ID
   */
  companyId?: number;
  /**
   * 회사 로그인 제한 설정정보 ID
   */
  companyLoginRestrictionDetailId?: number;
  /**
   * 요일
   */
  dayOfWeekType: DayOfWeekType;
  /**
   * 시작시간 (HH:MM:SS)
   */
  startTime: string;
  /**
   * 종료시간 (HH:MM:SS)
   */
  endTime: string;
  /**
   * 사용여부
   */
  isUsed: boolean;
}

/**
 * 화이트리스트 제한 유저그룹
 */
export interface WhiteUserGroup {
  /**
   * 그룹 ID
   */
  groupId?: number;
  /**
   * 경로 키
   */
  pathKey: string;
  /**
   * 경로 이름
   */
  pathValue: string;
  /**
   * 유저 그룹 조합
   */
  combiners: BlackAndWhiteCombiner[];
}

/**
 * 블랙화이트 조합기
 */
export interface BlackAndWhiteCombiner {
  /**
   * 조합 종류 타입
   */
  combineType: CombineType;
  /**
   * 조합 넘버
   */
  combineValue: number;
  /**
   * 조합 타입별 넘버 이름
   */
  combineName: string;
}

/**
 * 회사 유형
 */
export enum CompanyType {
  CAR = 'CAR',
  GLOBAL = 'GLOBAL',
  GROUP = 'GROUP',
  SERVICE = 'SERVICE',
  SALES = 'SALES',
  GLOBAL_DEALER = 'GLOBAL_DEALER',
  ETC_SERVICE = 'ETC_SERVICE',
  HELLO_HMG = 'HELLO_HMG',
  EDU_SERVICE = 'EDU_SERVICE',
  ETC = 'ETC',
}

/**
 * 인사 데이터 수동 관리 유형
 */
export enum HrInfoManageType {
  MANUAL_MANAGE = 'MANUAL_MANAGE',
  AUTO_MANAGE = 'AUTO_MANAGE',
}

/**
 * 회원 가입 유형
 */
export enum CompanyMemberJoinType {
  FO_JOIN_DEALER = 'FO_JOIN_DEALER',
  FO_JOIN_NORMAL = 'FO_JOIN_NORMAL',
  FO_JOIN_PARTNER = 'FO_JOIN_PARTNER',
  BO_JOIN_MANAGER = 'BO_JOIN_MANAGER',
}

/**
 * 연동시스템 유형
 */
export enum LinkageType {
  INTERFACE = 'INTERFACE',
  FTP = 'FTP',
}

/**
 * 연동시스템
 */
export enum LinkageSystem {
  GIM = 'GIM',
  HSW = 'HSW',
  KSW = 'KSW',
  DMSSH = 'DMSSH',
  DMSSK = 'DMSSK',
  DDMSH = 'DDMSH',
  DDMSK = 'DDMSK',
  VAATZ = 'VAATZ',
  GETIS = 'GETIS',
}

/**
 * 서비스 타입
 */
export enum PlatformServiceType {
  BASIC = 'BASIC',
  CORE = 'CORE',
  ENTERPRISE = 'ENTERPRISE',
  CONSIGNMENT = 'CONSIGNMENT',
  FREE_CHARGE = 'FREE_CHARGE',
}

/**
 * SSO 로그인 유형
 */
export enum SsoType {
  HMG_SSO = 'HMG_SSO',
  AUTOWAY = 'AUTOWAY',
  AES_Link = 'AES_Link',
}

/**
 * 비밀번호 인증유형
 */
export enum PasswordAuthType {
  PLATFORM = 'PLATFORM',
  HMG_SSO = 'HMG_SSO',
  AUTOWAY = 'AUTOWAY',
  DENIED_PASSWORD = 'DENIED_PASSWORD',
}

/**
 * 2차인증 플랫폼유형
 */
export enum TwoFactorAuthPlatformType {
  FO_PLATFORM = 'FO_PLATFORM',
  BO_PLATFORM = 'BO_PLATFORM',
}

/**
 * 2차 인증 유형
 */
export enum TwoFactorAuthType {
  MPASS = 'MPASS',
  MPASS_OTP = 'MPASS_OTP',
  MPASS_FIDO = 'MPASS_FIDO',
  GOOGLE_OTP = 'GOOGLE_OTP',
}

/**
 * 워터마크 위치
 */
export enum WatermarkPosition {
  TOP_LEFT = 'TOP_LEFT',
  TOP_CENTER = 'TOP_CENTER',
  TOP_RIGHT = 'TOP_RIGHT',
  MIDDLE_LEFT = 'MIDDLE_LEFT',
  MIDDLE_CENTER = 'MIDDLE_CENTER',
  MIDDLE_RIGHT = 'MIDDLE_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_CENTER = 'BOTTOM_CENTER',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export enum SettingBasisType {
  BASIS_COMPANY = 'BASIS_COMPANY',
  BASIS_COURSE = 'BASIS_COURSE',
  NONE = 'NONE',
}

export enum IpAccessControlType {
  ACCESS_IN_SIDE = 'ACCESS_IN_SIDE',
  ACCESS_OUT_SIDE = 'ACCESS_OUT_SIDE',
  ACCESS_ALL = 'ACCESS_ALL',
}

/**
 * 로그인 제한 구분
 */
export enum LoginRestrictionType {
  LOGIN_TIME_RESTRICTION = 'LOGIN_TIME_RESTRICTION',
  WORK_TIME_RESTRICTION = 'WORK_TIME_RESTRICTION',
  NONE = 'NONE',
}

/**
 * 로그인 제한 설정 방식
 */
export enum LoginRestrictionSettingType {
  TIME_SETTING = 'TIME_SETTING',
  HR_INFO_SETTING = 'HR_INFO_SETTING',
}

/**
 * 요일
 */
export enum DayOfWeekType {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

/**
 * 유저그룹 조합 종류 타입
 */
export enum CombineType {
  USER_GROUP = 'USER_GROUP',
}

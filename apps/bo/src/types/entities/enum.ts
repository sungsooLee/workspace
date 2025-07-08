export enum EnFormMode {
  NONE = 'NONE',
  VIEW = 'VIEW',
  ADD = 'ADD',
  EMPTY = 'EMPTY',
}
export enum EnTenantScope {
  ALL = 'ALL',
  CURRENT_TENANT = 'CURRENT_TENANT',
}
export enum EnCompanyScope {
  ALL = 'ALL',
  CURRENT_COMPANY = 'CURRENT_COMPANY',
  MANUAL = 'MANUAL',
}
export enum EnChannelScope {
  ALL = 'ALL',
  CURRENT_TENANT_CHANNEL = 'CURRENT_TENANT_CHANNEL',
  CURRENT_CHANNEL_INCLUSIVE = 'CURRENT_CHANNEL_INCLUSIVE',
  MANUAL = 'MANUAL',
}
export enum EnDeptScope {
  ALL = 'ALL',
  CURRENT_TEAM = 'CURRENT_TEAM',
  CURRENT_TEAM_INCLUSIVE = 'CURRENT_TEAM_INCLUSIVE',
  MANUAL = 'MANUAL',
}

export enum EnDeviceType {
  isPc = 'isPc',
  isMobile = 'isMobile',
  isApp = 'isApp',
}

export enum EnUseCategory {
  isCommonCategory = 'isCommonCategory',
  isTenantCategory = 'isTenantCategory',
}

export enum EnTenantDetailTabKey {
  base = 'base',
  attribute = 'attribute',
  menu = 'menu',
  category = 'category',
  learningRole = 'learningRole',
  widget = 'widget',
  banner = 'banner',
  theme = 'theme',
}

export enum EnUserState {
  WAIT = 'WAIT',
  NORMAL = 'NORMAL',
  HALT = 'HALT',
  LEAVE = 'LEAVE',
  DELETE = 'DELETE',
}

// 회사 HR 연동 유형
export enum EnUserGroupType {
  ORGANIZATION = 'ORGANIZATION', // 조직
  JOB_GROUP = 'JOB_GROUP', // 직군
  JOB = 'JOB', // 직무
  JOB_TITLE = 'JOB_TITLE', // 호칭
  JOB_POSITION = 'JOB_POSITION', // 보직
  CUSTOM_GROUP = 'CUSTOM_GROUP', // 사용자 정의
}

//Tree Event Position
export enum EnTreeEventPosition {
  BEFORE = 'BEFORE',
  INSIDE = 'INSIDE',
  AFTER = 'AFTER',
}

export enum EnGlobalConst {
  SYSTEM_COMMON_CODE = 'SYSTEM_COMMON_CODE',
  LEARNER_MENU = 'LEARNER_MENU',
  HRD_CENTER_MENU = 'HRD_CENTER_MENU',
}

// 공통 컴포넌트의 페이지/모달에서의 사용 여부
export enum EnPageMode {
  PAGE = 'PAGE',
  MODAL = 'MODAL',
}

/**
 * 이메일 확인용 regex
 */
export const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

/**
 * UploadedFileStatus
 */
export enum FileStatus {
  TEMPORARY_SAVE = 'TEMPORARY_SAVE',
  COMPLETE = 'COMPLETE',
  ONGOING = 'ONGOING',
  FAIL = 'FAIL',
}

/**
 * UploadedFileType
 */
export enum FileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOC = 'DOC',
  TXT = 'TXT',
  WEB = 'WEB',
  ZIP = 'ZIP',
  ETC = 'ETC',
}

/**
 * UploadedFileProcessingStatus
 */
export enum ProcessingStatus {
  NONE = 'NONE',
  FAIL = 'FAIL',
  COMPLETE = 'COMPLETE',
  STARTED = 'STARTED',
  ENCODING = 'ENCODING',
  UPLOADING = 'UPLOADING',
}

/**
 * ContentStatusCode
 * 콘텐츠 상태 코드
 * Enum(ContentStatusCode)
 */
export enum ContentStatusCode {
  TEMPORARY_SAVE = 'TEMPORARY_SAVE',
  SAVED = 'SAVED',
  DELETED = 'DELETED',
}

/**
 * ContentCreateType
 * 콘텐츠 생성 유형
 */
export enum ContentCreateType {
  MANUAL = 'MANUAL',
  TRASLATE = 'TRASLATE',
  SHARED = 'SHARED',
}

/**
 * ContentAddInfoType
 * Enum(ContentAddInfoType)
 */
export enum ContentAddInfoType {
  VIDEO_ADD_INFO = 'VIDEO_ADD_INFO', // 초
  EXAM_ADD_INFO = 'EXAM_ADD_INFO', // 건수
}

/**
 * ContentType
 * 콘텐츠 분류 코드
 * Enum(ContentType)
 */
export enum ContentType {
  VIDEO = 'VIDEO',
  EXAM = 'EXAM',
  SURVEY = 'SURVEY',
  ASSIGNMENT = 'ASSIGNMENT',
  HTML5 = 'HTML5',
  YOUTUBE = 'YOUTUBE',
  BLOG = 'BLOG',
  SCORM = 'SCORM',
  DEFAULT = 'DEFAULT',
}

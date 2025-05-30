export enum EnFormMode {
  NONE = 'NONE',
  VIEW = 'VIEW',
  ADD = 'ADD',
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
  CURRENT_COMPANY = 'CURRENT_COMPANY',
  CURRENT_COMPANY_INCLUSIVE = 'CURRENT_COMPANY_INCLUSIVE',
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
export enum EnCompanyHrLinkType {
  ORGANIZATION = 'ORGANIZATION', // 조직
  GROUP = 'GROUP', // 직군
  ROLE = 'ROLE', // 직무
  DESIGNATION = 'DESIGNATION', // 호칭
  POSITION = 'POSITION', // 보직
}

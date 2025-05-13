/**
 * 역할 정보
 */
export interface Role {
  roleUuid?: string;
  roleName: string;
  roleDesc?: string;
  parentRoleUuid?: string;
  isUsed: boolean;
  sortSeq?: number;
  children?: Role[];
}

/**
 * 역할-메뉴 매핑 정보
 */
export interface RoleMenu {
  roleUuid: string;
  menuUuid: string;
}

/**
 * 역할-API 매핑 정보
 */
export interface RoleAPI {
  roleUuid: string;
  apiUuid: string;
}

/**
 * API 정보
 */
export interface API {
  apiId: string;
  apiName: string;
  apiPath: string;
  apiMethod: string;
  apiDesc?: string;
}

/**
 * 모달에 전달할 파라미터 타입
 */
export interface RoleModalParams {
  mode: 'create' | 'update';
  parentRole?: Role;
  role?: Role;
  onSuccess?: () => void;
}

/**
 * 메뉴 선택 타입
 */
export type MenuSelectionType = 'all' | 'custom';

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

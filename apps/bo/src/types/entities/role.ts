/**
 * 역할 정보
 */
export interface Role {
  roleId?: string;
  roleCode?: string;
  roleName: string;
  roleDesc?: string;
  roleType: string;
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

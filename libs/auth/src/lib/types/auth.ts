export interface AuthUser {
  userId: number;
  uuid: string;
  employeeNumber: string;
  name: string;
  birthday: number;
  companyId: number;
  companyCode: string;
  email: string;
  phoneNumber: string;
  locale: string;
  passwordChangeDate: string;
  passwordExpireDate: string;
  stateCode: string;
  tenants: Tenant[];
  roles: Role[];
  enabled: boolean;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  // fe custom spec
  activeTenant?: Tenant;
  activeRole?: Role;
  mainTenantId?: number;
  menus?: any;
  avataImage?: string;
  latestLoginDatetime?: Date;
  phoneNumberNationCode?: string;

  lastVisitedBoRoleId: number | null;
  lastVisitedBoTenantId: number | null;
  lastVisitedFoRoleId: number | null;
  lastVisitedFoTenantId: number | null;
  myRoles?: RoleInfo[]; // 나의 역할 목록 조회 결과
}

export interface AuthSSOHealthcheck {
  clientId: string;
  redirectUri: string;
  state: string;
}

export interface AuthSSOLogin {
  state: string;
  authorizationCode: string;
  timezone: string;
}

export interface Tenant {
  tenantId: number;
  tenantName: string;
  logoImageUrl?: string;
}
export interface Role {
  roleId: number;
  roleName: string;
  tenantId: number;
}

export type AUTH_TOOL_TYPE = 'PHONE' | 'EMAIL';
export type MEMBER_TYPE = 'GENERAL' | 'HTA';

export interface AuthUserInfo {
  userId: number;
  uuid: string;
  employeeNumber: string;
  name: string;
  birthday: number;
  companyId: number;
  companyCode: string;
}

export interface RoleInfo {
  /** 역할 ID */
  roleId: number;
  /** 사이트 구분 */
  siteScope: string;
  /** 역할 타입 */
  roleType: string;
  /** 부모 역할 ID */
  parentRoleId: number;
  /** 역할 트리 순서 */
  sortOrder: number;
  /** 이름 */
  name: string;
  /** 설명 */
  description: string;
  /** 테넌트 적용 범위 */
  tenantScope: string;
  /** 테넌트 ID */
  tenantId: number;
  /** 테넌트명 */
  tenantName: string;
  /** 회사 적용 범위 */
  companyScope: string;
  /** 회사 목록 */
  companies: [
    {
      id: number;
      name: string;
    },
  ];
  /** 채널 적용 범위 */
  channelScope: string;
  /** 채널 목록 */
  channels: [
    {
      uuid: string;
      name: string;
    },
  ];
  /** 팀 적용 범위 */
  deptScope: string;
  /** 팀 목록 */
  depts: [
    {
      id: number;
      name: string;
    },
  ];
  /** 사용여부 */
  isUsed: boolean;
  /** 등록자ID */
  createdBy: string;
  /** 등록일시 */
  createdDate: string;
  /** 최종수정자ID */
  lastModifiedBy: string;
  /** 최종수정일시 */
  modifiedDate: string;
}

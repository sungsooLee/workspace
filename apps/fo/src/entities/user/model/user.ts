export interface User {
  accountId: string;
  userName: string;
  email: string;
  userStateCode: string;
  roles: Role[];
  tenants: Tenant[];
  orgId: number;
  orgName: string;
  jobRoleNo: any;
  jobRoleName: any;
  userEngName: any;
  userLanguageSetCode: string;
}

export interface Role {
  roleId: string;
  roleName: string;
}

export interface Tenant {
  tenantId: number;
}

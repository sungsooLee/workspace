export type UserGroupType =
  | 'ORGANIZATION'
  | 'JOB_GROUP'
  | 'JOB'
  | 'JOB_TITLE'
  | 'JOB_POSITION'
  | 'CUSTOM_GROUP';

export interface UserGroupsResponse {
  userGroupId: number;
  userGroupName: string;
  userGroupSubName: string;
  tenantName: string;
  companyName: string;
  fullName: string;
  userCount: number;
  userUuids: string[];
}

export interface OrganizationTreeResponse {
  id: number;
  name: string;
  type: string;
  fullName: string;
  children: OrganizationTreeResponse[];
}

export interface UserGroupsParam {
  userGroupType: UserGroupType;
  userGroupName?: string;
}

export interface UsersByIdsParam {
  companyName: string;
  deptName: string;
  employeeNumber: string;
  name: string;
  accountStatus: string;
}

export interface BlackwhiteUsersParam {
  groups?: CombineUserGroup[];
  userGroupType?: UserGroupType;
  companyId?: string;
  companyCode?: string;
  deptName?: string;
  employeeNumber?: string;
  userName?: string;
}

type CombineType = 'USER_GROUP';

type Combiner = {
  combineType: CombineType;
  combineValue: number;
  combineName: string;
};

export type CombineUserGroup = {
  key: string; // fe
  keys?: string[]; // fe
  id?: number; // fe
  ids?: number[]; // fe
  fullName: string; // fe
  combiners: Combiner[];
};

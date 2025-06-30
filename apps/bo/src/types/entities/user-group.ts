export type UserGroupType =
  | 'ORGANIZATION'
  | 'JOB_GROUP'
  | 'JOB'
  | 'JOB_TITLE'
  | 'JOB_POSITION'
  | 'CUSTOM_GROUP';

export interface AllUserGroupResponse {
  userGroupId: number;
  userGroupName: string;
  userGroupSubName: string;
  tenantName: string;
  companyName: string;
  fullName: string;
  userCount: number;
  userUuids: string[];
}

export interface UserGroupsParam {
  userGroupType: UserGroupType;
  userGroupName: string;
}

export interface UsersByIdsParam {
  companyName: string;
  deptName: string;
  employeeNumber: string;
  name: string;
  accountStatus: string;
}

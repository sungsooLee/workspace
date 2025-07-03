import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import {
  UserGroupsResponse,
  UserGroupsParam,
  UsersByIdsParam,
  OrganizationTreeResponse,
  SubdirectoryUsersParam,
} from '@types';

export default class UserGroupService {
  static fetchUserGroups(
    tenantIds: number[],
    params: UserGroupsParam,
  ): Promise<UserGroupsResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/user-groups`, {
      tenantIds,
      ...params,
    });
  }

  static fetchOrganizationTree(
    tenantIds: number[],
    tenantName?: string,
  ): Promise<OrganizationTreeResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/organization-tree`, {
      tenantIds,
      tenantName,
    });
  }
  static subdirectoryUsers(
    params: Partial<SubdirectoryUsersParam>,
  ): Promise<OrganizationTreeResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/subdirectory/users`, params);
  }

  static fetchUsersByIds(params: Partial<UsersByIdsParam>): Promise<UserGroupsResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/users/by-ids`, params);
  }
}

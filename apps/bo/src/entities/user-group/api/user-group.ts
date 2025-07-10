import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import {
  UserGroupsResponse,
  UserGroupsParam,
  UsersByIdsParam,
  OrganizationTreeResponse,
  PageableContent,
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
  ): Promise<OrganizationTreeResponse> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/organization-tree`, {
      tenantIds,
      tenantName,
    });
  }
  static fetchBlackwhiteUsers(body: any) {
    return httpService.post<PageableContent<any>>(
      `${PMSApiPrefix()}/userGroup/blackwhite/users?page=${body.page}&size=${body.size}`,
      body,
    );
  }

  static fetchUsersByIds(params: Partial<UsersByIdsParam>): Promise<UserGroupsResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/users/by-ids`, params);
  }
}

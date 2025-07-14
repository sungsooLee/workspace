import { getQuerySkipToken, httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import {
  UserGroupsResponse,
  UserGroupsParam,
  UsersByIdsParam,
  OrganizationTreeResponse,
  PageableContent, Tenant,
} from '@types';
import TenantService from '@entities/tenant/api/tenant';
import { tenantQueryKeys } from '@entities/tenant';

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

  static fetchUserGroupManualList(params: any) {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/userGroup`, params);
  }

  static fetchUserGroupManualDetail(userGroupId: number) {
    return httpService.get<any>(`${PMSApiPrefix()}/userGroup/${userGroupId}`)
  }

  static fetchUserGroupSubDirectoryList(params: any) {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/userGroup/subdirectory/users`, params);
  }
}

import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import {
  OrganizationTreeResponse,
  PageableContent,
  UserGroupsParam,
  UserGroupsResponse,
  UsersByIdsParam } from '@types';

export default class UserGroupService {
  static fetchUserGroups(
    tenantIds: number[],
    params: UserGroupsParam,
  ): Promise<UserGroupsResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/user-groups`, {
      tenantIds,
      ...params });
  }

  static fetchOrganizationTree(
    tenantIds: number[],
    roleIds: number[],
    tenantName?: string,
  ): Promise<OrganizationTreeResponse> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/organization-tree`, {
      tenantIds,
      roleIds,
      tenantName });
  }

  static fetchCustomGroupsTree(userGroupName?: string): Promise<OrganizationTreeResponse> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/custom-groups-tree`, {
      userGroupName });
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
    return httpService.get<any>(`${PMSApiPrefix()}/userGroup/${userGroupId}`);
  }

  static fetchUserGroupSubDirectoryList(params: any) {
    return httpService.get<PageableContent<any>>(
      `${PMSApiPrefix()}/userGroup/subdirectory/users`,
      params,
    );
  }

  static createUserGroupManual(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/userGroup`, payload);
  }

  static updateUserGroupManual(payload: any) {
    const userGroupId = payload.userGroupId;
    delete payload.userGroupId;
    return httpService.put<any>(`${PMSApiPrefix()}/userGroup/${userGroupId}`, payload);
  }
}

import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { AllUserGroupResponse, UserGroupsParam, UsersByIdsParam } from '@types';

export default class UserGroupService {
  static fetchAllUserGroups(params?: Partial<UserGroupsParam>): Promise<AllUserGroupResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/user-groups`, params);
  }

  static fetchUsersByIds(params: Partial<UsersByIdsParam>): Promise<AllUserGroupResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/users/by-ids`, params);
  }
}

import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { AllUserGroupResponse, UserGroupType } from '@types';

export default class UserGroupService {
  static fetchAllUserGroups(params?: {
    userGroupType?: UserGroupType;
    userGroupName?: string;
  }): Promise<AllUserGroupResponse[]> {
    return httpService.get(`${PMSApiPrefix()}/userGroup/user-groups`, params);
  }
}

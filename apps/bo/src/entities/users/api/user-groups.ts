import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class UserGroupsService {
  static fetchAllUserGroups() {
    return httpService.get<any>(`${PMSApiPrefix()}/userGroup/userGroups`);
  }
}

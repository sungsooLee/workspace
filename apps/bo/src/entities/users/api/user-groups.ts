import { httpService } from '@/libs/shared/src';
import { PMSApiPrefix } from '@learnway/config';

export default class UserGroupsService {
  static fetchAllUserGroups() {
    return httpService.get<any>(`${PMSApiPrefix()}/userGroup/userGroups`);
  }
}

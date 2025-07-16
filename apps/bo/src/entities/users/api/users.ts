import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { PageableContent } from '@types';

export default class UsersService {
  static fetchListUsers(params: any) {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/users`, params);
  }

  static fetchUser(userUuid: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/users/${userUuid}`);
  }

  static createUser(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/users`, payload);
  }

  static existsEmail(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/users/is-email-exists`, params);
  }

  static unlockUser(userUuid: string) {
    return httpService.post<any>(`${PMSApiPrefix()}/users/${userUuid}/unlock-account`, {});
  }
}

import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
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

  static updateUser(payload: any) {
    return httpService.put(`${PMSApiPrefix()}/users/${payload.userUuid}`, payload);
  }

  static existsEmail(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/users/is-email-exists`, params);
  }

  static unlockUser(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/users/unlock-account`, payload);
  }

  static approveAccountUser(userUuids: string[]) {
    return httpService.post<any>(`${PMSApiPrefix()}/users/approve-account`, userUuids);
  }

  static rejectAccountUser(userUuids: string[]) {
    return httpService.post<any>(`${PMSApiPrefix()}/users/reject-account`, userUuids);
  }
}

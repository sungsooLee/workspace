import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class UsersService {
  static fetchAllUsers(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/users`, params);
  }

  static fetchUser(userId: number) {
    return httpService.get<any>(`${PMSApiPrefix()}/users/${userId}`);
  }

  static createUser(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/users`, payload);
  }
}

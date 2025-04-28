import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class UsersService {
  static updatePhoneNumber(payload: any) {
    return httpService.put<any>(`${PMSApiPrefix()}/users/change-phone-number`, payload);
  }

  static updatePassword(payload: { username: string; oldPassword: string; newPassword: string }) {
    return httpService.put<any>(`${PMSApiPrefix()}/users/verifications/change-password`, payload);
  }
}

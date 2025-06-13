import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class UsersService {
  static verifySMS(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/users/verifications/verify-phone-number`,
      payload,
    );
  }
  static sendVerifySMS(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/users/verifications/send-verify-phone-number`,
      payload,
    );
  }
  static updatePhoneNumber(payload: any) {
    return httpService.put<any>(`${PMSApiPrefix()}/users/change-phone-number`, payload);
  }

  static updatePassword(payload: { username: string; oldPassword: string; newPassword: string }) {
    return httpService.put<any>(`${PMSApiPrefix()}/users/verifications/change-password`, payload);
  }

  static verifyPassword(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/users/confirm-password`, payload);
  }

  static deleteUser() {
    return httpService.delete<any>(`${PMSApiPrefix()}/users/delete-account`);
  }
  static getUser() {
    return httpService.get<any>(`/pms-module/user/api/v1/users/me`);
    // return httpService.get<any>(`${PMSApiPrefix()}/users/me`);
  }
}

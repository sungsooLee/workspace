import {
  UpdateChangePhoneNumberRequest,
  UpdateVerificationsChangePasswordRequest,
} from '@entities/user';
import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

export default class UserService {
  /**
   * 비밀번호 변경(비밀번호 인증)
   * 기존 비밀번호를 통해 사용자의 비밀번호를 변경한다.
   * @param body
   * @returns
   */
  static async updateVerificationsChangePassword(
    body: UpdateVerificationsChangePasswordRequest,
  ): Promise<void> {
    return httpService.put(`${PMSApiPrefix()}/users/verifications/change-password`, body);
  }

  /**
   *
   * @param body
   * @returns
   */
  static async updateChangePhoneNumber(body: UpdateChangePhoneNumberRequest): Promise<void> {
    return httpService.put(`${PMSApiPrefix()}/users/change-phone-number`, body);
  }
}

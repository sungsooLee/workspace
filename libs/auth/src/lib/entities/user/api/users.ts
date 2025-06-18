import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class UsersService {
  // SMS 인증
  static verifySMS(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/users/verifications/verify-phone-number`,
      payload,
    );
  }

  // SMS 인증번호 발송 요청
  static sendVerifySMS(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/users/verifications/send-verify-phone-number`,
      payload,
    );
  }

  // 휴대전화 업데이트
  static updatePhoneNumber(payload: any) {
    return httpService.put<any>(`${PMSApiPrefix()}/users/change-phone-number`, payload);
  }

  // 비밀번호 업데이트
  static updatePassword(payload: { username: string; oldPassword: string; newPassword: string }) {
    return httpService.put<any>(`${PMSApiPrefix()}/users/verifications/change-password`, payload);
  }

  // 비밀번호 유효기간 업데이트 1개월연장
  static updatePasswordExpireDate(payload: { days: number }) {
    return httpService.post<any>(`/pms-module/admin/users/extend-password-change-date`, payload);
  }

  // 비밀번호 확인
  static verifyPassword(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/users/confirm-password`, payload);
  }

  // 유저 삭제
  static deleteUser() {
    return httpService.delete<any>(`${PMSApiPrefix()}/users/delete-account`);
  }

  // 유저 상세정보 조회
  static getUser() {
    return httpService.get<any>(`/pms-module/user/api/v1/users/me`);
    // return httpService.get<any>(`${PMSApiPrefix()}/users/me`);
  }

  // GNB 유저 역할 정보 조회
  static getUserGnbRole() {
    return httpService.get<any>(`/pms-module/user/api/v1/users/me`);
    // return httpService.get<any>(`${PMSApiPrefix()}/users/me`);
  }

  // GNB 테넌트/역할 선택
  static updateTenantRoleLastSelect(payload: {
    lastVisitedFoTenantId?: number;
    lastVisitedFoRoleId?: number;
    lastVisitedBoTenantId?: number;
    lastVisitedBoRoleId?: number;
  }) {
    return httpService.put<any>(`/pms-module/admin/api/v1/users/visit-tenant-role`, payload);
    // return httpService.get<any>(`${PMSApiPrefix()}/users/me`);
  }
}

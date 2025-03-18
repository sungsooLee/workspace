import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import tenantsMock from '../../mock/tenants.json';
import tenantsMockByUser from '../../mock/tenantsByUser.json';

export default class VerificationsService {
  static fetchTenant(id: number) {
    //return httpService.get<Tenant>(`${PMSApiPrefix()}/tenants/${id}`);
    return new Promise((resolve) => setTimeout(() => resolve(tenantsMock as any)));
  }

  static fetchTenantsByUser(id: string) {
    return new Promise((resolve) => setTimeout(() => resolve(tenantsMockByUser as any)));
  }

  static sendVerifyPhoneNumer(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/users/verifications/send-verify-phone-number`,
      payload,
    );
  }

  static sendVerifyEmail(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/users/verifications/send-verify-email`,
      payload,
    );
  }

  static verifyPhoneNumer(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/users/verifications/verify-phone-number`,
      payload,
    );
  }

  static verifyEmail(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/users/verifications/verify-email`, payload);
  }

  static fetchEmail(payload: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/users/verifications/find-my-id`, payload);
  }

  static updatePasswordByPhoneNumber(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/users/verifications/change-password-by-phone-number`,
      payload,
    );
  }

  static updatePasswordByEmail(payload: any) {
    return httpService.get<any>(
      `${PMSApiPrefix()}/users/verifications/change-password-by-email`,
      payload,
    );
  }
}

import { httpService } from '@learnway/shared';
import { PageableContent } from '@types';
import { PMSApiPrefix, LMSApiPrefix } from '@learnway/config';

export default class InstructorService {
  static fetchRolesByTenantId(tenantId: number): Promise<any> {
    const params = {
      tenantId: tenantId,
      siteScope: 'BO',
      roleType: 'TUTOR',
    };
    return httpService.get(`${PMSApiPrefix()}/roles`, params);
  }

  static fetchList(params: any) {
    return httpService.get<PageableContent<any>>(`${LMSApiPrefix()}/instructor`, params);
  }

  static fetchOne(params: number) {
    return httpService.get(`${LMSApiPrefix()}/instructor/${params}`);
  }

  static insertInstructor(params: any) {
    return httpService.post<any>(`${LMSApiPrefix()}/instructor`, params);
  }

  static updateInstructor(instructorId: number, params: any) {
    return httpService.put<any>(`${LMSApiPrefix()}/instructor/${instructorId}`, params);
  }

  static deleteInstructor(instructorId: number) {
    return httpService.delete(`${LMSApiPrefix()}/instructor/${instructorId}`);
  }
}

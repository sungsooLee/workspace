import { httpService } from '@learnway/shared';
import { PageableContent } from '@types';
import { PMSApiPrefix, LMSApiPrefix } from '@learnway/config';
import { InstructorHistory, Instructor, Instructors } from 'src/types/entities/instructor';

export default class InstructorService {
  static fetchRolesByTenantId(payload: number): Promise<any> {
    const params = {
      tenantId: payload,
      siteScope: 'BO',
      roleType: 'TUTOR',
    };
    return httpService.get(`${PMSApiPrefix()}/roles`, params);
  }

  static fetchList(params: any) {
    return httpService.get<PageableContent<Instructors>>(`${LMSApiPrefix()}/instructor`, params);
  }

  static fetchOne(params: number) {
    return httpService.get<Instructor>(`${LMSApiPrefix()}/instructor/${params}`);
  }

  static fetchHistory(instructorId: number, params: any) {
    return httpService.get<InstructorHistory>(
      `${LMSApiPrefix()}/instructor/${instructorId}/history`,
      params,
    );
  }

  static fetchDuplicateCheckEmail(params: any) {
    return httpService.get(`${LMSApiPrefix()}/instructor/email`, params);
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

import { LMSApiPrefix, PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { PageableContent } from '@shared/types/page-meta';
import { Instructor, InstructorHistory, Instructors } from '../model/instructor.types';

export default class InstructorService {
  static fetchRolesByTenantId(payload: number) {
    const params = {
      tenantId: payload,
      siteScope: 'BO',
      roleType: 'TUTOR',
    };
    return httpService.get<any[]>(`${PMSApiPrefix()}/roles`, params);
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
    return httpService.post(`${LMSApiPrefix()}/instructor/email`, params);
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

  static insertTutor(params: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/users/tutor`, params);
  }
}

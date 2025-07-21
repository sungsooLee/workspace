import { httpService } from '@learnway/shared';
import { PageableContent } from '@types';
import { PMSApiPrefix, LMSApiPrefix } from '@learnway/config';
// import { InstructorHistory, Instructor, Instructors } from 'src/types/entities/round';

export default class LearningSequenceService {
  static fetchSequenceList(params: any) {
    console.log('### fetchSequenceList', params);
    return httpService.get<any[]>(`${LMSApiPrefix()}/sequences`, params);
  }

  static fetchSequenceOne(sequenceId: number) {
    console.log('## sequenceId:', sequenceId);
    return httpService.get<any>(`${LMSApiPrefix()}/sequence/${sequenceId}`);
  }

  static createSequence(params: any) {
    return httpService.post(`${LMSApiPrefix()}/sequence`, params);
  }

  static updateSequenceList(params: any) {
    return httpService.put(`${LMSApiPrefix()}/sequence/list-update`, params);
  }

  static updateSequence(sequenceId: number, params: any) {
    return httpService.put(`${LMSApiPrefix()}/sequence/${sequenceId}`, params);
  }

  static deleteSequenceList(params: any) {
    return httpService.delete(`${LMSApiPrefix()}/sequence/list-delete`, params);
  }

  static deleteSequence(sequenceId: number) {
    return httpService.delete(`${LMSApiPrefix()}/sequence/${sequenceId}`);
  }

  static copySequence(sequenceId: number, params: any) {
    return httpService.post(`${LMSApiPrefix()}/sequence/${sequenceId}`, {});
  }

  static fetchEnrollmentRegistList(params: any) {
    return [
      {
        openYear: 2025,
        sequenceName: '테스트',
        eduStartDate: new Date(),
        eduEndDate: new Date(),
        status: '조직장 대기중',
        company: '현대오토에버',
        department: 'L&D플랫폼',
        employeeId: 99999,
        employeeName: '김현대',
        regDate: new Date(),
      },
    ];
  }
  static fetchEnrollmentWaitList(params: any) {
    return null;
  }
  static fetchEnrollmentCancelList(params: any) {
    return null;
  }
}

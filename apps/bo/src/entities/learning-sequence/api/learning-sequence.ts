import { LMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import {
  EnrollmentCancelList,
  EnrollmentRegistCount,
  EnrollmentRegistList,
} from 'src/types/entities/enrollment';
import {
  LearningSequence,
  LearningSequenceCombo,
  LearningSequences,
} from 'src/types/entities/learning-sequence';
import {
  StudentsDeliveryAddress,
  StudentsHistory,
  StudentsLevelTest,
  StudentsList,
} from 'src/types/entities/students';

export default class LearningSequenceService {
  static fetchSequenceList(params: any) {
    console.log('### fetchSequenceList', params);
    return httpService.get<LearningSequences[]>(`${LMSApiPrefix()}/sequences`, params);
  }

  static fetchSequenceOne(sequenceId: number) {
    console.log('## sequenceId:', sequenceId);
    return httpService.get<LearningSequence>(`${LMSApiPrefix()}/sequence/${sequenceId}`);
  }

  static createSequence(params: any) {
    return httpService.post(`${LMSApiPrefix()}/sequences`, params);
  }

  static bulkUpdateSequence(params: any) {
    return httpService.put(`${LMSApiPrefix()}/sequence/bulk-update`, params);
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

  static copySequence(params: any) {
    return httpService.post(`${LMSApiPrefix()}/sequences/copy`, params);
  }

  static fetchEnrollmentSequenceCombo(params: any) {
    return httpService.get<LearningSequenceCombo[]>(
      `${LMSApiPrefix()}/enroll/combo/sequence`,
      params,
    );
  }

  static fetchEnrollmentRegistList(params: any) {
    return httpService.get<EnrollmentRegistList[]>(`${LMSApiPrefix()}/enrolls`, params);
  }
  static fetchEnrollmentRegistCount(params: any) {
    return httpService.get<EnrollmentRegistCount>(`${LMSApiPrefix()}/enrolls/count`, params);
  }
  static fetchEnrollmentWaitList(params: any) {
    return null;
  }
  static fetchEnrollmentCancelList(params: any) {
    return httpService.get<EnrollmentCancelList[]>(`${LMSApiPrefix()}/enrolls/cancel`, params);
  }
  static fetchStudentsList(params: any) {
    return httpService.get<StudentsList[]>(`${LMSApiPrefix()}/students/list`, params);
  }
  static fetchStudentsListLeftCount(params: any) {
    return httpService.get<any>(`${LMSApiPrefix()}/students/count`, params);
  }
  static fetchStudentsListRightCount(params: any) {
    return httpService.get<any>(`${LMSApiPrefix()}/students/sequence/detail`, params);
  }
  static updateStudentsReason(params: any) {
    return httpService.put(`${LMSApiPrefix()}/students/certification/reason`, params);
  }
  static fetchStudentsHistory(params: any) {
    return httpService.get<StudentsHistory[]>(`${LMSApiPrefix()}/students/history`, params);
  }
  static updateStudentsInfo(params: any) {
    return httpService.put(`${LMSApiPrefix()}/students/info`, params);
  }
  static deleteStudentsInfo(params: any) {
    return httpService.delete(`${LMSApiPrefix()}/students/delete`, params);
  }
  static updateStudentsCertification(params: any) {
    return httpService.put(`${LMSApiPrefix()}/students/certification`, params);
  }
  static updateStudentsCompletion(params: any) {
    return httpService.put(`${LMSApiPrefix()}/students/completion`, params);
  }
  static updateStudentsSequence(params: any) {
    return httpService.put(`${LMSApiPrefix()}/students/sequence`, params);
  }
  static fetchStudentsDeliveryAddress(params: any) {
    return httpService.get<StudentsDeliveryAddress>(
      `${LMSApiPrefix()}/students/delivery/address`,
      params,
    );
  }
  static fetchStudentsLevelTest(params: any) {
    return httpService.get<StudentsLevelTest>(`${LMSApiPrefix()}/students/level-test`, params);
  }
}

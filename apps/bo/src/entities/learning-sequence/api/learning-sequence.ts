import { httpService } from '@learnway/shared';
import { PageableContent } from '@types';
import { PMSApiPrefix, LMSApiPrefix } from '@learnway/config';
import {
  LearningSequence,
  LearningSequenceCombo,
  LearningSequences,
} from 'src/types/entities/learning-sequence';
import {
  EnrollmentCancelList,
  EnrollmentRegistCount,
  EnrollmentRegistList,
} from 'src/types/entities/enrollment';

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
}

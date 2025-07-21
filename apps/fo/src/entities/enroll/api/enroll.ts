import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';
import {
  CourseEnrollQueueStateResponse,
  CourseEnrollResponse,
  CourseEnrollsssParams,
  CourseEnrollsssResponse,
  EnrollRequest,
  PaginationRequest,
} from '@types';

/**
 * 수강 관리
 * 수강 기능 API 입니다
 */
export default class EnrollService {
  /**
   * 수강신청 내역 단건 확인
   * 로그인된 학습자만 실행 가능
   * @param sequenceUuid
   * @returns
   */
  static async fetchEnroll(sequenceUuid: string): Promise<CourseEnrollResponse> {
    return httpService.get(`${LMSApiPrefix()}/enroll`, { sequenceUuid });
  }

  /**
   * 단건 수강 신청 큐
   * 단건 수강 신청 큐를 생성한다.
   * @param body
   * @returns
   */
  static async createEnroll(body: EnrollRequest): Promise<void> {
    return httpService.post(`${LMSApiPrefix()}/enroll`, body);
  }

  /**
   * 수강신청 현황
   * @param params
   * @param pageable
   * @returns
   */
  static async fetchEnrollsss(
    params: CourseEnrollsssParams,
    pageable: PaginationRequest,
  ): Promise<CourseEnrollsssResponse> {
    return httpService.get(`${LMSApiPrefix()}/enrollsss`, { params, pageable });
  }

  /**
   * 수강신청 상태 조회
   * 과정 차수 ID로 수강 신청 상태를 조회한다
   * @param courseSequenceId
   * @returns
   */
  static async fetchEnrollQueueState(
    courseSequenceId: number,
  ): Promise<CourseEnrollQueueStateResponse> {
    return httpService.get(`${LMSApiPrefix()}/enroll/queue/state`, { courseSequenceId });
  }
}

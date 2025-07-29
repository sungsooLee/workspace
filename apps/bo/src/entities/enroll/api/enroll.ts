import { LMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

/**
 * 수강 관리 API
 */
export default class EnrollService {
  /**
   * 수강신청 교재 배송지 목록 조회
   * @param userId
   * @returns
   */
  static async fetchEnrollDeliveryList(userId: number): Promise<any> {
    return httpService.get(`${LMSApiPrefix()}/enroll/delivery/list`, { userId });
  }
}

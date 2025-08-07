import { LMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { DeliveryAddress } from '../model/enroll.types';

/**
 * 수강 관리 API
 */
export default class EnrollService {
  /**
   * 수강신청 교재 배송지 목록 조회
   * @param userUuid
   * @returns
   */
  static async fetchEnrollDeliveryList(userUuid: string): Promise<DeliveryAddress[]> {
    return httpService.get(`${LMSApiPrefix()}/enroll/delivery/list`, { userUuid });
  }
}

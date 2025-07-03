import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { LabelMessage, LabelMessagesQueryParams, PaginationResponse } from '@types';

/**
 * 라벨 메시지 관련 API 요청을 처리하는 서비스 클래스.
 */
export default class LabelMessagesService {
  /**
   * 라벨 메시지 목록을 조회합니다.
   * @param [params] - 조회 파라미터 (선택 사항).
   * @returns 라벨 메시지 목록 Promise.
   */
  static async fetchAll<T = LabelMessage>(
    params?: LabelMessagesQueryParams,
  ): Promise<PaginationResponse<T>> {
    return httpService.get<PaginationResponse<T>>(`${PMSApiPrefix()}/label-messages`, params);
    // return new Promise((resolve) => resolve(Mock)); // Mock 코드는 주석 처리 또는 삭제 필요
  }

  /**
   * 특정 ID의 라벨 메시지를 조회합니다.
   * @param id - 조회할 라벨 메시지 ID.
   * @returns 라벨 메시지 상세 정보 Promise.
   */
  static async fetch<T = LabelMessage>(id: number): Promise<T> {
    return httpService.get<T>(`${PMSApiPrefix()}/label-messages/${id}`);
  }

  /**
   * 새로운 라벨 메시지를 생성합니다.
   * @param payload - 생성할 라벨 메시지 정보.
   * @returns 생성된 라벨 메시지 Promise.
   */
  static async create(payload: LabelMessage): Promise<LabelMessage> {
    return httpService.post<LabelMessage>(`${PMSApiPrefix()}/label-messages`, payload);
  }

  /**
   * 기존 라벨 메시지를 수정합니다.
   * @param payload - 수정할 라벨 메시지 정보 (ID 포함 필수).
   * @returns 수정된 라벨 메시지 Promise.
   */
  static async update(payload: LabelMessage): Promise<LabelMessage> {
    return httpService.put<LabelMessage>(
      `${PMSApiPrefix()}/label-messages/${payload.labelMessageId}`,
      payload,
    );
  }
}

//-------------------
// Mock
//-------------------
// Mock 데이터는 실제 코드에서는 분리하거나 삭제하는 것이 좋습니다.
const fetchCompaniesMock = Array(10)
  .fill(null)
  .map((d, i) => ({ channelId: `channel_id${i}`, channelName: `channel_name${i}` }));

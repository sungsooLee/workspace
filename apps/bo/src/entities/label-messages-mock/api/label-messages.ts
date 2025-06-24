import { getMockCourseType, getRandomId, httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { LabelMessage, LabelMessagesQueryParams, PaginationResponse } from '@types';

/**
 * 테스트 용
 * 테스트 용
 * 테스트 용
 * 테스트 용
 * 테스트 용
 * 테스트 용
 * 테스트 용
 * 테스트 용
 */

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
    console.log('label-messages.ts.. : fetchAll', params);
    // return httpService.get<PaginationResponse<T>>(`${PMSApiPrefix()}/label-messages`, params);
    return new Promise((resolve) => {
      const response: PaginationResponse<T> = mockData(params);
      resolve(response);
    }); // Mock 코드는 주석 처리 또는 삭제 필요
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

  /**
   * 테스트용 API
   * @param id - 조회할 라벨 메시지 ID.
   * @returns 라벨 메시지 상세 정보 Promise.
   */
  static async fetchChannelMock<T = any>(key?: string): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = getMockCourseType();
        resolve(response as T);
      }, 3000);
    }); // Mock 코드는 주석 처리 또는 삭제 필요
  }
}

export const mockData = (params?: LabelMessagesQueryParams): PaginationResponse<any> => {
  const content = Array(params?.size || 20)
    .fill(null)
    .map((_, i) => ({
      labelMessageId: i,
      labelMessageMultilingulKey: 'key' + i,
      labelMessageType: 'LABEL',
      labelMessageName: getRandomId(),
      labelMessageDesc: 'bbb22',
      isUsed: false,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-04-22T22:32:42.684Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-05-02T00:43:24.852Z',
    }));
  // 로컬 테스트용
  const [sortKey, sortType] = params?.sort?.at(0)?.split(',') || [];
  const sortContent = content.sort((a: any, b: any) => {
    if (!sortType) {
      return 0;
    } else if (sortKey && sortType === 'desc') {
      return b[sortKey].localeCompare(a[sortKey]);
    } else if (sortKey) {
      return a[sortKey].localeCompare(b[sortKey]);
    }
  });
  return {
    content: sortContent,
    pageable: {
      pageNumber: params?.page || 0,
      pageSize: params?.size || 20,
      sort: {
        empty: false,
        sorted: !!sortKey,
        unsorted: false,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalElements: 1000,
    totalPages: 100,
    last: false,
    size: params?.size || 10,
    number: params?.page || 0,
    sort: {
      empty: false,
      sorted: !!sortKey,
      unsorted: false,
    },
    numberOfElements: params?.size || 10,
    first: true,
    empty: false,
  };
};

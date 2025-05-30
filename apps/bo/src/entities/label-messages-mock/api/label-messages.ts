import { httpService } from '@learnway/shared';
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
    // return httpService.get<PaginationResponse<T>>(`${PMSApiPrefix()}/label-messages`, params);
    return new Promise((resolve) => {
      const response: PaginationResponse<T> = mockData;
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
}

const mockData: PaginationResponse<any> = {
  content: [
    {
      labelMessageId: 1,
      labelMessageMultilingulKey: 'aaa',
      labelMessageType: 'LABEL',
      labelMessageName: 'aa544',
      labelMessageDesc: 'bbb22',
      isUsed: false,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-04-22T22:32:42.684Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-05-02T00:43:24.852Z',
    },
    {
      labelMessageId: 2,
      labelMessageMultilingulKey: 'ddd',
      labelMessageType: 'MESSAGE',
      labelMessageName: 'ddd',
      labelMessageDesc: 'dd',
      isUsed: false,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-04-23T20:02:29.780Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-04-29T16:15:53.307Z',
    },
    {
      labelMessageId: 6,
      labelMessageMultilingulKey: 'bbb',
      labelMessageType: 'LABEL',
      labelMessageName: 'bbbb',
      labelMessageDesc: '',
      isUsed: false,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-05-06T20:54:49.255Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-05-06T20:55:31.461Z',
    },
    {
      labelMessageId: 7,
      labelMessageMultilingulKey: 'm1',
      labelMessageType: 'LABEL',
      labelMessageName: 'm1',
      labelMessageDesc: 'm1',
      isUsed: true,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-05-13T23:26:39.855Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-05-13T23:26:39.855Z',
    },
    {
      labelMessageId: 8,
      labelMessageMultilingulKey: 'm2',
      labelMessageType: 'MESSAGE',
      labelMessageName: 'm2',
      labelMessageDesc: 'm2',
      isUsed: true,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-05-13T23:26:58.069Z',
      lastModifiedBy: '1seok@hyundai-autoever.com',
      modifiedDate: '2025-05-29T18:56:14.174Z',
    },
    {
      labelMessageId: 9,
      labelMessageMultilingulKey: 'm3',
      labelMessageType: 'MESSAGE',
      labelMessageName: 'm3',
      labelMessageDesc: 'm3',
      isUsed: true,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-05-13T23:27:17.671Z',
      lastModifiedBy: '1seok@hyundai-autoever.com',
      modifiedDate: '2025-05-28T23:37:16.448Z',
    },
    {
      labelMessageId: 10,
      labelMessageMultilingulKey: 'm5',
      labelMessageType: 'LABEL',
      labelMessageName: 'm5',
      labelMessageDesc: 'm5',
      isUsed: true,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-05-13T23:43:57.678Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-05-13T23:43:57.678Z',
    },
    {
      labelMessageId: 11,
      labelMessageMultilingulKey: 'm6',
      labelMessageType: 'LABEL',
      labelMessageName: 'm6',
      labelMessageDesc: 'm6',
      isUsed: true,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-05-13T23:45:22.429Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-05-13T23:45:22.429Z',
    },
    {
      labelMessageId: 12,
      labelMessageMultilingulKey: 'm8',
      labelMessageType: 'LABEL',
      labelMessageName: 'm8',
      labelMessageDesc: 'm8',
      isUsed: true,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-05-13T23:45:38.435Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-05-13T23:45:38.435Z',
    },
    {
      labelMessageId: 13,
      labelMessageMultilingulKey: 'm9',
      labelMessageType: 'LABEL',
      labelMessageName: 'm9',
      labelMessageDesc: 'm9',
      isUsed: true,
      createdBy: '9488404@ict-companion.com',
      createdDate: '2025-05-13T23:45:54.953Z',
      lastModifiedBy: '9488404@ict-companion.com',
      modifiedDate: '2025-05-13T23:45:54.953Z',
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalElements: 11,
  totalPages: 2,
  last: false,
  size: 10,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 10,
  first: true,
  empty: false,
};

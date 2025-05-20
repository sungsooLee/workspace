import { PaginationRequest } from './api';

export interface LabelMessage {
  /**
   * 라벨/메세지 NO
   */
  labelMessageId?: number;
  /**
   * 라벨/메세지 다국어키
   */
  labelMessageMultilingulKey?: string;
  /**
   * 라벨/메세지 분류
   */
  labelMessageType?: string;
  /**
   * 라벨/메세지명
   */
  labelMessageName?: string;
  /**
   * 라벨/메세지설명
   */
  labelMessageDesc?: string;
  /**
   * 사용여부
   */
  isUsed?: boolean;
  /**
   * 생성자
   */
  createdBy?: string;
  /**
   * 생성날짜
   */
  createdDate?: string;
  /**
   * 수정자
   */
  lastModifiedBy?: string;
  /**
   * 수정날짜
   */
  modifiedDate?: string;
}

export interface LabelMessagesQueryParams extends PaginationRequest {
  /**
   * 라벨/메세지 다국어키
   */
  labelMessageMultilingulKey?: string;
  /**
   * 라벨/메세지 분류
   */
  labelMessageType?: string;
  /**
   * 라벨/메세지명
   */
  labelMessageName?: string;
  /**
   * 사용여부
   */
  isUsed?: boolean;
}

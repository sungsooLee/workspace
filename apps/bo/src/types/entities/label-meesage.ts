export interface LabelMessage {
  /**
   * 라벨/메세지 NO
   */
  labelMessageId?: number | null;
  /**
   * 라벨/메세지 다국어키
   */
  labelMessageMultilingulKey?: string | null;
  /**
   * 라벨/메세지 분류
   */
  labelMessageType?: string | null;
  /**
   * 라벨/메세지명
   */
  labelMessageName?: string | null;
  /**
   * 라벨/메세지설명
   */
  labelMessageDesc?: string | null;
  /**
   * 사용여부
   */
  isUsed?: boolean | null;
  /**
   * 생성자
   */
  createdBy?: string | null;
  /**
   * 생성날짜
   */
  createdDate?: string | null;
  /**
   * 수정자
   */
  lastModifiedBy?: string | null;
  /**
   * 수정날짜
   */
  modifiedDate?: string | null;
}

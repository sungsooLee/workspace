/**
 * 유저 배송지
 */
export interface DeliveryAddress {
  /**
   * 과정 번호
   */
  courseId: number;
  /**
   * 과정명
   */
  courseName: string;
  /**
   * 차수명
   */
  courseSequenceName: string;
  /**
   * 교재명
   */
  bookName: string;
  /**
   * 학습 시작일
   */
  learningStartDateTime: string;
  /**
   * 학습 종료일
   */
  learningEndDateTime: string;
  /**
   * 받으시는 분 이름
   */
  recipientName: string;
  /**
   * 국가코드
   */
  countryCode: string;
  /**
   * 전화번호
   */
  telNo: string;
  /**
   * 우편번호
   */
  postalCode: string;
  /**
   * 기본 주소
   */
  address: string;
  /**
   * 상세 주소
   */
  addressDetail: string;
}

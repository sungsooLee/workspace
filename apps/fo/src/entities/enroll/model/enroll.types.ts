import { SortRequest } from '@shared/types/api';
import { ISODateString } from '@shared/types/common';

export interface CourseEnrollResponse {
  courseEnrollId: number;
  courseSequenceStartDate: ISODateString;
  courseSequenceEndDate: ISODateString;
}

type EnrollStatusType = 'ENROLL_DONE';
export type EnrollQueueStatusType =
  | 'QUEUE'
  | 'PROCESSED'
  | 'WAITING'
  | 'QUOTA_EXCEED'
  | 'INVALID_COURSE'
  | 'ERROR';
/**
 * QUEUE:수강신청 큐에 들어간 상태 - 처리 진행중
 * PROCESSED:수강신청이 정상 처리된 상태 - 신청 완료 상태
 * WAITING:수강신청 대기 상태 - 대기 신청 완료 상태
 * -- 추후에 배치로 조절하는 상태 --
 * EXPIRED_WAITING:수강신청 대기 상태가 만료됨(학습기간이 도래함에 따라 등)
 * MAIL_SEND:네이밍 다시 할 것, 입과 메일 발송
 * -- 신청 실패 상태 --
 * ERROR:에외 발생
 * QUOTA_EXCEED:수강신청 정원 마감
 * QUOTA_WAITING_EXCEED:수강신청 정원 + 대기 마감
 * INVALID_COURSE:유효하지 않은 과정/차수
 * ACCESS_DENIED:유저 그룹 등에 의해 수강신청 제한
 * DUPLICATE_ENROLL:중복 수강 신청 예외
 */
type CourseType = 'ELEARNING1';
type Gender = 'FEMALE';
type ApproverType = 'LEADER';

export interface CourseEnrollsssParams {
  startConditionDate: ISODateString;
  endConditionDate: ISODateString;
  enrollStatusTypes: EnrollStatusType;
  courseTypes: CourseType[];
}

export interface CourseEnrollQueueStateResponse {
  courseSequenceId: number;
  enrollQueueStatusType: EnrollQueueStatusType;
}

export interface CourseEnrollQueueStateIdResponse {
  courseSequenceId: number;
  enrollQueueStatusType: EnrollQueueStatusType;
}

export interface CourseEnrollsssResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [
    {
      courseType: CourseType;
      courseUuid: string;
      courseSequenceUuid: string;
      courseSequenceName: string;
      courseEnrollId: number;
      courseSequenceStartDate: ISODateString;
      courseSequenceEndDate: ISODateString;
      enrollStatusType: EnrollStatusType;
    },
  ];
  number: number;
  sort: SortRequest[];
  pageable: {
    offset: number;
    sort: SortRequest[];
    paged: boolean;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CourseEnrollDeleteResponse {
  status: number;
  message: string;
  enrollQueueStatusType: EnrollQueueStatusType;
  code: string;
}

export interface LangLevelTest {
  familyName: string;
  firstName: string;
  countryCode: string;
  telNo: string;
  preferGender: Gender;
  availableTestDate1: ISODateString;
  availableTestDate2: ISODateString;
  preferLearnDate1: ISODateString;
  preferLearnDate2: ISODateString;
}

export interface BookDeliveryInfo {
  recipientName: string;
  countryCode: string;
  telNo: string;
  postalCode: string;
  address: string;
  addressDetail: string;
}

export interface ApprovalInfo {
  approvalOrder: number;
  approverType: ApproverType;
  approverUuid: string;
}

export interface EnrollRequest {
  courseSequenceId: string;
  additionalInfo: {
    langLevelTest?: LangLevelTest;
    bookDeliveryInfo?: BookDeliveryInfo;
    approvalInfo?: {
      approverInfos: ApprovalInfo[];
    };
  };
}

export interface EnrollDeleteRequest {
  courseSequenceId: string;
  approvalReason: string;
}

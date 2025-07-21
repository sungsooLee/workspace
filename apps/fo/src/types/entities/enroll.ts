import { SortRequest } from '@learnway/ui';

type ISODateString = string;

export interface CourseEnrollResponse {
  courseEnrollId: number;
  courseSequenceStartDate: ISODateString;
  courseSequenceEndDate: ISODateString;
}

type EnrollStatusType = 'ENROLL_DONE';
type EnrollQueueStatusType = 'QUEUE';
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
  courseSequenceUuid: string;
  additionalInfo: {
    langLevelTest?: LangLevelTest;
    bookDeliveryInfo?: BookDeliveryInfo;
    approvalInfo?: {
      approverInfos: ApprovalInfo[];
    };
  };
}

import { SortResponse } from './sort';

export interface SequencesRequest {
  eduYear: number;
  courseId: number;
}

export interface SequencesResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: {
    courseSequenceId: number;
    enrollmentStartDate: string;
    enrollmentEndDate: string;
    courseSequenceStartDate: string;
    courseSequenceEndDate: string;
  }[];
  number: number;
  sort: SortResponse[];
  numberOfElements: number;
  pageable: any;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface SequenceResponse {
  courseSequenceId: number;
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  courseSequenceStartDate: string;
  courseSequenceEndDate: string;
  isDeleted: boolean;
  maxQuota: number;
  remainingQuota: number;
  course: any;
  coordinatorId: number;
}

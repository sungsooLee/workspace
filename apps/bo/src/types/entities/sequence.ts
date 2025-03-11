import { PaginationResponse } from './pagination';
import { SortResponse } from './sort';
import { CourseResponse } from './course';

export interface SequencesRequest extends PaginationResponse {
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
  pageable: PaginationResponse;
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
  course: CourseResponse;
  coordinatorId: number;
}

import { SortResponse } from './sort';
import { PaginationResponse } from './pagination';

export interface CoursesRequest extends PaginationResponse {
  courseName: string;
  courseType: string;
}

export interface CoursesResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: {
    courseId: number;
    courseTsid: string;
    courseName: string;
    courseType: string;
  }[];
  number: number;
  sort: SortResponse[];
  numberOfElements: number;
  pageable: PaginationResponse;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CourseResponse {
  courseId: number;
  courseTsid: string;
  channelId: number;
  channelName: string;
  courseType: string;
  courseName: string;
  trainingGoals: string;
  expectedOutcomes: string;
  courseContent: string;
  coordinatorId: number;
  coordinatorName: string;
  openingYear: number;
  isApproved: boolean;
  isUsed: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  companyId: number;
  approvalRouteId: number;
  trainingPlatformType: string;
  isEnrollNeeded: boolean;
  categories: {
    id: number;
    parentId: number;
    name: string;
    sortSeq: number;
    categoryType: string;
  }[];
}

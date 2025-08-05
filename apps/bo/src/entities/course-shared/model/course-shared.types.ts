/**
 * 공유받은 과정 목록 조회
 */
export interface CourseSharedList {
  courseShareId: number;
  originChannelName: string;
  targetChannelName: string;
  courseId: number;
  courseType: string;
  courseName: string;
  language: string;
  sharedDateTime: string;
  isComplete: boolean;
}

/**
 * 가져간 이력 조회
 */
export interface CourseSharedHistoryList {
  userName: string;
  copiedDateTime: string;
}

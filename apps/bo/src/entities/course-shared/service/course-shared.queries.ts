import CourseSharedService from '../api/course-shared';

export const queryKeys = {
  list: ['course-shared-list'] as const,
  history: ['course-shared-history'] as const,
  originChannels: ['course-shared-origin-channels'] as const,
};

export const queryOptions = {
  // 공유받은 과정 목록 조회
  list: (params: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => CourseSharedService.fetchCourseSharedList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  // 가져간 이력 조회
  history: (params: any) => ({
    queryKey: queryKeys.history,
    queryFn: () => CourseSharedService.fetchCourseSharedHistory(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  originChannels: (params: any) => ({
    queryKey: queryKeys.originChannels,
    queryFn: () => CourseSharedService.fetchOriginChannels(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};

export const mutateOptions = {
  // 과정공유
  courseShare: () => ({
    mutationFn: (payload: any) => CourseSharedService.courseShare(payload),
  }),
  // 가져오기
  copyCourseShared: () => ({
    mutationFn: (payload: any) => CourseSharedService.copyCourseShared(payload),
  }),
};

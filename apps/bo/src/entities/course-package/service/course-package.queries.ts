import CoursePackageService from '../api/course-package';

export const queryKeys = {
  coursePackages: ['course-packages'] as const,
};

export const queryOptions = {
  // 패키지 목록 조회
  coursePackages: (params: any) => ({
    queryKey: queryKeys.coursePackages,
    queryFn: () => CoursePackageService.fetchCoursePackages(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};

export const mutateOptions = {
  // 패키지 생성
  createCoursePackage: () => ({
    mutationFn: (payload: any) => CoursePackageService.createCoursePackage(payload),
  }),
};

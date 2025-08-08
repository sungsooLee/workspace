import CoursePackageService from '../api/course-package';

export const queryKeys = {
  coursePackages: ['course-packages'] as const,
  coursePackageTree: ['course-package-tree'] as const,
};

export const queryOptions = {
  // 패키지 목록 조회
  coursePackages: (params: any) => ({
    queryKey: queryKeys.coursePackages,
    queryFn: () => CoursePackageService.fetchCoursePackages(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  // 패키지 tree 조회
  coursePackageTree: (packageId: number) => ({
    queryKey: queryKeys.coursePackageTree,
    queryFn: () => CoursePackageService.fetchCoursePackagesTree(packageId),
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

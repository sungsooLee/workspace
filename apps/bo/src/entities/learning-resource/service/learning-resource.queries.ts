import LearningResourceService from '../api/learning-resource';

export const queryKeys = {
  userByUuid: ['user-by-uuid'] as const,
  contents: ['contents'] as const,
  s3FileDownload: ['file-s3-download'] as const,
  learningResources: ['learning-resources'] as const,
  mappingCourses: ['mapping-courses'] as const,
  sharedHistories: ['shared-histories'] as const,
  programGuideDownload: ['program-guide-download'] as const,
};

export const learningResourceQueryOptions = {
  getUser: (uuid: string) => ({
    queryKey: queryKeys.userByUuid,
    queryFn: () => LearningResourceService.fetchUser(uuid),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getContents: (params: any) => ({
    queryKey: queryKeys.contents,
    queryFn: () => LearningResourceService.fetchContents(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),

  getS3FileDownload: (key: string, fileName: string) => ({
    queryKey: queryKeys.s3FileDownload,
    queryFn: () => LearningResourceService.fetchS3FileDownload(key, fileName),
    cacheTime: 1000 * 60 * 60,
    staleTime: 0,
    enabled: true,
  }),
  getLearningResources: (params: any) => ({
    queryKey: queryKeys.learningResources,
    queryFn: () => LearningResourceService.fetchLearningResources(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getMappingCourses: (params: any) => ({
    queryKey: queryKeys.mappingCourses,
    queryFn: () => LearningResourceService.fetchMappingCourses(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getSharedHistories: (params: any) => ({
    queryKey: queryKeys.mappingCourses,
    queryFn: () => LearningResourceService.fetchSharedHistories(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getProgramGuideDownload: (params: any) => ({
    queryKey: queryKeys.programGuideDownload,
    queryFn: () => LearningResourceService.fetchProgramGuideDownload(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),

  updateHTML5FileChange: (params: { contentUuid: string; fileUuid: string }) => ({
    queryKey: queryKeys.contents,
    queryFn: () => LearningResourceService.updateHTML5FileChange(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
};

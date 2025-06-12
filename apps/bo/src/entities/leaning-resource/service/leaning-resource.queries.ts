import LeaningResourceService from '../api/leaning-resource';

export const queryKeys = {
  contents: ['contents'] as const,
  s3FileDownload: ['file-s3-download'] as const,
  learningResources: ['learning-resources'] as const,
  mappingCourses: ['mapping-courses'] as const,
  sharedHistories: ['shared-histories'] as const,
  programGuideDownload: ['program-guide-download'] as const,
};

export const leaningResourceQueryOptions = {
  getContents: (params: any) => ({
    queryKey: queryKeys.contents,
    queryFn: () => LeaningResourceService.fetchContents(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),

  getS3FileDownload: (key: string, fileName: string) => ({
    queryKey: queryKeys.s3FileDownload,
    queryFn: () => LeaningResourceService.fetchS3FileDownload(key, fileName),
    cacheTime: 1000 * 60 * 60,
    staleTime: 0,
    enabled: true,
  }),
  getLearningResources: (params: any) => ({
    queryKey: queryKeys.learningResources,
    queryFn: () => LeaningResourceService.fetchLeaningResources(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getMappingCourses: (params: any) => ({
    queryKey: queryKeys.mappingCourses,
    queryFn: () => LeaningResourceService.fetchMappingCourses(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getSharedHistories: (params: any) => ({
    queryKey: queryKeys.mappingCourses,
    queryFn: () => LeaningResourceService.fetchSharedHistories(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getProgramGuideDownload: (params: any) => ({
    queryKey: queryKeys.programGuideDownload,
    queryFn: () => LeaningResourceService.fetchProgramGuideDownload(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),

  updateHTML5FileChange: (params: { contentUuid: string; fileUuid: string }) => ({
    queryKey: queryKeys.contents,
    queryFn: () => LeaningResourceService.updateHTML5FileChange(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
};

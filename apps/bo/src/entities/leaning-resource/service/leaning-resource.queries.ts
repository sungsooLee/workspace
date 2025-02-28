import LeaningResourceService from '../api/leaning-resource';

export const queryKeys = {
  learningResources: ['learning-resources'] as const,
  mappingCourses: ['mapping-courses'] as const,
  sharedHistories: ['shared-histories'] as const,
  programGuideDownload: ['program-guide-download'] as const,
};

export const leaningResourceQueryOptions = {
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
};

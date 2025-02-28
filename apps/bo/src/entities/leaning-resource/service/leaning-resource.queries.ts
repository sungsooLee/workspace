import LeaningResourceService from '../api/leaning-resource';

export const queryKeys = {
  learningResources: ['learning-resources'] as const,
  mappingCourses: ['mapping-courses'] as const,
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
};

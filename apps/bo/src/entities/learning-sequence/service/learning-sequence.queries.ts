import LearningSequenceService from '../api/learning-sequence';

export const queryKeys = {
  sequenceList: ['learning-sequence-management-list'] as const,
  sequenceDetail: ['learning-sequence-management-detail'] as const,
  enrollmentRegistList: ['learning-sequence-enrollment-regist-list'] as const,
  enrollmentWaitList: ['learning-sequence-enrollment-wait-list'] as const,
  enrollmentCancelList: ['learning-sequence-enrollment-cancel-list'] as const,
};

export const queryOptions = {
  sequenceList: (params: any) => ({
    queryKey: queryKeys.sequenceList,
    queryFn: () => LearningSequenceService.fetchSequenceList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  sequenceDetail: (params: number) => ({
    queryKey: queryKeys.sequenceDetail,
    queryFn: () => LearningSequenceService.fetchSequenceOne(params),
  }),
  enrollmentRegistList: (params: any) => ({
    queryKey: queryKeys.enrollmentRegistList,
    queryFn: () => LearningSequenceService.fetchEnrollmentRegistList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  enrollmentWaitList: (params: any) => ({
    queryKey: queryKeys.enrollmentWaitList,
    queryFn: () => LearningSequenceService.fetchEnrollmentWaitList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  enrollmentCancelList: (params: any) => ({
    queryKey: queryKeys.enrollmentCancelList,
    queryFn: () => LearningSequenceService.fetchEnrollmentCancelList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};

export const mutateOptions = {};

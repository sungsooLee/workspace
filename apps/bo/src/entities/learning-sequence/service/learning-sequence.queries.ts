import LearningSequenceService from '../api/learning-sequence';

export const queryKeys = {
  sequenceList: ['learning-sequence-management-list'] as const,
  sequenceDetail: ['learning-sequence-management-detail'] as const,
  enrollmentSequenceCombo: ['learning-sequence-enrollment-sequence-combo'] as const,
  enrollmentRegistList: ['learning-sequence-enrollment-regist-list'] as const,
  enrollmentRegistCount: ['learning-sequence-enrollment-regist-count'] as const,
  enrollmentWaitList: ['learning-sequence-enrollment-wait-list'] as const,
  enrollmentCancelList: ['learning-sequence-enrollment-cancel-list'] as const,
};

export const queryOptions = {
  // 차수 목록 조회
  sequenceList: (params: any) => ({
    queryKey: queryKeys.sequenceList,
    queryFn: () => LearningSequenceService.fetchSequenceList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  // 차수 단건 조회
  sequenceDetail: (sequenceId: number) => ({
    queryKey: queryKeys.sequenceDetail,
    queryFn: () => LearningSequenceService.fetchSequenceOne(sequenceId),
    cacheTime: 0,
    staleTime: 0,
  }),
  // 검색 조건 차수 목록 조회
  enrollmentSequenceCombo: (params: any) => ({
    queryKey: queryKeys.enrollmentSequenceCombo,
    queryFn: () => LearningSequenceService.fetchEnrollmentSequenceCombo(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  // 수강신청 목록 조회
  enrollmentRegistList: (params: any) => ({
    queryKey: queryKeys.enrollmentRegistList,
    queryFn: () => LearningSequenceService.fetchEnrollmentRegistList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  // 수강신청 건수 조회
  enrollmentRegistCount: (params: any) => ({
    queryKey: queryKeys.enrollmentRegistCount,
    queryFn: () => LearningSequenceService.fetchEnrollmentRegistCount(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  // 수강신청 대기 조회
  enrollmentWaitList: (params: any) => ({
    queryKey: queryKeys.enrollmentWaitList,
    queryFn: () => LearningSequenceService.fetchEnrollmentWaitList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  // 수강취소/반려 조회
  enrollmentCancelList: (params: any) => ({
    queryKey: queryKeys.enrollmentCancelList,
    queryFn: () => LearningSequenceService.fetchEnrollmentCancelList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};

export const mutateOptions = {
  // 차수 생성
  createSequence: () => ({
    mutationFn: (payload: any) => LearningSequenceService.createSequence(payload),
  }),
  // 차수 일괄 설정
  bulkUpdateSequence: () => ({
    mutationFn: (payload: any) => LearningSequenceService.bulkUpdateSequence(payload),
  }),
  // 차수 수정 (리스트)
  updateSequenceList: () => ({
    mutationFn: (payload: any) => LearningSequenceService.updateSequenceList(payload),
  }),
  // 차수 수정 (단건)
  updateSequence: () => ({
    mutationFn: (payload: any) => {
      const sequenceId = payload.sequenceId;
      console.log('sequenceId=>', sequenceId);
      console.log('payload=>', payload);
      return LearningSequenceService.updateSequence(sequenceId, payload);
    },
  }),
  // 차수 삭제 (리스트)
  deleteSequenceList: () => ({
    mutationFn: (payload: Array<any>) => LearningSequenceService.deleteSequenceList(payload),
  }),
  // 차수 삭제 (단건)
  deleteSequence: () => ({
    mutationFn: (payload: any) => {
      const sequenceId = payload.sequenceId;
      return LearningSequenceService.deleteSequence(sequenceId);
    },
  }),
  // 차수 복사
  copySequence: () => ({
    mutationFn: (payload: any) => {
      return LearningSequenceService.copySequence(payload);
    },
  }),
};

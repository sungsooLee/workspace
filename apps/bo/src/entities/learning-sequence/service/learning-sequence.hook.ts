import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryOptions, mutateOptions } from './learning-sequence.queries';

export function useFetchCourseSequences(params: any) {
  return useQuery(queryOptions.sequenceList(params));
}

export function useFetchCourseSequence(sequenceId: number) {
  return useQuery(queryOptions.sequenceDetail(sequenceId));
}

export function useCreateSequence(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.createSequence(),
    ...options,
  });

  return {
    createSequence: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useBulkUpdateSequence(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.bulkUpdateSequence(),
    ...options,
  });

  return {
    bulkUpdateSequence: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useUpdateSequenceList(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.updateSequenceList(),
    ...options,
  });

  return {
    updateSequenceList: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useUpdateSequence(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.updateSequence(),
    ...options,
  });

  return {
    updateSequence: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useDeleteSequenceList(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.deleteSequenceList(),
    ...options,
  });

  return {
    deleteSequenceList: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useDeleteSequence(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.deleteSequence(),
    ...options,
  });

  return {
    deleteSequence: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useCopySequence(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.copySequence(),
    ...options,
  });

  return {
    copySequence: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useFetchEnrollmentSequenceCombo(params: any) {
  return useQuery(queryOptions.enrollmentSequenceCombo(params));
}

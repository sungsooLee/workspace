import { useMutation, useQuery } from '@tanstack/react-query';

import { mutateOptions, queryOptions } from './learning-sequence.queries';

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

export function useUpdateStudentsReason(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.updateStudentsReason(),
    ...options,
  });

  return {
    updateStudentsReason: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useUpdateStudentsInfo(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.updateStudentsInfo(),
    ...options,
  });

  return {
    updateStudentsInfo: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useDeleteStudentsInfo(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.deleteStudentsInfo(),
    ...options,
  });

  return {
    deleteStudentsInfo: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useUpdateStudentsCertification(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.updateStudentsCertification(),
    ...options,
  });

  return {
    updateStudentsCertification: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useUpdateStudentsCompletion(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.updateStudentsCompletion(),
    ...options,
  });

  return {
    updateStudentsCompletion: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useUpdateStudentsSequence(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.updateStudentsSequence(),
    ...options,
  });

  return {
    updateStudentsSequence: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useUpdateStudentsList(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.updateStudentsList(),
    ...options,
  });

  return {
    updateStudentsList: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

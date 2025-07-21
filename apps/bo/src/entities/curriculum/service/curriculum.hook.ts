import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mutateOptions, queryKeys, queryOptions } from './curriculum.queries';
import { CurriculumDndParams, CurriculumSearchParams } from '@types';

export function useGetCurriculumList(param: CurriculumSearchParams) {
  return useQuery(queryOptions.list(param));
}

export function useGetCurriculumDetail(curriculumId: number) {
  return useQuery(queryOptions.detail(curriculumId));
}

export function useGetModuleDetail(moduleId: number) {
  return useQuery(queryOptions.moduleDetail(moduleId));
}

export function useGetLessonDetail(data: { moduleId?: number; lessonId?: number }) {
  return useQuery({
    ...queryOptions.lessonDetail(data),
    enabled: !!(data.lessonId && data.lessonId > 0 && data.moduleId && data.moduleId > 0),
  });
}

export function useCreateCurriculum(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateCurriculum(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateCurriculum(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useCreateGeneralModule(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.createGeneralModule(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateGeneralModule(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateGeneralModule(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useCreateFixedModule(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.createFixedModule(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateFixedModule(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateFixedModule(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useCreateLessonByModule(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.createLessonByModule(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
export function useCreateLessonByCurriculum(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.createLessonByCurriculum(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
export function useUpdateLessonByFixed(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateLessonByFixed(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateLessonByGeneral(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateLessonByGeneral(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useDndCurriculumTree(curriculumId?: number, options?: any): any {
  const queryClient = useQueryClient();

  return useMutation<any, Error, CurriculumDndParams, any>({
    ...mutateOptions.dndCurriculumTree(),
    ...options,
    onSuccess: async (data: any, variables: CurriculumDndParams, context: any) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });

      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context?.userContext);
      }
    },
    onError: (error: Error, variables: CurriculumDndParams, context: any) => {
      if (options?.onError) {
        options.onError(error, variables, context?.userContext);
      }
    },
    onSettled: (data: any, error: Error | null, variables: CurriculumDndParams, context: any) => {
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context?.userContext);
      }
    },
  });
}

export function useDeleteCurriculumModule(options?: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.deleteCurriculumModule(),
    ...options,
    onSuccess: async (data: any, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context);
      }
    },
  });
  return {
    delete: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useDeleteCurriculumLesson(options?: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.deleteCurriculumLesson(),
    ...options,
    onSuccess: async (data: any, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context);
      }
    },
  });

  return {
    delete: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mutateOptions, queryKeys, queryOptions } from './curriculum.queries';
import { CurriculumSearchParams } from '@types';

export function useGetCurriculumList(param: CurriculumSearchParams) {
  return useQuery(queryOptions.list(param));
}

export function useGetCurriculumDetail(curriculumId: number) {
  return useQuery(queryOptions.detail(curriculumId));
}

export function useGetModuleDetail(moduleId: number) {
  return useQuery(queryOptions.moduleDetail(moduleId));
}

export function useGetLessonDetail(data: { moduleId: number; lessonId: number }) {
  return useQuery({
    ...queryOptions.lessonDetail(data),
    enabled: data.moduleId > 0 && data.lessonId > 0,
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

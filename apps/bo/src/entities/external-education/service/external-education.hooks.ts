import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mutateOptions, queryKeys, queryOptions } from './external-education.queries';
import { ExternalCourseFormLayoutParam, ExternalCourseLayoutParam } from '@types';

export function useGetExternalEducationListQuery(params: any) {
  return useQuery(queryOptions.list(params));
}

export function useGetExternalEducationComponents({
  tenantId,
  externalCourseFormEnrollType,
}: ExternalCourseFormLayoutParam) {
  return useQuery(queryOptions.componentList({ tenantId, externalCourseFormEnrollType }));
}

export function useGetExternalEducationDetail(externalCourseFormId: number) {
  return useQuery(queryOptions.detail(externalCourseFormId));
}

export function useGetRegistrationLayout(data: ExternalCourseLayoutParam) {
  return useQuery(queryOptions.registrationLayout(data));
}

export function useGetExternalPopup(externalCourseFormId: number) {
  return useQuery(queryOptions.getExternalPopup(externalCourseFormId));
}

export function useCreateExternalCourseForm(options: any) {
  const mutation = useMutation({
    ...mutateOptions.createExternalCourseForm(),
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

export function useCreateExternalCourseLayout(options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...mutateOptions.createExternalCourseLayout(),
    onSuccess: async (data: any, variables, context) => {
      console.log(data);
      // const formId = data.
      // queryClient.invalidateQueries({queryKey: queryKeys.registrationLayout(formId)})
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

export function useCreateExternalCoursePopup(options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...mutateOptions.createExternalCoursePopup(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      // queryClient.invalidateQueries({ queryKey: queryKeys.getExternalPopup(variables.externalCourseFormId) });
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

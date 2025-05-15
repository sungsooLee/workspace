import {
  MutateOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  mutateOptions,
  queryKeys,
  commonCodeQueryOptions as queryOptions,
} from './common-code.queries';
import { createAuthorizedQueryHook } from '../../../shared/lib/use-authorized-query';
import { apiKeys } from './system-code.queries';
import CommonCodeService from '../api/common-code';

// 코드 목록 조회
export const useCommonCodeList = createAuthorizedQueryHook(
  apiKeys.list,
  (params: {
    page: number;
    size: number;
    sort: string;
    cdGroupId?: string;
    cdGroupName?: string;
    isUsed?: string;
    cdName?: string;
  }) => queryKeys.list(params),
  (params) => () =>
    CommonCodeService.fetchCodes(
      params.page,
      params.size,
      params.sort,
      params.cdGroupId,
      params.cdGroupName,
      params.isUsed,
      params.cdName,
    ),
);

export function useCommonCodeDetail(cdGroupId: string, cdId: string) {
  return useQuery({
    ...queryOptions.detail(cdGroupId, cdId),
    enabled: Boolean(cdGroupId) && Boolean(cdId),
  });
}

export function useCreateCommonCode({
  onSuccess,
  onError,
  queryParams,
  ...reset
}: {
  onSuccess?: (data: any, variables: any, context: unknown) => void;
  onError?: (error: Error, variables: any, context: unknown) => void;
  queryParams?: {
    page: number;
    size: number;
    sort: string;
    cdGroupId?: string;
    cdGroupName?: string;
    isUsed?: string;
    cdName?: string;
  };
} & Omit<
  UseMutationOptions<any, Error, any, unknown>,
  'mutationFn' | 'onSuccess' | 'onError'
> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, any>({
    ...mutateOptions.create(),
    onSuccess: async (data, variables, context) => {
      if (queryParams) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.list(queryParams),
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
      // if (data.cdGroupId && data.cdId) {
      //   await queryClient.invalidateQueries({
      //     queryKey: queryKeys.detail(data.cdGroupId, data.cdId),
      //   });
      // }

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError,
    ...reset,
  });

  return {
    create: (payload: any, callback?: MutateOptions<any, Error, any, unknown>) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateCommonCode({
  onSuccess,
  onError,
  queryParams,
  ...reset
}: {
  onSuccess?: (data: any, variables: any, context: unknown) => void;
  onError?: (error: Error, variables: any, context: unknown) => void;
  queryParams?: {
    page: number;
    size: number;
    sort: string;
    cdGroupId?: string;
    cdGroupName?: string;
    isUsed?: string;
    cdName?: string;
  };
} & Omit<
  UseMutationOptions<any, Error, any, unknown>,
  'mutationFn' | 'onSuccess' | 'onError'
> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, any>({
    ...mutateOptions.update(),
    onSuccess: async (data, variables, context) => {
      if (queryParams) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.list(queryParams),
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }

      if (data.cdGroupId && data.cdId) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.detail(data.cdGroupId, data.cdId),
        });
      }

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError,
    ...reset,
  });

  return {
    update: (payload: any, callback?: MutateOptions<any, Error, any, unknown>) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

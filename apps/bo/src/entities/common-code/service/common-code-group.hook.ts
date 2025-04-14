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
  commonCodeGroupQueryOptions as queryOptions,
} from './common-code-group.queries';
import { CreateCommonCodeGroup } from '../../../types/entities/common-code';
import { isError } from 'lodash';

// 코드 그룹 목록 조회 훅
export function useCommonCodeGroupList(
  page: number,
  size: number,
  cdGroupId = '',
  cdGroupName = '',
  cdGroupAbbreviatonEnglishName = '',
  cdGroupContent = '',
  validityYn = true,
  cdName = '',
) {
  return useQuery(
    queryOptions.list(
      page,
      size,
      cdGroupId,
      cdGroupName,
      cdGroupAbbreviatonEnglishName,
      cdGroupContent,
      validityYn,
      cdName,
    ),
  );
}

export function useCommonCodeGroupDetail(cdGroupId: string) {
  return useQuery({ ...queryOptions.detail(cdGroupId), enabled: !!cdGroupId });
}

export function useCreateCommonCodeGroup({
  onSuccess,
  onError,
  queryParams, // 쿼리 무효화에 사용될 파라미터
  ...rest
}: {
  onSuccess?: (data: any, variables: CreateCommonCodeGroup, context: unknown) => void;
  onError?: (error: Error, variables: CreateCommonCodeGroup, context: unknown) => void;
  queryParams?: {
    page: number;
    size: number;
    cdGroupId?: string;
    cdGroupName?: string;
    cdGroupAbbreviatonEnglishName?: string;
    cdGroupContent?: string;
    validityYn?: boolean;
    cdName?: string;
  };
} & Omit<
  UseMutationOptions<any, Error, CreateCommonCodeGroup, unknown>,
  'mutationFn' | 'onSuccess' | 'onError'
> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, CreateCommonCodeGroup>({
    ...mutateOptions.create(),
    onSuccess: async (data, variables, context) => {
      if (queryParams) {
        console.log(queryParams);
        await queryClient.invalidateQueries({
          queryKey: queryKeys.list(queryParams),
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError,
    ...rest,
  });

  return {
    create: (
      payload: CreateCommonCodeGroup,
      callback?: MutateOptions<any, Error, CreateCommonCodeGroup, unknown>,
    ) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateCommonCodGroup({
  onSuccess,
  onError,
  queryParams,
  ...rest
}: {
  onSuccess?: (data: any, variables: CreateCommonCodeGroup, context: unknown) => void;
  onError?: (data: Error, variabels: CreateCommonCodeGroup, context: unknown) => void;
  queryParams?: {
    page: number;
    size: number;
    cdGroupId?: string;
    cdGroupName?: string;
    cdGroupAbbreviatonEnglishName?: string;
    cdGroupContent?: string;
    validityYn?: boolean;
    cdName?: string;
  };
} & Omit<
  UseMutationOptions<any, Error, CreateCommonCodeGroup, unknown>,
  'mutationFn' | 'onSuccess' | 'onError'
> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, CreateCommonCodeGroup>({
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
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError,
    ...rest,
  });

  return {
    update: (
      payload: CreateCommonCodeGroup,
      callback?: MutateOptions<any, Error, CreateCommonCodeGroup, unknown>,
    ) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

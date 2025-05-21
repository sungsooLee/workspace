import { useMemo } from 'react';

import { queryKeys } from './common-code-group.queries';
import { CommonCodeGroupApi } from '../api/common-code-group';

import { CommonCodeGroup } from '../../../types/entities/common-code';
import { useApiMutation, useApiQuery } from '../../../shared/lib/use-authorized-query';
import { PageableContent } from '../../../types';
import { useQueryClient } from '@tanstack/react-query';

// 코드 그룹 목록 조회 훅
export interface CodeGroupListParams {
  page: number;
  size: number;
  sort?: string[];
  cdGroupId?: string;
  cdGroupName?: string;
  isUsed?: string;
}

export function useCodeGroupList(params: CodeGroupListParams) {
  const cleanParams = useMemo(() => {
    const result = { ...params };
    Object.keys(result).forEach(
      (key) =>
        result[key as keyof CodeGroupListParams] === undefined &&
        delete result[key as keyof CodeGroupListParams],
    );
    return result;
  }, [params]);

  const result = useApiQuery<PageableContent<CommonCodeGroup>, CodeGroupListParams>(
    CommonCodeGroupApi.list,
    cleanParams,
    queryKeys.list(cleanParams),
  );
  return {
    ...result,
    data: result.data as PageableContent<CommonCodeGroup> | undefined,
  };
}

export function useCommonCodeGroupDetail(cdGroupId: string, options?: any) {
  return useApiQuery<any, { cdGroupId: string }>(
    CommonCodeGroupApi.detail,
    { cdGroupId },
    queryKeys.detail(cdGroupId),
    options,
  );
}

export function useCreateCommonCodeGroup(queryParams: CodeGroupListParams, options?: any) {
  const mutation = useApiMutation(CommonCodeGroupApi.create, undefined, {
    onSuccess: async (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    invalidateQueries: queryParams ? [queryKeys.list(queryParams)] : [queryKeys.all],
    ...options,
  });
  return {
    ...mutation,
    create: mutation.mutate,
  };
}

export function useUpdateCommonCodGroup(queryParams: CodeGroupListParams, options?: any) {
  const queryClient = useQueryClient();

  const mutation = useApiMutation(CommonCodeGroupApi.update, undefined, {
    onSuccess: async (data, variables, context) => {
      if (data?.cdGroupId) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.detail(data.cdGroupId),
        });
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    invalidateQueries: queryParams ? [queryKeys.list(queryParams)] : [queryKeys.all],
    ...options,
  });
  return {
    ...mutation,
    update: mutation.mutate,
  };
}

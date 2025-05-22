import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './common-code.queries';
import { CommonCodeApi } from '../api/common-code';
import { useApiMutation, useApiQuery } from '../../../shared/lib/use-authorized-query';
import { CommonCode, PageableContent } from '../../../types';

export interface CodeListParams {
  page: number;
  size: number;
  sort?: string[];
  cdGroupId?: string;
  cdGroupName?: string;
  isUsed?: string;
  cdName?: string;
}

export function useCodeList(params: CodeListParams) {
  const cleanParams = useMemo(() => {
    const result = { ...params };
    Object.keys(result).forEach(
      (key) =>
        result[key as keyof CodeListParams] === undefined &&
        delete result[key as keyof CodeListParams],
    );
    return result;
  }, [params]);

  const result = useApiQuery<PageableContent<CommonCode>, CodeListParams>(
    CommonCodeApi.list,
    cleanParams,
    queryKeys.list(cleanParams),
  );
  return {
    ...result,
    data: result.data as PageableContent<any> | undefined,
  };
}

export function useCommonCodeDetail(
  { cdGroupId, cdId }: { cdGroupId: string; cdId: string },
  options?: any,
) {
  return useApiQuery<any, { cdGroupId: string; cdId: string }>(
    CommonCodeApi.detail,
    { cdGroupId, cdId },
    queryKeys.detail(cdGroupId, cdId),
    options,
  );
}

export function useCreateCommonCode(queryParams: CodeListParams, options?: any) {
  const mutation = useApiMutation(CommonCodeApi.create, undefined, {
    onSuccess(data, variables, context) {
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

export function useUpdateCommonCode(queryParams: CodeListParams, options?: any) {
  const queryClient = useQueryClient();

  const mutation = useApiMutation(CommonCodeApi.update, undefined, {
    onSuccess: async (data, variables, context) => {
      if (data?.cdGroupId) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.detail(data.cdGroupId, data.cdId),
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
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
  };
}

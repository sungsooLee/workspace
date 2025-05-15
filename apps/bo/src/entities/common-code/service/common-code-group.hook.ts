import { QueryClient, useQuery } from '@tanstack/react-query';
import {
  apiKeys,
  mutateOptions,
  queryKeys,
  commonCodeGroupQueryOptions as queryOptions,
} from './common-code-group.queries';
import CommonCodeGroupService from '../api/common-code-group';

import { CreateCommonCodeGroup } from '../../../types/entities/common-code';
import {
  createAuthorizedMutationHook,
  createAuthorizedQueryHook,
} from '../../../shared/lib/use-authorized-query';

// 코드 그룹 목록 조회 훅
export const useCommonCodeGroupList = createAuthorizedQueryHook(
  apiKeys.list,
  (params: {
    page: number;
    size: number;
    sort: string;
    cdGroupId: string;
    cdGroupName: string;
    isUsed: string;
  }) => queryKeys.list(params),
  (params) => () =>
    CommonCodeGroupService.fetchCodeGroups(
      params.page,
      params.size,
      params.sort,
      params.cdGroupId,
      params.cdGroupName,
      params.isUsed,
    ),
);

export const invalidations = {
  afterMutate: async (
    queryClient: QueryClient,
    data: any,
    variables: CreateCommonCodeGroup,
    context: unknown,
    queryParams?: any,
  ) => {
    if (queryParams) {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.list(queryParams),
      });
    } else {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.all,
      });
    }

    if (data && data.cdGroupId) {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.detail(data.cdGroupId),
      });
    }
  },
};

export function useCommonCodeGroupDetail(cdGroupId: string) {
  return useQuery({ ...queryOptions.detail(cdGroupId), enabled: !!cdGroupId });
}

export const useCreateCommonCodeGroup = createAuthorizedMutationHook(
  apiKeys.create,
  mutateOptions.create,
  invalidations.afterMutate,
);

export const useUpdateCommonCodGroup = createAuthorizedMutationHook(
  apiKeys.update,
  mutateOptions.update,
  invalidations.afterMutate,
);

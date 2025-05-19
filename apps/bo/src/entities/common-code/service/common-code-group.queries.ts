import { CreateCommonCodeGroup } from '../../../types/entities/common-code';
import CommonCodeGroupService from '../api/common-code-group';

export const queryKeys = {
  all: ['common-code-group'] as const,
  list: (params: {
    page: number;
    size: number;
    sort: string;
    cdGroupId?: string;
    cdGroupName?: string;
    isUsed?: string;
  }) => [...queryKeys.all, 'list', params] as const,
  detail: (cdGroupId: string) => [...queryKeys.all, 'detail', cdGroupId] as const,
};

export const commonCodeGroupQueryOptions = {
  list: (
    page: number,
    size: number,
    sort: string,
    cdGroupId = '',
    cdGroupName = '',
    isUsed = '',
    // cdName = '',
  ) => ({
    queryKey: queryKeys.list({
      page,
      size,
      sort,
      cdGroupId,
      cdGroupName,
      isUsed,
      // cdName,
    }),
    queryFn: () =>
      CommonCodeGroupService.fetchCodeGroups(
        page,
        size,
        sort,
        cdGroupId,
        cdGroupName,
        isUsed,
        // cdName,
      ),
  }),
  detail: (cdGroupId: string) => ({
    queryKey: queryKeys.detail(cdGroupId),
    queryFn: () => CommonCodeGroupService.fetchCodeGroup(cdGroupId),
  }),
};

export const apiKeys = {
  list: 'commonCodeGroup.list',
  create: 'commonCodeGroup.create',
  update: 'commonCodeGroup.update',
} as const;

export const mutateOptions = {
  create: () => (payload: CreateCommonCodeGroup) => CommonCodeGroupService.createCodeGroup(payload),
  update: () => (payload: CreateCommonCodeGroup) => CommonCodeGroupService.updateCodeGroup(payload),
};

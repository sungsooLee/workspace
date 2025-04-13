import { CreateCommonCodeGroup } from '../../../types/entities/common-code';
import CommonCodeGroupService from '../api/common-code-group';

export const queryKeys = {
  all: ['common-code-group'] as const,
  list: (params: {
    page: number;
    size: number;
    cdGroupId?: string;
    cdGroupName?: string;
    cdGroupAbbreviatonEnglishName?: string;
    cdGroupContent?: string;
    validityYn?: boolean;
    cdName?: string;
  }) => [...queryKeys.all, 'list', params] as const,
  detail: (cdGroupId: string) => [...queryKeys.all, 'detail', cdGroupId] as const,
};

export const commonCodeGroupQueryOptions = {
  list: (
    page: number,
    size: number,
    cdGroupId = '',
    cdGroupName = '',
    cdGroupAbbreviatonEnglishName = '',
    cdGroupContent = '',
    validityYn = true,
    cdName = '',
  ) => ({
    queryKey: queryKeys.list({
      page,
      size,
      cdGroupId,
      cdGroupName,
      cdGroupAbbreviatonEnglishName,
      cdGroupContent,
      validityYn,
      cdName,
    }),
    queryFn: () =>
      CommonCodeGroupService.fetchCodeGroups(
        page,
        size,
        cdGroupId,
        cdGroupName,
        cdGroupAbbreviatonEnglishName,
        cdGroupContent,
        validityYn,
        cdName,
      ),
  }),
  detail: (cdGroupId: string) => ({
    queryKey: queryKeys.detail(cdGroupId),
    queryFn: () => CommonCodeGroupService.fetchCodeGroup(cdGroupId),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: CreateCommonCodeGroup) => CommonCodeGroupService.createCodeGroup(payload),
  }),
  update: () => ({
    mutationFn: (payload: CreateCommonCodeGroup) => CommonCodeGroupService.updateCodeGroup(payload),
  }),
};

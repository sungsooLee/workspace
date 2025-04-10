import { CreateCommonCodeGroup } from '../../../types/entities/common-code';
import CommonCodeGroupService from '../api/common-code-group';

export const queryKeys = {
  all: ['common-code-group'] as const,
  list: (params: {
    page: number;
    size: number;
    cdGroupNo?: string;
    cdGroupName?: string;
    cdGroupAbbreviatonEnglishName?: string;
    cdGroupContent?: string;
    validityYn?: boolean;
    cdName?: string;
  }) => [...queryKeys.all, 'list', params] as const,
  detail: (cdGroupNo: string) => [...queryKeys.all, 'detail', cdGroupNo] as const,
};

export const commonCodeGroupQueryOptions = {
  list: (
    page: number,
    size: number,
    cdGroupNo = '',
    cdGroupName = '',
    cdGroupAbbreviatonEnglishName = '',
    cdGroupContent = '',
    validityYn = true,
    cdName = '',
  ) => ({
    queryKey: queryKeys.list({
      page,
      size,
      cdGroupNo,
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
        cdGroupNo,
        cdGroupName,
        cdGroupAbbreviatonEnglishName,
        cdGroupContent,
        validityYn,
        cdName,
      ),
  }),
  detail: (cdGroupNo: string) => ({
    queryKey: queryKeys.detail(cdGroupNo),
    queryFn: () => CommonCodeGroupService.fetchCodeGroup(cdGroupNo),
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

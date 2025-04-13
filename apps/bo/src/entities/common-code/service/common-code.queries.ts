import CommonCodeService from '../api/common-code';

export const queryKeys = {
  all: ['common-code'] as const,
  list: (params: {
    page: number;
    size: number;
    cdGroupId?: string;
    cdGroupName?: string;
    cdGroupContent?: string;
    isUsed?: boolean;
    cdName?: string;
  }) => [...queryKeys.all, 'list', params] as const,
  detail: (cdGroupId: string, cdId: string) =>
    [...queryKeys.all, 'detail', cdGroupId, cdId] as const,
};

export const commonCodeQueryOptions = {
  list: (
    page: number,
    size: number,
    cdGroupId = '',
    cdGroupName = '',
    cdGroupContent = '',
    isUsed = true,
    cdName = '',
  ) => ({
    queryKey: queryKeys.list({
      page,
      size,
      cdGroupId,
      cdGroupName,
      cdGroupContent,
      isUsed,
      cdName,
    }),
    queryFn: () =>
      CommonCodeService.fetchCodes(
        page,
        size,
        cdGroupId,
        cdGroupName,
        cdGroupContent,
        isUsed,
        cdName,
      ),
  }),

  detail: (cdGroupId: string, cdId: string) => ({
    queryKey: queryKeys.detail(cdGroupId, cdId),
    queryFn: () => CommonCodeService.fetchCode(cdGroupId, cdId),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => CommonCodeService.createCode(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => CommonCodeService.updateCode(payload),
  }),
};

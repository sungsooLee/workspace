export const queryKeys = {
  all: ['common-code'] as const,
  list: (params: {
    page: number;
    size: number;
    sort?: string[];
    cdGroupId?: string;
    cdGroupName?: string;
    cdGroupContent?: string;
    isUsed?: string;
    cdName?: string;
  }) => [...queryKeys.all, 'list', params] as const,
  detail: (cdGroupId: string, cdId: string) =>
    [...queryKeys.all, 'detail', cdGroupId, cdId] as const,
};

export const queryKeys = {
  all: ['common-code-group'] as const,
  list: (params: {
    page: number;
    size: number;
    sort?: string[];
    cdGroupId?: string;
    cdGroupName?: string;
    isUsed?: string;
  }) => [...queryKeys.all, 'list', params] as const,
  detail: (cdGroupId: string) => [...queryKeys.all, 'detail', cdGroupId] as const,
};

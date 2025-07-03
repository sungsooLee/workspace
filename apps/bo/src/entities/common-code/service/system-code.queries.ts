import SystemCodeService from '../api/system-code';

export const queryKeys = {
  list: ['system-code-list'] as const,
  detail: (enumName: string) => [...queryKeys.list, 'detail', enumName] as const,
};

export const systemCodeQueryOptions = {
  list: () => ({
    queryKey: queryKeys.list,
    queryFn: () => SystemCodeService.fetchSystemCodeList(),
  }),
  detail: (enumName: string) => ({
    queryKey: queryKeys.detail(enumName),
    queryFn: () => SystemCodeService.fetchSystemCodeDetail(enumName),
  }),
};

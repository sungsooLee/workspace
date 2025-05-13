import { useQuery } from '@tanstack/react-query';

import { systemCodeQueryOptions as queryOptions } from './system-code.queries';

export function useSystemCodeList() {
  return useQuery({ ...queryOptions.list() });
}

export function useSystemCodeDetail(enumName: string) {
  return useQuery({ ...queryOptions.detail(enumName), enabled: Boolean(enumName) });
}

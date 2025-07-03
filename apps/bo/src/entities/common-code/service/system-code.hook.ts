import { useQuery } from '@tanstack/react-query';
import { systemCodeQueryOptions } from './system-code.queries';

export function useSystemCodeList() {
  return useQuery(systemCodeQueryOptions.list());
}

export function useSystemCodeDetail(enumName: string) {
  return useQuery(systemCodeQueryOptions.detail(enumName));
}

import { useApiQuery } from '../../../shared/lib/use-authorized-query';
import { SystemCodeApi } from '../api/system-code';
import { queryKeys } from './system-code.queries';

export function useSystemCodeList() {
  return useApiQuery<string[], any>(SystemCodeApi.list, undefined, queryKeys.list);
}

export function useSystemCodeDetail(enumName: string) {
  return useApiQuery<any, { enumName: string }>(
    SystemCodeApi.detail,
    { enumName },
    queryKeys.detail(enumName),
  );
}

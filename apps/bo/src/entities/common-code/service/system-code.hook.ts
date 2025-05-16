import { queryKeys, apiKeys } from './system-code.queries';
import { createAuthorizedQueryHook } from '../../../shared/lib/use-authorized-query';
import SystemCodeService from '../api/system-code';

export const useSystemCodeList = createAuthorizedQueryHook(
  apiKeys.list,
  () => queryKeys.list,
  () => () => SystemCodeService.fetchCodes(),
);

export const useSystemCodeDetail = createAuthorizedQueryHook(
  apiKeys.detail,
  (enumName: string) => queryKeys.detail(enumName),
  (enumName) => () => SystemCodeService.fetchCode(enumName),
);

import { useQuery } from '@tanstack/react-query';
import { programManageQueryOptions as queryOptions } from './program-manage.queries';

export function useFetchPrograms(rootTreeId: string, apiScopeCode: string) {
  return useQuery(queryOptions.all(rootTreeId, apiScopeCode));
}

export function useFetchProgram(apiId: string) {
  return useQuery(queryOptions.getProgram(apiId));
}

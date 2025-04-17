import { useQuery } from '@tanstack/react-query';
import { programManageQueryOptions as queryOptions } from './program-manage.queries';

export function useFetchPrograms(apiScopeCode: string) {
  return useQuery(queryOptions.all(apiScopeCode));
}

export function useFetchProgram(apiId: string) {
  return useQuery(queryOptions.getProgram(apiId));
}

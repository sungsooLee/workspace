import { useQuery } from '@tanstack/react-query';
import { ContentsListSearchParams } from '@types';
import { queryOptions } from './contents.queries';

export function useGetContentsList(param: ContentsListSearchParams) {
  return useQuery(queryOptions.list(param));
}

import { ContentsListSearchParams } from '@entities/contents';
import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './contents.queries';

export function useGetContentsList(param: ContentsListSearchParams) {
  return useQuery(queryOptions.list(param));
}

export function useGetScormDetail(contentUuid?: string) {
  return useQuery(queryOptions.scormDetail(contentUuid));
}

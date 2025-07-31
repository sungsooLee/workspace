import { ContentsListSearchParams } from '@types';
import { ContentsService } from '../api/contents';

export const queryKeys = {
  all: ['contents-all'] as const };

export const queryOptions = {
  list: (param: ContentsListSearchParams) => ({
    queryKey: queryKeys.all,
    queryFn: () => ContentsService.getContentsList(param) }),
  scormDetail: (contentUuid?: string) => ({
    queryKey: ['scorm-detail', contentUuid],
    queryFn: () => ContentsService.getScormDetail(contentUuid),
    enabled: false }) };

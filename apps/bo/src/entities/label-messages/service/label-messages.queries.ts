import { PaginationResponse } from '@shared/types/api';
import { UseQueryOptions } from '@tanstack/react-query';
import { LabelMessagesService } from '../api/label-messages';
import { LabelMessage, LabelMessagesQueryParams } from '../model/label-meesage.types';

export const queryKeys = {
  all: ['label-messages'] as const,
  detail: (id: number) => ['label-message', id] as const,
};

export const queryOptions = {
  all: <T = LabelMessage>(
    queryParam?: LabelMessagesQueryParams,
  ): UseQueryOptions<PaginationResponse<T>> => ({
    queryKey: queryKeys.all,
    queryFn: async (): Promise<PaginationResponse<T>> => LabelMessagesService.fetchAll(queryParam),
  }),
  detail: <T = LabelMessage>(id: number): UseQueryOptions<T> => {
    return {
      queryKey: queryKeys.detail(id),
      queryFn: () => LabelMessagesService.fetch<T>(id),
      enabled: id > 0,
    };
  },
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: LabelMessage): Promise<LabelMessage> =>
      LabelMessagesService.create(payload),
  }),
  update: () => ({
    mutationFn: (payload: LabelMessage): Promise<LabelMessage> =>
      LabelMessagesService.update(payload),
  }),
};

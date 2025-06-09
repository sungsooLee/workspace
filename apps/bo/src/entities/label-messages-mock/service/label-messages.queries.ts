import LabelMessagesService from '../api/label-messages';
import { LabelMessage, LabelMessagesQueryParams, PaginationResponse } from '../../../types';
import { keepPreviousData, UseQueryOptions } from '@tanstack/react-query';

export const queryKeys = {
  all: ['label-messages'] as const,
  detail: (id: number) => ['label-message', id] as const,
};

export const queryOptions = {
  all: <T = LabelMessage>(queryParam?: LabelMessagesQueryParams) => {
    console.log('label-messages.queries.ts :: queryParam :: ', queryParam);
    return {
      queryKey: [queryKeys.all, queryParam],
      queryFn: async (): Promise<PaginationResponse<T>> =>
        LabelMessagesService.fetchAll(queryParam),
      enabled: !!queryParam,
      placeholderData: keepPreviousData,
    };
  },
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

import LabelMessagesService from '../api/label-messages';
import { LabelMessage } from '../../../types';
import { UseQueryOptions } from '@tanstack/react-query';

export const queryKeys = {
  all: ['label-messages'] as const,
  detail: (id: number) => [...queryKeys.all, id] as const,
};

export const queryOptions = {
  all: <T = LabelMessage>() => ({
    queryKey: queryKeys.all,
    queryFn: async (): Promise<T[]> => LabelMessagesService.fetchAll(),
  }),
  detail: <T = LabelMessage>(id: number): UseQueryOptions<T> => {
    return {
      queryKey: queryKeys.detail(id),
      queryFn: () => LabelMessagesService.fetch<T>(id),
      enabled: !!id,
    };
  },
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: LabelMessage) => LabelMessagesService.create(payload),
  }),
  update: () => ({
    mutationFn: (payload: LabelMessage) => LabelMessagesService.update(payload),
  }),
};

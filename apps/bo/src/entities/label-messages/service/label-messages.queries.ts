import LabelMessagesService from '../api/label-messages';
import { getQuerySkipToken } from '@learnway/shared';
import { LabelMessage } from '../../../types';

export const queryKeys = {
  all: ['label-messages'] as const,
  detail: (id: number) => [...queryKeys.all, id] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async (): Promise<LabelMessage[]> => LabelMessagesService.fetchAll(),
  }),
  detail: (id?: number) =>
    id
      ? {
          queryKey: queryKeys.detail(id),
          queryFn: (): Promise<any> => LabelMessagesService.fetch(id),
        }
      : getQuerySkipToken<LabelMessage>(),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: LabelMessage) => LabelMessagesService.create(payload),
  }),
  update: () => ({
    mutationFn: (payload: LabelMessage) => LabelMessagesService.update(payload),
  }),
};

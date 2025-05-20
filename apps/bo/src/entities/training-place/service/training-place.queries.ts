import TrainingPlaceService from '../api/training-place';

import { getQuerySkipToken } from '@learnway/shared';

export const queryKeys = {
  all: ['training-place-all'] as const,
  detail: (uuid: string) => [...queryKeys.all, uuid] as const,
};

export const queryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => TrainingPlaceService.fetchTrainingPlaces(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (uuid?: string) =>
    uuid
      ? {
          queryKey: queryKeys.detail(uuid),
          queryFn: (): Promise<any> => TrainingPlaceService.fetchTrainingPlace(uuid),
        }
      : getQuerySkipToken<any>(),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => TrainingPlaceService.createTrainingPlace(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => TrainingPlaceService.updateTrainigPlace(payload),
  }),
  delete: () => ({
    mutationFn: (payload: string) => TrainingPlaceService.deleteTrainingPlace(payload),
  }),
};

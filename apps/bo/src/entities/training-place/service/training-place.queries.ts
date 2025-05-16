import TrainingPlaceService from '../api/training-place';

import { getQuerySkipToken } from '@learnway/shared';

export const queryKeys = {
  all: ['training-place-all'] as const,
  detail: (educationPlaceId: number) => [...queryKeys.all, educationPlaceId] as const,
};

export const queryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => TrainingPlaceService.fetchTrainingPlaces(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (educationPlaceId?: number) =>
    educationPlaceId
      ? {
          queryKey: queryKeys.detail(educationPlaceId),
          queryFn: (): Promise<any> => TrainingPlaceService.fetchTrainingPlace(educationPlaceId),
        }
      : getQuerySkipToken<any>(),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => TrainingPlaceService.createTrainingPlace(payload),
  }),
};

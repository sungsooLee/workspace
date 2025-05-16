import TrainingPlaceService from '../api/training-place';

export const queryKeys = {
  all: ['training-place-all'] as const,
};

export const queryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => TrainingPlaceService.fetchTrainingPlaces(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => TrainingPlaceService.createTrainingPlace(payload),
  }),
};

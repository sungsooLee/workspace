import TrainingPlaceService from '../api/training-place';

export const queryKeys = {
  all: ['training-place-all'] as const,
};

export const trainingPlaceQueryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => TrainingPlaceService.fetchTrainingPlaces(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};

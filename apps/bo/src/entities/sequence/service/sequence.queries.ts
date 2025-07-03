import { SequenceResponse, SequencesRequest } from '../../../types';
import SequenceService from '../api/sequence';

export const queryKeys = {
  all: ['sequence-all'] as const,
  get: ['sequence'] as const,
};

export const queryOptions = {
  all: (params: SequencesRequest) => ({
    queryKey: queryKeys.all,
    queryFn: () => SequenceService.fetchSequences(params),
  }),
  get: (id: string) => ({
    queryKey: queryKeys.get,
    queryFn: () => SequenceService.fetchSequence(id),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: SequenceResponse) => SequenceService.createSequence(payload),
  }),
  update: () => ({
    mutationFn: (payload: SequenceResponse) => SequenceService.updateSequence(payload),
  }),
  delete: () => ({
    mutationFn: (id: string) => SequenceService.deleteSequence(id),
  }),
};

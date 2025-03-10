import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { SequenceResponse, SequencesRequest } from '../../../types';

export default class SequenceService {
  static fetchSequences(params: SequencesRequest): Promise<SequenceResponse> {
    return httpService.get<SequenceResponse>(`${PMSApiPrefix()}/sequence`, params);
  }
  static fetchSequence(id: string) {
    return httpService.get<SequenceResponse>(`${PMSApiPrefix()}/sequence/${id}`);
  }

  static createSequence(payload: any) {
    return httpService.post<SequenceResponse>(`${PMSApiPrefix()}/sequence`, payload);
  }

  static updateSequence(payload: any) {
    return httpService.post<SequenceResponse>(`${PMSApiPrefix()}/sequence`, payload);
  }

  static deleteSequence(id: string) {
    return httpService.post<SequenceResponse>(`${PMSApiPrefix()}/sequence`, { id });
  }
}

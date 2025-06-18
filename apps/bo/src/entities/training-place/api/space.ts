import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';
import { PageableContent } from '@types';

export default class SpaceService {
  static fetchList(params: any) {
    return httpService.get<PageableContent<any>>(`${LMSApiPrefix()}/space`, params);
  }

  static create(payload: any) {
    return httpService.post<any>(`${LMSApiPrefix()}/space`, payload);
  }
}

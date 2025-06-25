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

  static fetch(uuid: string) {
    return httpService.get<any>(`${LMSApiPrefix()}/space/${uuid}`);
  }

  static existsCode(code: string) {
    return httpService.get<any>(`${LMSApiPrefix()}/space/duplicate/${code}`);
  }
}

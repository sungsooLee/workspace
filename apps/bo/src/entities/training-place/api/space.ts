import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';
import { PageableContent } from '@types';
import { SpaceListItem, Space } from 'src/types/entities/space';

export default class SpaceService {
  static fetchList(params: any) {
    return httpService.get<PageableContent<SpaceListItem>>(`${LMSApiPrefix()}/space`, params);
  }

  static create(payload: any) {
    return httpService.post<any>(`${LMSApiPrefix()}/space`, payload);
  }

  static update(payload: any) {
    return httpService.put<any>(`${LMSApiPrefix()}/space/${payload.learningSpaceId}`, payload);
  }

  static fetch(id: number) {
    return httpService.get<Space>(`${LMSApiPrefix()}/space/${id}`);
  }

  static dalete(id: number) {
    return httpService.delete<Space>(`${LMSApiPrefix()}/space/${id}`);
  }

  static existsCode(code: string) {
    return httpService.get<any>(`${LMSApiPrefix()}/space/duplicate/${code}`);
  }
}

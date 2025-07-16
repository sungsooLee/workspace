import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class ContentService {
  static getDetail(contentUuid: string): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/content/${contentUuid}`);
  }
  static getProgressMulti(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/content/progress/multi`, payload);
  }
}

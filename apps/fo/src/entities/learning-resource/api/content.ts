import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export default class contentService {
  static getDetail(contentUuid: string): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/content/${contentUuid}`);
  }
}

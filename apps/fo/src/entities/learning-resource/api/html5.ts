import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class Html5Service {
  static getHtml5Resource(contentUuid: string): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/html5/${contentUuid}/resource`);
  }
}

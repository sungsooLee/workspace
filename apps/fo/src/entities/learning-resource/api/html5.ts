import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class Html5Service {
  static saveHtml5Learning(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/html5/learning`, payload);
  }
  static getHtml5Resource(contentUuid: string): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/html5/${contentUuid}/resource`);
  }
}

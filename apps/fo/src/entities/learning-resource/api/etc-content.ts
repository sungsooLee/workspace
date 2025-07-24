import { fileDownload, httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class EtcContentService {
  static download(params: any): Promise<any> {
    return fileDownload({ url: `${CMSApiPrefix()}/etc/content/download`, params });
  }
  static getEtcContentResource(contentUuid: string): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/etc/${contentUuid}/resource`);
  }
}

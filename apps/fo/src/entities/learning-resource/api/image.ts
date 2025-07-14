import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';
import { CmsImageContent } from '@learnway/types';

export class ImageService {
  static saveImageLearning(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/image/learning`, payload);
  }
  static getImageResource(contentUuid: string): Promise<CmsImageContent> {
    return httpService.get<CmsImageContent>(`${CMSApiPrefix()}/image/${contentUuid}/resource`);
  }
}

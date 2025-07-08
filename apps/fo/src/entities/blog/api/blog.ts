import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class BlogService {
  static getBlogResouce(contentUuid: string): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/blog/${contentUuid}/resource`);
  }
}

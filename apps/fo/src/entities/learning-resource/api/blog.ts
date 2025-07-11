import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class BlogService {
  static getBlogResource(contentUuid: string): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/blog/${contentUuid}/resource`);
  }
}

import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export const blogApi = {
  getBlogResource: (contentUuid: string) =>
    httpService.get<any>(`${CMSApiPrefix()}/blog/${contentUuid}/resource`),
};

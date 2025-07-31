import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';
import { CmsImageContent } from '@learnway/types';

export const imageApi = {
  saveImageLearning: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/image/learning`, payload);
  },
  getImageResource: (contentUuid: string) => {
    return httpService.get<CmsImageContent>(`${CMSApiPrefix()}/image/${contentUuid}/resource`);
  },
};

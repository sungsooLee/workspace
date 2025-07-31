import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export const html5Api = {
  saveHtml5Learning: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/html5/learning`, payload);
  },
  getHtml5Resource: (contentUuid: string) => {
    return httpService.get<any>(`${CMSApiPrefix()}/html5/${contentUuid}/resource`);
  },
};

import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';
import { CmsVideoContentInfoResDto } from '@learnway/types';

export const videoApi = {
  watchLog: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log`, payload);
  },

  watchLogStatistics: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log/statistics`, payload);
  },

  watchInitialize: (payload: any) => {
    const { contentUuid } = payload;
    return httpService.get<CmsVideoContentInfoResDto>(
      `${CMSApiPrefix()}/video/${contentUuid}/watch/initialize`,
      payload,
    );
  },
};

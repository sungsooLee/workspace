import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';
import { CmsVideoContentInfoResDto } from '@learnway/types';

export class VideoService {
  static watchLog(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log`, payload);
  }
  static watchLogStatistics(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log/statistics`, payload);
  }
  static watchInitialize(payload: any): Promise<CmsVideoContentInfoResDto> {
    const { contentUuid } = payload;
    return httpService.get<CmsVideoContentInfoResDto>(
      `${CMSApiPrefix()}/video/${contentUuid}/watch/initialize`,
      payload,
    );
  }
}

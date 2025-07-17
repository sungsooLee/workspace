import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class VideoService {
  static watchLog(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log`, payload);
  }
  static watchLogStatistics(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log/statistics`, payload);
  }
  static watchInitialize(payload: any): Promise<any> {
    const { contentUuid } = payload;
    return httpService.get<any>(`${CMSApiPrefix()}/video/${contentUuid}/watch/initialize`, payload);
  }
}

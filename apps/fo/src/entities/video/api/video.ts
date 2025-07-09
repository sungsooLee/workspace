import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class VideoService {
  static watichLog(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log`, payload);
  }
}

import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class RequestChannelService {
  static async postApprovalRejected(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/request/channel/approval/rejected`, payload);
  }

  static async postApprovalApproved(payload: any) {
    return httpService.post(`${PMSApiPrefix()}/request/channel/approval/approved`, payload);
  }

  static async getRequsetChannelList(payload: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/request/channel`, payload);
  }

  static async getRequestChannelDetail(channelRequestUuid: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/request/channel/${channelRequestUuid}`);
  }

  static async getRequestChannelAcceptsList(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/request/channel/accepts`, params);
  }
}

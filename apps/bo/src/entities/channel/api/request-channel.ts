import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';

export default class RequestChannelService {
  static async postApprovalRejected(payload: any) {
    return httpService.post<any>(`${LMSApiPrefix()}/request/channel/approval/rejected`, payload);
  }

  static async postApprovalApproved(payload: any) {
    return httpService.post(`${LMSApiPrefix()}/request/channel/approval/approved`, payload);
  }

  static async getRequsetChannelList(payload: any) {
    return httpService.get<any>(`${LMSApiPrefix()}/request/channel`, payload);
  }

  static async getRequestChannelDetail(channelRequestUuid: string) {
    return httpService.get<any>(`${LMSApiPrefix()}/request/channel/${channelRequestUuid}`);
  }

  static async getRequestChannelAcceptsList(params: any) {
    return httpService.get<any>(`${LMSApiPrefix()}/request/channel/accepts`, params);
  }
}

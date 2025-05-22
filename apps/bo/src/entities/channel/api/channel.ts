import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';

export default class ChannelService {
  static async getChannelList(params: any) {
    return httpService.get<any>(`${LMSApiPrefix()}/channel`, params);
  }

  static async getChannelDetail(channelId: number) {
    return httpService.get(`${LMSApiPrefix()}/channel/${channelId}`);
  }

  static async createChannel(payload: any) {
    return httpService.post<any>(`${LMSApiPrefix()}/channel`, payload);
  }

  static async updateChannelDetail(channelId: number, body: any) {
    return httpService.put<any>(`${LMSApiPrefix()}/channel/${channelId}`, body);
  }

  static async deleteChannel(channelId: number) {
    return httpService.delete<any>(`${LMSApiPrefix()}/channel/${channelId}`);
  }

  static async getAutoChannelAddress() {
    return httpService.get<any>(`${LMSApiPrefix()}/channel/url/random`);
  }

  static async existsChannelUrl(channelId: number, channelMainLinkContent: string) {
    return httpService.get<any>(`${LMSApiPrefix()}/channel/url/exist`, {
      channelId,
      channelMainLinkContent,
    });
  }
}

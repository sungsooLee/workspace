import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { ChannelByRoleId, PaginationResponse } from '@types';

export default class ChannelService {
  static async getChannelList(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/channel`, params);
  }

  static async getChannelDetail(channelId: number) {
    return httpService.get(`${PMSApiPrefix()}/channel/${channelId}`);
  }

  static async createChannel(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/channel`, payload);
  }

  static async updateChannelDetail(channelId: number, body: any) {
    return httpService.put<any>(`${PMSApiPrefix()}/channel/${channelId}`, body);
  }

  static async deleteChannel(channelId: number) {
    return httpService.delete<any>(`${PMSApiPrefix()}/channel/${channelId}`);
  }

  static async getAutoChannelAddress() {
    return httpService.get<any>(`${PMSApiPrefix()}/channel/url/random`);
  }

  static async existsChannelUrl(channelId: number, channelMainLinkContent: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/channel/url/exist`, {
      channelId,
      channelMainLinkContent,
    });
  }

  /**
   * @description 채널 목록조회 ( 역할 기준 )
   * @param roleId
   * @returns ChannelByRoleId[]
   */
  static fetchChannelByRoleId<T = ChannelByRoleId>(roleId: number): Promise<PaginationResponse<T>> {
    return httpService.get<PaginationResponse<T>>(`${PMSApiPrefix()}/channel/role/${roleId}`, {
      page: 0,
      size: 1000,
    });
  }
}

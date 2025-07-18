import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { ChannelByRoleId } from '@types';

export default class ChannelService {
  static async getChannelList(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/channel`, params);
  }

  static async getChannelDetail(channelUuid: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/channel/${channelUuid}`);
  }

  static async createChannel(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/channel`, payload);
  }

  static async updateChannelDetail(payload: any) {
    return httpService.put<any>(`${PMSApiPrefix()}/channel/${payload.channelUuid}`, payload);
  }

  static async deleteChannel(channelId: number) {
    return httpService.delete<any>(`${PMSApiPrefix()}/channel/${channelId}`);
  }

  static async existsChannelMainId(channelMainId: string, channelUuid: any = undefined) {
    return httpService.get<any>(`${PMSApiPrefix()}/channel/channelMainId/exist`, {
      channelMainId,
      channelUuid,
    });
  }

  /**
   * @description 채널 목록조회 ( 역할 기준 )
   * @param roleId
   * @returns ChannelByRoleId[]
   */
  static fetchChannelByRoleId<T = ChannelByRoleId[]>(roleId: number): Promise<T> {
    return httpService.get<T>(`${PMSApiPrefix()}/channel/role/${roleId}`);
  }
}

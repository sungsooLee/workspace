import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { LabelMessage } from '@types';

export default class LabelMessagesService {
  //라벨 메세지 목록 조회
  static async fetchAll<T = LabelMessage>(): Promise<T[]> {
    return httpService.get<T[]>(`${PMSApiPrefix()}/label-messages`);
    // return new Promise((resolve) => resolve(Mock));
  }

  //라벨 메세지 조회
  static async fetch<T = LabelMessage>(id: number): Promise<T> {
    return httpService.get<T>(`${PMSApiPrefix()}/label-messages/${id}`);
  }

  //라벨 메세지 생성
  static async create<T = LabelMessage>(payload: T) {
    return httpService.post<T>(`${PMSApiPrefix()}/label-messages`, payload);
  }

  //라벨 메세지 수정
  static async update<T = LabelMessage>(payload: T) {
    return httpService.put<T>(`${PMSApiPrefix()}/label-messages`, payload);
  }
}

//-------------------
// Mock
//-------------------
const fetchCompaniesMock = Array(10)
  .fill(null)
  .map((d, i) => ({ channelId: `channel_id${i}`, channelName: `channel_name${i}` }));

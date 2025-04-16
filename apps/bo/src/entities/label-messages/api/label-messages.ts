import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { LabelMessage } from '@types';

export default class LabelMessagesService {
  //라벨 메세지 목록 조회
  static fetchAll() {
    return httpService.get<LabelMessage[]>(`${PMSApiPrefix()}/label-messages`);
    // return new Promise((resolve) => resolve(Mock));
  }

  //라벨 메세지 조회
  static fetch(id: number) {
    return httpService.get<LabelMessage>(`${PMSApiPrefix()}/label-messages/${id}`);
  }

  //라벨 메세지 생성
  static create(payload: LabelMessage) {
    return httpService.post<LabelMessage>(`${PMSApiPrefix()}/label-messages`, payload);
  }

  //라벨 메세지 수정
  static update(payload: LabelMessage) {
    return httpService.post<LabelMessage>(`${PMSApiPrefix()}/label-messages`, payload);
  }
}

//-------------------
// Mock
//-------------------
const fetchCompaniesMock = Array(10)
  .fill(null)
  .map((d, i) => ({ channelId: `channel_id${i}`, channelName: `channel_name${i}` }));

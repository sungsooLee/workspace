import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { PageableContent } from '@types';

export default class HolidayService {
  static fetchListHoliday(params: any) {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/holiday`, params);
  }
}

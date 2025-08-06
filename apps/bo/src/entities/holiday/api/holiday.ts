import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { PageableContent } from '../../../shared/types/page-meta';

export default class HolidayService {
  static fetchListHoliday(params: any) {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/holiday`, params);
  }
  static fetchHoliday(holidayId: number) {
    return httpService.get(`${PMSApiPrefix()}/holiday/${holidayId}`);
  }
  static createHoliday(params: any) {
    return httpService.post(`${PMSApiPrefix()}/holiday`, params);
  }
  static updateHoliday(params: any) {
    return httpService.put(`${PMSApiPrefix()}/holiday/${params.holidayId}`, params);
  }
  static deleteHoliday(holidayId: number) {
    return httpService.delete(`${PMSApiPrefix()}/holiday/${holidayId}`);
  }
  static excelUploadHoliday(params: any) {
    return httpService.post(`${PMSApiPrefix()}/holiday/excelUpload`, params);
  }
  static excelDownloadHoliday(params: any) {
    return httpService.get(`${PMSApiPrefix()}/holiday/excelDownload`, params);
  }
}

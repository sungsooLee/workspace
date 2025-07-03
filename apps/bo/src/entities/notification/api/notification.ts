import { httpService } from '@learnway/shared';
import { Notification } from '@types';

/**
 * GNB > 알람
 */
export default class NotificationService {
  /**
   * 알람 카운트 조회
   */
  static fetchNotificationCount(): Promise<number> {
    return httpService.get<any>(`/pms-module/api/v1/alarm/uncheck-count`);
  }
  /**
   * 알람 목록 조회
   */
  static fetchNotification(): Promise<Notification[]> {
    return httpService.get<any>(`/pms-module/api/v1/alarm`);
  }
  /**
   * 알람 전체읽음 처리
   */
  static readAllNotification(): Promise<Notification[]> {
    return httpService.put<any>(`/pms-module/api/v1/alarm/read-all`, {});
  }
  /**
   * 알람 단건 읽음 처리
   */
  static readNotification(alarmId: number): Promise<any> {
    return httpService.put<any>(`/pms-module/api/v1/alarm/read/${alarmId}`, {});
  }
  /**
   * 알람 전체삭제 처리
   */
  static deleteAllNotification(): Promise<any> {
    return httpService.delete<any>(`/pms-module/api/v1/alarms`);
  }
  /**
   * 알람 단건 삭제 처리
   */
  static deleteNotification(alarmId: number): Promise<any> {
    return httpService.delete<any>(`/pms-module/api/v1/alarm/${alarmId}`);
  }
}

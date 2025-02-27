import { httpService } from '@learnway/shared';

export default class NotificationService {
  static async getNotifications(userUUID: string) {
    const response = await httpService.get<any>(`/pms-module/api/v1/alarm/${userUUID}`);
    console.log(response);
    return response.json();
  }

  static async getUncheckCount(userUUID: string) {
    try {
      const response = await httpService.get<number>(
        `/pms-module/api/v1/alarm/uncheck-count/${userUUID}`,
      );
      console.log('읽지 않은 알림 수 응답:', response);
      return typeof response === 'number' ? response : 0;
    } catch (error) {
      console.error('읽지 않은 알림 수 조회 에러:', error);
      return 0;
    }
  }

  static async markAsRead(userUUID: string, alarmId: number) {
    const response = await fetch(`/pms-module/api/v1/alarm/read/${userUUID}/${alarmId}`, {
      method: 'PUT',
    });
    return response.json();
  }

  static async checkAllNotifications(userUUID: string) {
    const response = await fetch(`/pms-module/api/v1/alarm/check/${userUUID}`, { method: 'PUT' });
    return response.json();
  }
}

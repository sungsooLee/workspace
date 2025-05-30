export interface Notification {
  alarmId: number;
  userId: number;
  createdDate: string;
  alarmSummary: string;
  alarmDetail: string;
  alarmLink: string;
  isAlarmConfirm: boolean;
}

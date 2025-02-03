export const DATE_TIME_FORMAT = {
  MONTH: 'dateFormatMonth',
  DATE: 'dateFormatDay',
  DATETIME_HOUR: 'dateTimeFormatHour',
  DATETIME_MIN: 'dateTimeFormatHourMinute',
  DATETIME_SEC: 'dateTimeFormatHourSecend',
  DATETIME_MLS: 'dateTimeFormatHourMilliSecend', //MilliSec
  HOUR_MIN: 'timeFormatHourMinute',
};

export type DATE_TIME_FORMAT = (typeof DATE_TIME_FORMAT)[keyof typeof DATE_TIME_FORMAT];

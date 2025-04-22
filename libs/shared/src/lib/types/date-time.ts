export const DATE_TIME_FORMAT = {
  YEAR: 'dateFormatYear',
  MONTH: 'dateFormatMonth',
  DATE: 'dateFormatDay',
  DATETIME_HOUR: 'dateTimeFormatHour',
  DATETIME_MIN: 'dateTimeFormatHourMinute',
  DATETIME_SEC: 'dateTimeFormatHourSecond',
  DATETIME_WEEK_SEC: 'dateTimeFormatWeekHourSecond',
  DATETIME_MLS: 'dateTimeFormatHourMilliSecond',
  HOUR_MIN: 'timeFormatHourMinute',
  MIN_SEC: 'timeFormatMinuteSecond',
};

export type DATE_TIME_FORMAT = (typeof DATE_TIME_FORMAT)[keyof typeof DATE_TIME_FORMAT];

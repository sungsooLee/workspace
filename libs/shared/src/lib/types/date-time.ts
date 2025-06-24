export const DATE_TIME_FORMAT = {
  YEAR: 'dateFormatYear',
  MONTH: 'dateFormatMonth',
  MONTH_DAY: 'dateFormatMonthDay',
  DATE: 'dateFormatDay',
  DATE_SERVER: 'dateFormatDayServer',
  DATETIME_HOUR: 'dateTimeFormatHour',
  DATETIME_MIN: 'dateTimeFormatHourMinute',
  DATETIME_SEC: 'dateTimeFormatHourSecond',
  DATETIME_WEEK_SEC: 'dateTimeFormatWeekHourSecond',
  DATETIME_MLS: 'dateTimeFormatHourMilliSecond',
  HOUR_MIN: 'timeFormatHourMinute',
  MIN_SEC: 'timeFormatMinuteSecond',
  HOUR_MIN_SEC: 'timeFormatHourMinuteSecond',
};

export type DATE_TIME_FORMAT = (typeof DATE_TIME_FORMAT)[keyof typeof DATE_TIME_FORMAT];

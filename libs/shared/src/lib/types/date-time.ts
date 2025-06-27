export const DATE_TIME_FORMAT = {
  YEAR: 'dateFormatYear',
  MONTH: 'dateFormatMonth',
  MONTH_DAY: 'dateFormatMonthDay',
  DATE: 'dateFormatDay',
  DATE_SERVER: 'dateFormatDayServer', // MM-DD
  DATETIME_HOUR: 'dateTimeFormatHour', // YYYY-MM-DD HH
  DATETIME_MIN: 'dateTimeFormatHourMinute', // YYYY-MM-DD HH:mm
  DATETIME_SEC: 'dateTimeFormatHourSecond', // YYYY-MM-DD HH:mm:ss
  DATETIME_WEEK_SEC: 'dateTimeFormatWeekHourSecond',
  DATETIME_MLS: 'dateTimeFormatHourMilliSecond',
  HOUR_MIN: 'timeFormatHourMinute',
  MIN_SEC: 'timeFormatMinuteSecond',
  HOUR_MIN_SEC: 'timeFormatHourMinuteSecond',
};

export type DATE_TIME_FORMAT = (typeof DATE_TIME_FORMAT)[keyof typeof DATE_TIME_FORMAT];

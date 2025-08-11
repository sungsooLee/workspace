export const DATE_TIME_FORMAT = {
  YEAR: 'dateFormatYear', // YYYY
  MONTH: 'dateFormatMonth', // MM
  MONTH_DAY: 'dateFormatMonthDay', // MM-DD
  DATE: 'dateFormatDay', // YYYY-MM-DD
  DATE_SERVER: 'dateFormatDayServer', // MM-DD
  DATETIME_HOUR: 'dateTimeFormatHour', // YYYY-MM-DD HH
  DATETIME_MIN: 'dateTimeFormatHourMinute', // YYYY-MM-DD HH:mm
  DATETIME_SEC: 'dateTimeFormatHourSecond', // YYYY-MM-DD HH:mm:ss
  DATETIME_WEEK_SEC: 'dateTimeFormatWeekHourSecond', // YYYY-MM-DD(ddd) HH:mm:ss
  DATETIME_MLS: 'dateTimeFormatHourMilliSecond', // YYYY-MM-DD HH:mm:ss.SSS
  HOUR_MIN: 'timeFormatHourMinute', // HH:mm
  MIN_SEC: 'timeFormatMinuteSecond', // mm:ss
  HOUR_MIN_SEC: 'timeFormatHourMinuteSecond', // HH:mm:ss
};

export type DATE_TIME_FORMAT = (typeof DATE_TIME_FORMAT)[keyof typeof DATE_TIME_FORMAT];

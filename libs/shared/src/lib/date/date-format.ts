import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '../types';
import { getDefaultLang } from '../i18n/i18n';

export function initTimeLocale() {
  changeTimeLocale(getDefaultLang());
}

export function changeTimeLocale(lang: string) {
  // datejs i18n
  // ref: https://day.js.org/docs/en/i18n/loading-into-browser
  // ref: https://github.com/ant-design/antd-dayjs-webpack-plugin
  // support locale
  // import 'dayjs/locale/ko';
  // import 'dayjs/locale/en';
  // import 'dayjs/locale/ja';
  // import 'dayjs/locale/zh-cn';
  switch (lang) {
    case 'en':
    case 'ko':
    case 'ja':
      dayjs.locale(lang);
      break;
    case 'cn':
    case 'zh-cn':
      dayjs.locale('zh-cn');
      break;
  }
}

export function getDateTimeFormat(dateTimeFormat: DATE_TIME_FORMAT) {
  switch (dateTimeFormat) {
    case DATE_TIME_FORMAT.YEAR:
      return timeFormatYear();
    case DATE_TIME_FORMAT.MONTH:
      return timeFormatMonth();
    case DATE_TIME_FORMAT.DATETIME_HOUR:
      return timeFormatHour();
    case DATE_TIME_FORMAT.DATETIME_MIN:
      return timeFormatMinute();
    case DATE_TIME_FORMAT.DATETIME_SEC:
      return timeFormatSecond();
    case DATE_TIME_FORMAT.DATETIME_WEEK_SEC:
      return timeFormatWeekSecond();
    case DATE_TIME_FORMAT.DATETIME_MLS:
      return timeFormatMilliSecond();
    case DATE_TIME_FORMAT.HOUR_MIN:
      return timeFormatHourMinute();
    case DATE_TIME_FORMAT.MIN_SEC:
      return timeFormatMinuteSecond();
    case DATE_TIME_FORMAT.DATE:
    default:
      return timeFormatDate();
  }
}

export function timeFormatYear() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'YYYY';
  }
}

export function timeFormatMonth() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MM/YYYY';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'YYYY-MM';
  }
}

export function timeFormatDate() {
  // TODO: const locale = dayjs.locale();
  const locale = getDefaultLang();
  console.log(locale);
  switch (locale) {
    case 'en':
      return 'MM-DD-YYYY';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'YYYY-MM-DD';
  }
}

export function timeFormatMonthDate() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MMM/DD';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'MM-DD';
  }
}

export function timeFormatMonthHourMinDate() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MMM/DD HH:mm';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'MM-DD HH:mm';
  }
}

export function timeFormatHour() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MMM/DD/YYYY HH';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'YYYY-MM-DD HH';
  }
}

export function timeFormatMinute() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MMM/DD/YYYY HH:mm';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'YYYY-MM-DD HH:mm';
  }
}

export function timeFormatHourMinute() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'HH:mm';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'HH:mm';
  }
}

export function timeFormatMinuteSecond() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'mm:ss';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'mm:ss';
  }
}

export function timeFormatSecond() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MMM/DD/YYYY HH:mm:ss';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'YYYY-MM-DD HH:mm:ss';
  }
}

export function timeFormatWeekSecond() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MMM/DD/YYYY(ddd) HH:mm:ss';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'YYYY-MM-DD(ddd) HH:mm:ss';
  }
}

export function timeFormatMilliSecond() {
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MMM/DD/YYYY HH:mm:ss.SSS';
    case 'ko':
    case 'ja':
    case 'cn':
    case 'zh-cn':
    default:
      return 'YYYY-MM-DD HH:mm:ss.SSS';
  }
}

/**
 * ISO 날짜 문자열을 포맷팅된 날짜/시간 문자열로 변환합니다.
 * @param dateString ISO 형식의 날짜 문자열 (예: "2025-04-11T06:02:02.416Z")
 * @param format 적용할 포맷 (기본값: DATE_TIME_FORMAT.DATETIME_SEC)
 * @returns 포맷팅된 날짜 문자열 또는 빈 문자열(유효하지 않은 날짜)
 */
export function formatISODateString(
  dateString: string | null | undefined,
  format: DATE_TIME_FORMAT = DATE_TIME_FORMAT.DATETIME_SEC,
): string {
  if (!dateString) return '';

  const date = dayjs(dateString);
  if (!date.isValid()) return '';

  const formatStr = getDateTimeFormat(format);
  return date.format(formatStr);
}

export function convertDateFormatToFns(dateFormat: string): string {
  // dayjs 포맷을 date-fns 포맷으로 변환
  let fnsFormat = dateFormat;

  // 연도
  fnsFormat = fnsFormat.replace(/YYYY/g, 'yyyy');
  fnsFormat = fnsFormat.replace(/YY/g, 'yy');

  // 월
  fnsFormat = fnsFormat.replace(/MMMM/g, 'LLLL'); // 전체 월 이름
  fnsFormat = fnsFormat.replace(/MMM/g, 'LLL'); // 축약 월 이름
  fnsFormat = fnsFormat.replace(/MM/g, 'LL'); // 2자리 월 (01-12)
  fnsFormat = fnsFormat.replace(/M/g, 'L'); // 1-2자리 월 (1-12)

  // 일
  fnsFormat = fnsFormat.replace(/DD/g, 'dd'); // 2자리 일 (01-31)
  fnsFormat = fnsFormat.replace(/D/g, 'd'); // 1-2자리 일 (1-31)

  // 시간
  fnsFormat = fnsFormat.replace(/HH/g, 'HH'); // 24시간 형식 (00-23)
  fnsFormat = fnsFormat.replace(/H/g, 'H'); // 24시간 형식 (0-23)
  fnsFormat = fnsFormat.replace(/hh/g, 'hh'); // 12시간 형식 (01-12)
  fnsFormat = fnsFormat.replace(/h/g, 'h'); // 12시간 형식 (1-12)

  // 분
  fnsFormat = fnsFormat.replace(/mm/g, 'mm'); // 2자리 분 (00-59)
  fnsFormat = fnsFormat.replace(/m/g, 'm'); // 1-2자리 분 (0-59)

  // 초
  fnsFormat = fnsFormat.replace(/ss/g, 'ss'); // 2자리 초 (00-59)
  fnsFormat = fnsFormat.replace(/s/g, 's'); // 1-2자리 초 (0-59)

  // 밀리초
  fnsFormat = fnsFormat.replace(/SSS/g, 'SSS'); // 3자리 밀리초

  // 요일
  fnsFormat = fnsFormat.replace(/dddd/g, 'EEEE'); // 전체 요일 이름
  fnsFormat = fnsFormat.replace(/ddd/g, 'EEE'); // 축약 요일 이름

  // AM/PM
  fnsFormat = fnsFormat.replace(/A/g, 'a'); // AM/PM
  fnsFormat = fnsFormat.replace(/a/g, 'a'); // am/pm

  console.log('convertDateFormatToFns:', dateFormat, '->', fnsFormat);

  return fnsFormat;
}

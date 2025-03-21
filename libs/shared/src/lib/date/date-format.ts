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
    case DATE_TIME_FORMAT.DATETIME_MLS:
      return timeFormatMilliSecond();
    case DATE_TIME_FORMAT.HOUR_MIN:
      return timeFormatHourMinute();
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
  // TODO: const locale = dayjs.locale();
  const locale = getDefaultLang();
  switch (locale) {
    case 'en':
      return 'MMM/YYYY';
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
  switch (locale) {
    case 'en':
      return 'MMM/DD/YYYY';
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

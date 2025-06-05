import dayjs, { ManipulateType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { t } from 'i18next';
import { DATE_TIME_FORMAT } from '../types/date-time';
import { getDateTimeFormat } from './date-format';

dayjs.extend(utc);
dayjs.extend(timezone);

/*
day         d	  Day
week  	    w	  Week of Year
quarter	    Q	  Quarter
month       M	  Month (January as 0, December as 11)
year	      y	  Year
hour	      h	  Hour
minute	    m	  Minute
second	    s	  Second
millisecond	ms	Millisecond
*/
type DateShorthandUnit = 'd' | 'w' | 'Q' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms';
/**
 *  Date 형식을 지정된 format 형태의 문자열로 반환
 * @param date date 객체
 * @param format 변환 포맷
 * @return string
 */
export const getDateToString = (date: Date, format = DATE_TIME_FORMAT.DATE) => {
  return dayjs(date).format(getDateTimeFormat(format));
};

/**
 * date 기준 unit 에 따른 날짜를 반환
 * @param date 계산에 사용할 date type 기준 date
 * @param unit 날짜계산에 사용될 unit 'day' | 'month' | 'year' | 'date' 등등
 * @param offset 기준 데이터와의 차이 int +- number
 * @return Date
 */
export const dateCalculator = (date: Date, unit: ManipulateType, offset = 0) => {
  return dayjs(date).add(offset, unit).toDate();
};
/**
 * date 형식의 문자열을 Date 타입으로 반환
 * @param stringDate 변환할 date 형식 문자열
 * @param format 변환될 포맷
 * @retrun Date
 */
export const getStringToDate = (stringDate: string, format = DATE_TIME_FORMAT.DATE) => {
  return dayjs(stringDate, getDateTimeFormat(format)).toDate();
};

/**
 * date 형식의 문자열을 Date 타입으로 반환
 * @param stringDate 변환할 date 형식 문자열
 * @param format 변환될 포맷
 * @retrun Date
 */
export const getStringF = (stringDate: string, format = DATE_TIME_FORMAT.DATE) => {
  return dayjs(stringDate, getDateTimeFormat(format));
};

/**
 * value 를 Dayjs format 형태의 문자열로 리턴
 * format 이 없으면 Date type 리턴
 * @param value date | string
 * @param format 변환 포맷
 * @return string
 */
export const formatDate = (value: Date | string | number, format = DATE_TIME_FORMAT.DATE) => {
  const d = dayjs(value);
  if (d.isValid()) {
    return d.format(getDateTimeFormat(format));
  }
  return '';
};

/**
 * duration 연산후 문자열로 리턴
 * format 이 없으면 Date type 리턴
 * @param value date | string
 * @param config 계산할 단위의 조합 config = {
 *   days: 1,
 *   hours: 5,
 *   minutes: 30,
 *   seconds: 15
 * }
 * @param format 변환 포맷
 * @return string
 */
export const duration = (config: any, format?: string) => {
  const d = (dayjs as any).duration(config);
  return formatDate(d, format);
};

/**
 * value 와 target 날짜의 차리를 요청 unit에 맞게 리턴
 * value > target : positive number(양수) 리턴
 * value < target : negative number(음수) 리턴
 * @param value date | string = 기준일
 * @param target date | string = 대상일자
 * @param unit DateShorthandUnit = diff 단위
 * @return number | undefined
 */
export const dateDiff = (
  value: Date | string,
  target: Date | string,
  unit?: DateShorthandUnit,
): number | undefined => {
  const d = dayjs(value);
  const t = dayjs(target);
  if (d.isValid() && t.isValid()) {
    return d.diff(t, unit ?? 'd');
  }
  return undefined;
};

export const formatTimeAgo = (
  value: Date | string | number,
  format = DATE_TIME_FORMAT.MONTH_DAY,
) => {
  // dayjs().tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const now = dayjs().utc();
  const d = dayjs.utc(value);

  if (d.isValid()) {
    const diffMinutes = now.diff(d, 'minute');
    const diffHours = now.diff(d, 'hour');

    const isSameDay = now.isSame(d, 'day');

    if (diffMinutes < 60 && isSameDay) {
      // 0분전 -> 1분전으로 보정
      const minutesAgo = diffMinutes === 0 ? 1 : diffMinutes;

      return `${t('LABEL.common.date.minutesAgo', { time: minutesAgo })}`;
    } else if (diffHours < 24 && isSameDay) {
      return `${t('LABEL.common.date.hoursAgo', { time: diffHours })}`;
    } else {
      return d.format(getDateTimeFormat(format));
    }
  }
  return '';
};

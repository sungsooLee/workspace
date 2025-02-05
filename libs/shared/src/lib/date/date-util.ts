import { t } from 'i18next';
import dayjs, { ManipulateType } from 'dayjs';
import { DATE_TIME_FORMAT } from '../types/date-time';
import { getDateTimeFormat } from './date-format';
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

// export function convertDateFormatToFns(dateFormat: string) {
//   //console.log('dateFormat', dateFormat, dateFormat.replace(/DD/gi, 'dd'));
//   return dateFormat.replace(/DD/gi, 'dd');
// }

import { DATE_TIME_FORMAT, getDatePickerPlaceholder, getDateTimeFormat } from '@learnway/shared';
import { ko } from 'date-fns/locale';
import { Locale } from 'react-datepicker/dist/date_utils';
import { DatePickerType } from '../date-picker/date-picker';

// date-picker.service.ts 파일의 convertDateFormatToFns 함수 수정

export function convertDateFormatToFns(dateFormat: string): string {
  // dayjs 포맷을 date-fns 포맷으로 변환
  let fnsFormat = dateFormat;

  // 연도
  fnsFormat = fnsFormat.replace(/YYYY/g, 'yyyy');
  fnsFormat = fnsFormat.replace(/YY/g, 'yy');

  // 월 -
  fnsFormat = fnsFormat.replace(/MMMM/g, 'LLLL'); // 전체 월 이름
  fnsFormat = fnsFormat.replace(/MMM/g, 'LLL'); // 축약 월 이름 (Jan, Feb...)
  fnsFormat = fnsFormat.replace(/MM/g, 'LL'); // 2자리 월 (01-12)
  fnsFormat = fnsFormat.replace(/M(?!M)/g, 'L'); // 1-2자리 월 (1-12) - 뒤에 M이 안 오는 경우만

  // 일
  fnsFormat = fnsFormat.replace(/DD/g, 'dd'); // 2자리 일 (01-31)
  fnsFormat = fnsFormat.replace(/D(?!D)/g, 'd'); // 1-2자리 일 (1-31) - 뒤에 D가 안 오는 경우만

  // 요일 - DD 변환 후에 처리
  fnsFormat = fnsFormat.replace(/dddd/g, 'EEEE'); // 전체 요일 이름
  fnsFormat = fnsFormat.replace(/ddd/g, 'EEE'); // 축약 요일 이름

  // 밀리초
  fnsFormat = fnsFormat.replace(/SSS/g, 'SSS'); // 3자리 밀리초

  // AM/PM
  fnsFormat = fnsFormat.replace(/A/g, 'a'); // AM/PM -> am/pm

  console.log('convertDateFormatToFns:', dateFormat, '->', fnsFormat);

  return fnsFormat;
}

// 대체 방법: react-datepicker의 월 포맷 문제를 해결하기 위한 커스텀 변환
export function convertDateFormatToFnsForReactDatePicker(dateFormat: string): string {
  let fnsFormat = dateFormat;

  // 연도
  fnsFormat = fnsFormat.replace(/YYYY/g, 'yyyy');
  fnsFormat = fnsFormat.replace(/YY/g, 'yy');

  // 월 - react-datepicker는 MM/M을 제대로 파싱하지 못할 수 있음
  // 영어 locale에서 MMM을 사용하는 경우 특별 처리
  if (fnsFormat.includes('MMM')) {
    // MMM은 그대로 두거나 LLL로 변환
    fnsFormat = fnsFormat.replace(/MMMM/g, 'MMMM');
    fnsFormat = fnsFormat.replace(/MMM/g, 'MMM');
  } else {
    // 숫자 형식의 월
    fnsFormat = fnsFormat.replace(/MM/g, 'MM');
    fnsFormat = fnsFormat.replace(/M(?!M)/g, 'M');
  }

  // 일
  fnsFormat = fnsFormat.replace(/DD/g, 'dd');
  fnsFormat = fnsFormat.replace(/D(?!D)/g, 'd');

  // 요일
  fnsFormat = fnsFormat.replace(/dddd/g, 'EEEE');
  fnsFormat = fnsFormat.replace(/ddd/g, 'EEE');

  return fnsFormat;
}

export function customTimeFormat(input: string, currentLocale: Locale, selectedDate?: Date) {
  // 한국어 처리
  if (currentLocale === ko) {
    const match = input.match(/^(\d{1,2}):(\d{2})$/);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);

      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        // 기존 날짜 유지하면서 시간만 변경
        const date = selectedDate ? new Date(selectedDate) : new Date();
        date.setHours(hours, minutes, 0, 0);

        // 입력 필드 값을 포맷된 형식으로 업데이트
        const ampm = hours >= 12 ? '오후' : '오전';
        const displayHours = hours % 12 || 12;

        return {
          date,
          value: `${ampm} ${displayHours}:${String(minutes).padStart(2, '0')}`,
        };
      }
    }
  }
  // 영어 처리
  else {
    // "2:30 PM" 또는 "14:30" 형식 처리
    // 12시간 형식
    const match12h = input.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/i);
    if (match12h) {
      let hours = parseInt(match12h[1]);
      const minutes = parseInt(match12h[2]);
      const ampm = match12h[3].toUpperCase();

      // 12시간을 24시간으로 변환
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;

      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        const date = selectedDate ? new Date(selectedDate) : new Date();
        date.setHours(hours, minutes, 0, 0);

        return {
          date,
          value: '',
        };
      }
    }
    // 24시간 형식
    else {
      const match24h = input.match(/^(\d{1,2}):(\d{2})$/);
      if (match24h) {
        const hours = parseInt(match24h[1]);
        const minutes = parseInt(match24h[2]);

        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          const date = selectedDate ? new Date(selectedDate) : new Date();
          date.setHours(hours, minutes, 0, 0);

          // 24시간 입력을 12시간 형식으로 변환하여 표시
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const displayHours = hours % 12 || 12;

          return {
            date,
            value: `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`,
          };
        }
      }
    }
  }

  return {
    date: selectedDate,
    value: input,
  };
}

export function getPickerDateFormat(displayType: DatePickerType, localeString: string) {
  // displayType에 따라 format을 매핑하는 객체
  const typeToFormatMap: Record<DatePickerType, DATE_TIME_FORMAT> = {
    year: DATE_TIME_FORMAT.YEAR,
    month: DATE_TIME_FORMAT.MONTH,
    day: DATE_TIME_FORMAT.DATE,
    time: DATE_TIME_FORMAT.HOUR_MIN,
    'time-hm': DATE_TIME_FORMAT.HOUR_MIN,
    'time-step': DATE_TIME_FORMAT.HOUR_MIN,
    'day-time': DATE_TIME_FORMAT.DATETIME_HOUR,
    'day-time-h': DATE_TIME_FORMAT.DATETIME_HOUR,
    'day-time-hm': DATE_TIME_FORMAT.DATETIME_MIN,
    'day-time-hms': DATE_TIME_FORMAT.DATETIME_SEC,
    YYYYMMDD: DATE_TIME_FORMAT.DATE,
  };

  // displayType이 매핑에 있으면 해당 format 사용, 없으면 인자로 받은 dateTimeFormat 사용
  const format = typeToFormatMap[displayType];

  const dayjsFormat = getDateTimeFormat(format, localeString);
  const fnsFormat = convertDateFormatToFns(dayjsFormat);

  return fnsFormat;
}

export function getParseDate(value: Date | string | null) {
  if (typeof value === 'string') {
    const replacedValue = value.replace(/-/g, '/');
    const newDate = new Date(replacedValue);
    const isValid = !isNaN(newDate.getTime());
    return isValid ? newDate : undefined;
  }
  return value as Date | undefined;
}

/**
 * displayType 값을 분석하여 각 항목의 show/hide 여부를 계산해줍니다.
 * @param displayType DatePickerType
 * @returns { showDay: boolean, showTime: boolean, showSeconds: boolean, showHourOnly: boolean }
 */
export function getDatePickerVisibility(displayType: DatePickerType) {
  const showPicker =
    displayType?.includes('day') || displayType?.includes('year') || displayType?.includes('month');
  const showHourInput = displayType === 'day-time-h';
  const showTimeInput =
    displayType === 'time' ||
    displayType === 'time-hm' ||
    displayType === 'day-time' ||
    displayType === 'day-time-hm' ||
    displayType === 'day-time-hms';
  const showSeconds = displayType === 'day-time-hms' || displayType === 'time';

  return { showPicker, showTimeInput, showHourInput, showSeconds };
}

/**
 * placeholder 값을 가져오는 함수
 * @param displayType DatePickerType
 * @param localeString string
 * @returns string
 */
export function getPlaceholder(displayType: DatePickerType, localeString: string) {
  const { showSeconds } = getDatePickerVisibility(displayType);
  const timeType = showSeconds ? 'time' : 'time-hm';

  return {
    pickerPlaceholder: getDatePickerPlaceholder('day', localeString),
    hourPlaceholder: getDatePickerPlaceholder('time-h', localeString),
    timePlaceholder: getDatePickerPlaceholder(timeType, localeString),
  };
}

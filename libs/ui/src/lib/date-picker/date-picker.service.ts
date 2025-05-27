// export function convertDateFormatToFns(dateFormat: string) {
//   //console.log('dateFormat', dateFormat, dateFormat.replace(/DD/gi, 'dd'));
//   return dateFormat.replace(/DD/gi, 'dd');
// }

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

import { z } from './zod';

const passwordRegx01 =
  /^((?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,})|((?=(.*[A-Za-z].*[\d])|(.+[A-Za-z].*[!@#$%^&*(),.?":{}|<>])|(.+[\d].*[!@#$%^&*(),.?":{}|<>])).{10,})$/;
const passwordRegx02 = /^(?!.*(.)\1{4}).*$/;
const passwordRegx03 = /^(?!.*\d{5,}).*$/;

export function getValidateConfigPassword(key: string) {
  return [
    {
      key: key,
      config: {
        fn: (values: Record<string, any>) => {
          return values[key] !== '' && !passwordRegx01.test(values[key]);
        },
        path: key,
        message:
          '영문자, 숫자, 특수문자 3가지 조합 8자리 이상 또는 2가지 조합 10자리 이상으로 입력해 주세요.',
      },
    },
    {
      key: key,
      config: {
        fn: (values: Record<string, any>) => {
          return values[key] !== '' && !passwordRegx02.test(values[key]);
        },
        path: key,
        message: '동일 문자 또는 숫자를 5개 연속 사용할 수 없습니다.',
      },
    },
    {
      key: key,
      config: {
        fn: (values: Record<string, any>) => {
          return values[key] !== '' && !passwordRegx03.test(values[key]);
        },
        path: key,
        message: '숫자는 연속 5개 이상 사용할 수 없습니다.',
      },
    },
  ];
}

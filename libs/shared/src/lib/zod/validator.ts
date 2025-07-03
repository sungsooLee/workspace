import { z } from './zod';
import { t } from 'i18next';

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
        message: t('LABEL.form.validation.password.01'),
      },
    },
    {
      key: key,
      config: {
        fn: (values: Record<string, any>) => {
          return values[key] !== '' && !passwordRegx02.test(values[key]);
        },
        path: key,
        message: t('LABEL.form.validation.password.02'),
      },
    },
    {
      key: key,
      config: {
        fn: (values: Record<string, any>) => {
          return values[key] !== '' && !passwordRegx03.test(values[key]);
        },
        path: key,
        message: t('LABEL.form.validation.password.03'),
      },
    },
  ];
}

const phoneNumberRegx = /^01[0-9](-|\s)?\d{3,4}(-|\s)?\d{4}$/;
export function getValidateConfigPhoneNumber(key: string) {
  return [
    {
      key: key,
      config: {
        fn: (values: Record<string, any>) => {
          return values[key] !== '' && !phoneNumberRegx.test(values[key]);
        },
        path: key,
        message: '휴대폰 번호를 다시 확인해 주세요',
      },
    },
  ];
}

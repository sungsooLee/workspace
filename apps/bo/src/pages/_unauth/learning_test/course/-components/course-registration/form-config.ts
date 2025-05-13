import { DynamicFormConfig } from '@learnway/hooks';
import { t } from 'i18next';

export const formConfig: DynamicFormConfig = {
  builders: [
    // 수강신청 여부
    {
      name: '수강신청여부',
      type: 'switch',
      label: t('수강신청여부'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 수강 신청 기능 사용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 수강 신청 기능 사용 여부를 설정할 수 없습니다.'),
      },
    },
  ],
};

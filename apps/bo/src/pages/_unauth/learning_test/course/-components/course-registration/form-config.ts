import { DynamicFormConfig } from '@learnway/hooks';
import { t } from 'i18next';

export const formConfig: DynamicFormConfig = {
  builders: [
    // 강의 유형
    {
      name: '강의 유형',
      type: 'custom',
      label: t('강의 유형'),
      value: '',
    },
  ],
};

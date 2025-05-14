import { DynamicFormConfig } from '@learnway/hooks';
import { t } from 'i18next';

export const formConfig: DynamicFormConfig = {
  builders: [
    // 수강신청 여부
    {
      name: '수강신청여부',
      type: 'switch',
      label: t('수강신청여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('있음') : t('없음')),
      },
    },
    // 수강신청 기본정보 > 수강신청 승인자
    {
      name: '수강신청 승인자',
      type: 'radio-group',
      label: t('수강신청 승인자'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: false,
        },
        {
          label: '있음',
          value: true,
        },
      ],
      value: '',
      placeholder: '',
      description: '',
    },
    // 수강신청 기본정보 > 수강신청 정원
    {
      name: '수강신청 정원',
      type: 'radio-group',
      label: t('수강신청 정원'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: false,
        },
        {
          label: '있음',
          value: true,
        },
      ],
      value: '',
      placeholder: '',
      description: '',
    },
    // 수강신청 기본정보 > 수강신청 대기자
    {
      name: '수강신청 대기자',
      type: 'switch',
      label: t('수강신청 대기자'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('있음') : t('없음')),
      },
    },
    // 수강신청 기본정보 > 수강신청 취소 기간
    {
      name: '수강신청 취소 기간',
      type: 'radio-group',
      label: t('수강신청 취소 기간'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: false,
        },
        {
          label: '있음',
          value: true,
        },
      ],
      value: '',
      placeholder: '',
      description: '',
    },
    // 수강신청 기본정보 > 중복 수강 신청
    {
      name: '중복 수강 신청',
      type: 'radio-group',
      label: t('중복 수강 신청'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: false,
        },
        {
          label: '있음',
        },
      ],
      value: '',
      placeholder: '',
      description: '',
    },
    // 수강신청 기본정보 > 학습기간 중복예외 처리
    {
      name: '학습기간 중복예외 처리',
      type: 'radio-group',
      label: t('학습기간 중복예외 처리'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: false,
        },
        {
          label: '있음',
          value: true,
        },
      ],
      value: '',
      placeholder: '',
      description: '',
    },
    // 수강신청 시 수집 정보 > 사전 레벨테스트
    {
      name: '사전 레벨테스트',
      type: 'radio-group',
      label: t('사전 레벨테스트'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: false,
        },
        {
          label: '있음',
          value: true,
        },
      ],
      value: '',
      placeholder: '',
      description: '',
    },
    // 수강신청 시 수집 정보 > 교재 배송지 입력 여부
    {
      name: '교재 배송지 입력 여부',
      type: 'radio-group',
      label: t('교재 배송지 입력 여부'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: false,
        },
        {
          label: '있음',
          value: true,
        },
      ],
      value: '',
      placeholder: '',
      description: '',
    },
  ],
};

import { DynamicFormConfig } from '@learnway/hooks';
import { t } from 'i18next';

export const formConfig: DynamicFormConfig = {
  builders: [
    // 강의 유형
    {
      name: '강의 유형',
      type: 'custom',
      label: '강의 유형',
      value: '',
    },
    // 강의 유형 ID
    {
      name: '강의 유형 아이디',
      type: 'hidden',
      value: '',
    },
    // 강의 세부 요청
    {
      name: '강의 세부 요청',
      type: 'custom',
      label: '강의 세부 요청',
      value: '',
    },
    // 채널
    {
      name: '채널',
      type: 'custom',
      label: '채널',
      value: '',
    },
    // 언어 설정
    {
      name: '언어 설정',
      type: 'custom',
      label: '언어 설정',
      value: '',
    },
    // 과정명
    {
      name: '과정명',
      type: 'text',
      label: '과정명',
      value: '',
      placeholder: '',
      description: '',
      maxLength: 40,
    },
    // 교육 목표
    {
      name: '교육 목표',
      type: 'textarea',
      label: t('교육 목표'),
      value: '',
      placeholder: '',
      description: '',
    },
    // 교육 내용
    {
      name: '교육 내용',
      type: 'textarea',
      label: t('교육 내용'),
      value: '',
      placeholder: '',
      description: '',
    },
    // 학습 대상
    // 과정 요약
    // 난이도
    {
      name: '난이도',
      type: 'radio-group',
      label: t('난이도'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: '',
        },
        {
          label: '입문',
          value: '1',
        },
        {
          label: '초급',
          value: '2',
        },
        {
          label: '중급',
          value: '3',
        },
        {
          label: '고급',
          value: '4',
        },
      ],
      value: '',
      placeholder: '',
      description: '',
    },
    // 테넌트
    {
      name: '테넌트',
      type: 'checkbox-group',
      label: '테넌트',
      format: 'array',
      options: Array(10)
        .fill(null)
        .map((d, i) => ({ value: `value${i}`, label: `label${i}`, disabled: i === 1 })),
      value: ['value1'],
      placeholder: '',
      description: '',
      showSelectAll: true,
      cols: 4,
    },
    // 카테고리
    {
      name: '카테고리',
      type: 'chip-list',
      label: '카테고리',
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      // placeholder: '',
      description: '',
      chipListConfig: {
        showInput: true,
      },
    },
    // 학습대상(유저그룹)
    {
      name: '태그',
      type: 'chip-list',
      label: '태그',
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      // placeholder: '',
      description: '',
      chipListConfig: {
        showInput: true,
      },
    },
    // 담당자
    {
      name: '담당자',
      type: 'custom',
      label: '담당자',
      value: '',
    },
    // 담당자 연락처
    {
      label: '담당자 연락처',
      name: '담당자 연락처',
      type: 'phone-number',
      value: '',
      fields: {
        nationCode: 'nationCode',
        number: 'contact',
      },
    },
    // 운영자
    {
      name: '운영자',
      type: 'custom',
      label: '운영자',
      value: '',
    },
    // 운영자 연락처
    {
      label: '운영자 연락처',
      name: '운영자 연락처',
      type: 'phone-number',
      value: '',
      fields: {
        nationCode: 'nationCode',
        number: 'contact',
      },
    },
  ],
};

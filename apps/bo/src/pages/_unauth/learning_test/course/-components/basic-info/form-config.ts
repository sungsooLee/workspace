import { DynamicFormConfig } from '@learnway/hooks';
import { t } from 'i18next';

export const formConfig: DynamicFormConfig = {
  builders: [
    // 유형
    {
      name: '유형',
      type: 'custom',
      label: '유형',
      value: '',
    },
    // 유형 ID
    {
      name: '유형아이디',
      type: 'hidden',
      value: '',
    },
    // 채널
    {
      name: '채널',
      type: 'custom',
      label: '채널',
      value: '',
    },
    // 채널 ID
    {
      name: '채널아이디',
      type: 'hidden',
      value: '',
    },
    // 테넌트
    {
      name: '테넌트',
      type: 'custom',
      label: '테넌트',
      format: 'array',
      options: [
        { value: 'tenant1', label: '테넌트1' },
        { value: 'tenant2', label: '테넌트2' },
      ],
      value: ['tenant1', 'tenant2'],
      placeholder: '',
      description: '',
    },
    // 카테고리
    {
      name: '카테고리',
      type: 'custom',
      label: '카테고리',
      format: 'array',
      value: [
        { value: 'tenant1', label: '테넌트1' },
        { value: 'tenant2', label: '테넌트2', invalid: true },
      ],
      placeholder: '',
      description: '',
    },
    // 학습대상
    {
      name: '학습대상',
      type: 'custom',
      label: '학습대상',
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      placeholder: '',
      description: '',
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
      type: 'custom',
      label: '과정명',
      value: '',
      placeholder: '',
      description: '',
      maxLength: 40,
    },
    //과정 요약
    {
      name: '과정 요약',
      type: 'custom',
      label: '과정 요약',
      value: '',
      placeholder: '',
      description: '',
      maxLength: 40,
    },
    // 교육 내용
    {
      name: '교육 내용',
      type: 'custom',
      label: t('교육 내용'),
      value: '',
    },
    // 난이도
    {
      name: '난이도',
      type: 'custom',
      label: t('난이도'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: '0',
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
    },
    // 교육 내용
    {
      name: '교육 내용',
      type: 'custom',
      label: t('교육 내용'),
      value: '',
    },
    // 교육공간
    {
      name: '교육공간',
      type: 'custom',
      label: '교육공간',
      value: '',
    },
    // 담당자
    {
      name: '담당자',
      type: 'custom',
      label: '담당자',
      value: '',
    },
    // 담당자연락처
    {
      name: '담당자연락처',
      type: 'custom',
      label: '담당자연락처',
      value: '',
    },
    // 담당자이메일
    {
      name: '담당자이메일',
      type: 'custom',
      label: '담당자이메일',
      value: '',
    },
    // 운영자
    {
      name: '운영자',
      type: 'custom',
      label: '운영자',
      value: '',
    },
    // 운영자연락처
    {
      name: '운영자연락처',
      type: 'custom',
      label: '운영자연락처',
      value: '',
    },
    // 운영자이메일
    {
      name: '운영자이메일',
      type: 'custom',
      label: '운영자이메일',
      value: '',
    },
  ],
};

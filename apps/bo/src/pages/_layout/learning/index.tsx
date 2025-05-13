import React from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  ChipListModalSelectorFormField,
  Input,
  InputModalSelectorFormField,
} from '@learnway/ui';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '@widgets/layout/ui/container/slot/sub-contents';
import { ContentsRow } from '@widgets/layout/ui/container/parts/contents-row';
import { useDynamicForm } from '@learnway/hooks';
import { FormRow } from '@shared/ui';
import { DynamicFormField } from '@learnway/ui';
import { DynamicFormConfig } from '@learnway/hooks';

export const Route = createFileRoute('/_layout/learning/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleValidate = (data: any) => {
    console.log('data {} => ', data);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>LEANING</PageContainer>
    </form>
  );
}

/**
 * 필수값 : name, type
 */
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channel',
      type: 'text-popup-button',
      label: '채널',
      value: '',
      placeholder: '최근 과정 개설한 채널명 또는 최근 생성된 채널명',
      description: '',
      button: {
        label: t('선택'),
        variant: 'point',
      },
      onClick: () => console.log('onClick'),
    },
    {
      name: '강의유형',
      type: 'custom',
      label: t('강의유형 - 라디오버튼 + 체크박스2 + 인풋 + 라벨'),
      value: {},
      placeholder: '',
      description: '',
    },
    {
      name: '과정명',
      type: 'text',
      label: t('과정명'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '과정내용',
      type: 'text-area',
      label: t('과정내용'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '대표이미지',
      type: 'thumbnail-image-upload',
      label: t('대표이미지'),
      value: [
        { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
      ],
      placeholder: '',
      description: '',
    },
    {
      name: '태그',
      type: 'chip-list',
      label: t('태그 - 인풋 칩 리스트'),
      value: [
        { label: '현대자동차 A', value: 'A' },
        { label: '현대자동차 B', value: 'B' },
        { label: '현대자동차 C', value: 'C' },
      ],
      // placeholder: '',
      description: '',
      showInput: true,
    },
    {
      name: '강사',
      type: 'custom',
      label: t('강사 - 다이얼로그 버튼 + 칩 리스트 (가로)'),
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '난이도',
      type: 'radio-group',
      label: t('난이도'),
      options: [
        {
          label: '없음',
          value: '',
        },
        {
          label: '초급',
          value: '1',
        },
        {
          label: '중급',
          value: '2',
        },
        {
          label: '고급',
          value: '3',
        },
      ],
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '강의실설정',
      type: 'checkbox-group',
      label: t('강의실 설정'),
      options: Array(10)
        .fill(null)
        .map((d, i) => ({ value: `value${i}`, label: `label${i}` })),
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '운영자',
      type: 'custom',
      label: t('운영자 - 인풋 + 다이얼로그 버튼'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '연락처',
      type: 'custom',
      label: t('연락처 - 인풋 + label + 인풋'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '테넌트',
      type: 'chip-list',
      label: t('테넌트 - 우측 액션버튼 + chip list'),
      value: [],
      placeholder: '',
      description: '',
      options: [
        { value: 'tenant1', label: 'Tenant A' },
        { value: 'tenant2', label: 'Tenant B' },
      ],
    },
  ],
  validator: {
    // channel: z.string().nonempty(),
    /*channel: z.string().nonempty(t('채널을 선택해 주세요.')),
    category: z.string().nonempty(t('유효성 테스트')),
     language_code: z.string().nonempty(t('유효성 테스트')),
     subdivision: z.string().nonempty(t('유효성 테스트')),
     check: z.boolean(),
     tenant: z.array(z.string()).nonempty(t('유효성 테스트')),*/
  },
};

import React from 'react';
import { Button, StepperTabs } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { t } from 'i18next';
import { BasicInfo } from '../-components/basic-info/basic-info';

export const Route = createFileRoute('/_unauth/learning_test/course/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit, control, getValues } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleValidate = (data: any) => {
    console.log('data {} => ', data);
  };

  const tabItems = [
    {
      title: '기본정보',
      key: 'a',
      content: <BasicInfo />,
    },
    {
      title: '수강신청 설정',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
    {
      title: '커리큘럼 설정',
      key: 'c',
      content: <h2>Tab C content</h2>,
    },
    {
      title: '상세정보 설정',
      key: 'd',
      content: <h2>Tab C content</h2>,
    },
    {
      title: '강의 게시 설정',
      key: 'e',
      content: <h2>Tab C content</h2>,
    },
  ];

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="button" variant="point" size="sm" label={'과정 가져오기'} />
          <Button type="button" variant="point" size="sm" label={'과정 복사'} />
          <Button type="button" variant="point" size="sm" label={'과정 내보내기'} />
          <Button type="button" variant="point" size="sm" label={'미리보기'} />
          <Button type="submit" variant="point" size="sm" label={'저장'} />
        </ContentsButtons>
        <MainContents>
          <StepperTabs type={'sub-progress'} size={'md'} items={tabItems} />
        </MainContents>
      </PageContainer>
    </form>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channelId',
      type: 'hidden',
      value: '',
    },
    {
      name: 'channelName',
      type: 'custom',
      label: '채널 - InputModalSelectorFormField',
      value: '',
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
      maxLength: 10,
    },
    {
      name: '과정내용',
      type: 'textarea',
      label: t('과정내용'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '대표이미지',
      type: 'thumbnail-image-upload',
      label: t('대표이미지'),
      format: 'array',
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
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      // placeholder: '',
      description: '',
      chipListConfig: {
        showInput: true,
      },
    },
    {
      name: '강사',
      type: 'custom',
      label: t('강사 - ChipListModalSelectorFormField'),
      format: 'array',
      value: [],
      placeholder: '',
      description: '',
    },
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
    {
      name: 'managerId',
      type: 'hidden',
      value: '',
    },
    {
      name: 'managerName',
      type: 'custom',
      label: t('운영자 - InputModalSelectorFormField'),
      format: 'string',
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
      format: 'array',
      value: [{ label: 'AA', value: 'value1' }],
      placeholder: '',
      description: '',
      chipListConfig: {},
    },
    {
      name: '공개범위',
      type: 'custom',
      label: t('공개범위 - ListModalSelectorFormField'),
      format: 'array',
      value: [{ targetId: 'target1', targetName: 'targetname1' }],
      placeholder: '',
      description: '',
    },
  ],
};

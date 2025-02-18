import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import useCustomForm from '../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, Input } from '@learnway/ui';
import { DynamicFormField } from '../../../shared/ui/dynamic-form-field';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../widgets/layout/ui/container/parts/contents-row';
import { DynamicFormConfig } from '../../../shared/ui/dynamic-form-field/type';
import { SubContents } from '../../../widgets/layout/ui/container/slot/sub-contents';
import { LectureTypeSiteUrl } from '../../../widgets/learning/ui/dialogs/lecture-type-site-url/lecture-type-site-url';
import { FormTeacherChipList } from '../../../features/learning/ui/dialog/form-teacher-chip-list/form-teacher-chip-list';
import { FormManagerInputButton } from '../../../features/learning/ui/dialog/form-manager-input-button/form-manager-input-button';
import { FormContactNumber } from '../../../features/learning/ui/dialog/form-contact-number/form-manager-input-button';

export const Route = createFileRoute('/_layout/learning/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit, reset, control } = useCustomForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="submit" variant="point" size="sm">
            과정복사
          </Button>
          <Button type={'button'} variant="point" size="sm">
            임시저장
          </Button>
          <Button type={'button'} variant="point" size="sm">
            작성완료
          </Button>
          <Button type={'button'} variant="point" size="sm">
            미리보기
          </Button>
          <Button type={'button'} variant="primary" size="sm">
            게시하기
          </Button>
        </ContentsButtons>
        <MainContents>
          {/* 채널 */}
          {/* TODO: ContentRow > Row */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'채널'} />
          </ContentsRow>
          {/* 강의유형 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'강의유형'}>
              <LectureTypeSiteUrl />
            </DynamicFormField>
          </ContentsRow>
          {/* 과정명 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'과정명'} />
          </ContentsRow>
          {/* 과정내용 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'과정내용'} />
          </ContentsRow>
          {/* 대표이미지 */}
          {/* TODO: className 제거 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'대표이미지'} className={'w-[400px]'} />
          </ContentsRow>
          {/* 강의유형 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'강의유형'} />
          </ContentsRow>
          {/* 태그 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'태그'} />
          </ContentsRow>
          {/* 강사 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'강사'}>
              <FormTeacherChipList />
            </DynamicFormField>
          </ContentsRow>
          {/* 난이도 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'난이도'} />
          </ContentsRow>
          {/* 강의실설정 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'강의실설정'} />
          </ContentsRow>
          {/* 운영자 & 연락처 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'운영자'}>
              <FormManagerInputButton />
            </DynamicFormField>
            <DynamicFormField provider={provider} name={'연락처'}>
              <FormContactNumber />
            </DynamicFormField>
          </ContentsRow>
          {/* 테넌트 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'테넌트'} />
          </ContentsRow>
          {/* 공개대상 */}
          {/*<ContentsRow>*/}
          {/*  <DynamicFormField provider={provider} name={'공개대상'}>*/}
          {/*    <FormSelectChipList*/}
          {/*      selectOptions={Array(5)*/}
          {/*        .fill(null)*/}
          {/*        .map((d, i) => ({ value: `value${i}`, label: `label${i}` }))}*/}
          {/*    />*/}
          {/*  </DynamicFormField>*/}
          {/*</ContentsRow>*/}
        </MainContents>
        <SubContents>
          <h3>Sub</h3>
          <Input />
        </SubContents>
      </PageContainer>
    </form>
  );
}

/**
 * 필수값 : name, type
 */
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: '채널',
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
      placeholder: '',
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
    // channel: z.string().nonempty(t('채널을 선택해 주세요.')),
    /*channel: z.string().nonempty(t('채널을 선택해 주세요.')),
    category: z.string().nonempty(t('유효성 테스트')),
     language_code: z.string().nonempty(t('유효성 테스트')),
     subdivision: z.string().nonempty(t('유효성 테스트')),
     check: z.boolean(),
     tenant: z.array(z.string()).nonempty(t('유효성 테스트')),*/
  },
};

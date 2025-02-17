import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import useCustomForm from '../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button } from '@learnway/ui';
import { DynamicFormField } from '../../../shared/ui/dynamic-form-field';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../widgets/layout/ui/container/parts/contents-row';
import { t } from 'i18next';
import { FormSelectChipList } from '../../../shared/ui/dynamic-form-field/dialogs/form-select-chip-list';
import { DynamicFormConfig } from '../../../shared/ui/dynamic-form-field/type';

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
          {/* 채널 선택 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'channel'} />
          </ContentsRow>
          {/* 테넌트 선택 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'tenant'} />
          </ContentsRow>
          {/* 카테고리 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'카테고리'} />
          </ContentsRow>
          {/* 공개대상 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'공개대상'}>
              <FormSelectChipList
                selectOptions={Array(5)
                  .fill(null)
                  .map((d, i) => ({ value: `value${i}`, label: `label${i}` }))}
              />
            </DynamicFormField>
          </ContentsRow>
          {/* 과정명 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'과정명'} />
          </ContentsRow>
          {/* 교육목표 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'교육목표'} />
          </ContentsRow>
          {/* 기대효과 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'기대효과'} />
          </ContentsRow>
          {/* 과정명 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'과정명'} />
          </ContentsRow>
          {/* 교육목표 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'교육목표'} />
          </ContentsRow>
          {/* 기대효과 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'기대효과'} />
          </ContentsRow>
          {/* 교육내용 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'교육내용'} />
          </ContentsRow>
          {/* 과정썸네일 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'과정썸네일'} />
          </ContentsRow>
          {/* 총학습시간 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'총학습시간'} />
          </ContentsRow>
          {/* 총학습기간 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'총학습기간'} />
          </ContentsRow>
          {/* 태그 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'태그'} />
          </ContentsRow>
          {/* 운영자 */}
          <ContentsRow>
            <DynamicFormField provider={provider} name={'운영자'} />
          </ContentsRow>
        </MainContents>
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
      name: 'channel',
      type: 'dropdown',
      label: t('채널 선택'),
      value: '',
      placeholder: '',
      description: '',
      options: [{ value: '', label: '언어전체' }],
    },
    {
      name: 'tenant',
      type: 'check-group',
      label: t('테넌트 선택'),
      value: '',
      placeholder: '',
      description: '',
      options: [
        { value: 'tenant1', label: 'Tenant A' },
        { value: 'tenant2', label: 'Tenant B' },
      ],
    },
    {
      name: '카테고리',
      type: 'text',
      label: t('카테고리'),
      value: '',
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
      name: '교육목표',
      type: 'text',
      label: t('교육목표'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '기대효과',
      type: 'text',
      label: t('기대효과'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '공개대상',
      type: 'custom',
      label: t('공개대상'),
      value: [],
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
      name: '교육목표',
      type: 'text',
      label: t('교육목표'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '기대효과',
      type: 'text',
      label: t('기대효과'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '교육내용',
      type: 'text-area',
      label: t('교육내용'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '과정썸네일',
      type: 'thumbnail-image-upload',
      label: t('과정썸네일'),
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
      name: '총학습시간',
      type: 'text',
      label: t('총 학습 시간'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '총학습기간',
      type: 'text',
      label: t('총 학습 기간'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '태그',
      type: 'chip-list',
      label: t('태그'),
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
      name: '운영자',
      type: 'text',
      label: t('운영자'),
      value: '',
      placeholder: '',
      description: '',
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

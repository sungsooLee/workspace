import { createFileRoute } from '@tanstack/react-router';
import useCustomForm from '../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import PageButtons from '../../../widgets/layout/ui/page-layout/slot/page-buttons';
import { Button } from '@learnway/ui';
import PageRow from '../../../widgets/layout/ui/page-layout/page-row';
import PageContainer from '../../../widgets/layout/ui/page-layout/page-container';
import z from 'zod';
import { t } from 'i18next';
import DynamicFormField from '../../../shared/ui/dynamic-form-field';
import { CODE_GROUP } from '@learnway/config';
export const Route = createFileRoute('/_layout/detail/type2')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit, reset } = useCustomForm(detailConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleOnReset = () => {
    reset();
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('on form submit?');
    onSubmit(handleOnSubmit);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <PageContainer panel>
        <PageButtons>
          <Button type="submit" variant="gray" size="sm">
            Submit
          </Button>
          <Button type={'button'} variant="line" size="sm" onClick={handleOnReset}>
            초기화
          </Button>
          <Button variant="gray" size="sm">
            버튼3
          </Button>
          <Button variant="gray" size="sm">
            버튼4
          </Button>
        </PageButtons>
        <h1>CODE</h1>
        <PageRow>
          <DynamicFormField provider={provider} name={'language'} />
          <DynamicFormField provider={provider} name={'language_detail'} />
        </PageRow>
        <h1>fetch</h1>
        <PageRow>
          <DynamicFormField provider={provider} name={'language'} />
          <DynamicFormField provider={provider} name={'language_detail'} />
        </PageRow>
        <PageRow>
          <DynamicFormField provider={provider} name={'title'} />
        </PageRow>
        <PageRow>
          <DynamicFormField provider={provider} name={'subdivision'} />
        </PageRow>
        <PageRow>
          <DynamicFormField provider={provider} name={'check'} />
        </PageRow>
        <PageRow>
          <DynamicFormField provider={provider} name={'tenant'} />
        </PageRow>
        <PageRow>
          <DynamicFormField provider={provider} name={'category'} />
        </PageRow>
        <PageRow>
          <DynamicFormField provider={provider} name={'thumbnails'} />
        </PageRow>
      </PageContainer>
    </form>
  );
}

const detailConfig = {
  builders: [
    {
      name: 'language',
      type: 'dropdown',
      label: '언어',
      value: '',
      items: [{ code: '', name: '언어전체' }],
      description: '총 학습 시간은 차수별 학습 기간 입니다.',
      itemsConfig: {
        type: 'target',
        target: 'language_code',
        codeGroup: CODE_GROUP.LANGUAGE_CODE,
      },
    },
    {
      name: 'language_detail',
      type: 'dropdown',
      label: '언어상세',
      value: '',
      description: '총 학습 시간은 차수별 학습 기간 입니다.',
      items: [{ code: '', name: '언어코드를 선택하세요.' }],
      itemsConfig: {
        type: 'self',
        codeGroup: CODE_GROUP.LANGUAGE_CODE,
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '제목',
      value: '',
      description: '총 학습 시간은 차수별 학습 기간 입니다.',
    },
    {
      name: 'subdivision',
      type: 'radio-group',
      label: '하위 구분',
      value: '',
      options: [
        {
          value: '01',
          label: '사내',
        },
        {
          value: '02',
          label: '사외',
        },
      ],
    },
    {
      name: 'check',
      type: 'checkbox',
      checkLabel: '테넌트A',
      label: '체크박스',
      value: true,
    },
    {
      name: 'tenant',
      type: 'check-group',
      label: '테넌트 선택',
      value: ['tenantA'],
      options: [
        {
          value: 'tenantA',
          label: '테넌트 A',
        },
        {
          value: 'tenantB',
          label: '테넌트 B',
        },
        {
          value: 'tenantC',
          label: '테넌트 C',
        },
      ],
    },
    {
      name: 'category',
      type: 'category-selector',
      label: '카테고리 선택',
      value: '',
    },
    {
      name: 'thumbnails',
      type: 'contents-thumbnail',
      label: '썸네일',
      value: [],
    },
  ],
  validator: {
    category: z.string().nonempty(t('유효성 테스트')),
    language_code: z.string().nonempty(t('유효성 테스트')),
    subdivision: z.string().nonempty(t('유효성 테스트')),
    check: z.boolean(),
    tenant: z.array(z.string()).nonempty(t('유효성 테스트')),
  },
};

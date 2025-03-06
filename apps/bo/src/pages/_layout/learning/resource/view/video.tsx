import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, ContentsRow } from '@learnway/ui';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../../../widgets/layout/ui/container/slot/sub-contents';
import { FormRow } from '../../../../../shared/ui/form-row';
import { TempSearchPopup } from '../../../../../features/learning/ui/resource/temp';
import { DynamicFormConfig, DynamicFormField } from '../../../../../shared/ui/dynamic-form-field';
import { z } from '@learnway/shared';
import { t } from 'i18next';
import useDynamicForm from '../../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { TempInput } from '../../../../../features/learning/ui/resource/temp/form/temp_search_input';

export const Route = createFileRoute('/_layout/learning/resource/view/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider } = useDynamicForm(formConfig);
  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm">
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'channel'}>
              <TempSearchPopup />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'learningResourceName'}>
              <TempInput />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
      </MainContents>
      <SubContents>sub</SubContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      label: t('채널'),
      name: 'channel',
      type: 'custom',
      value: '',
    },
    {
      label: t('학습자원명'),
      name: 'learningResourceName',
      type: 'text',
      value: '',
      placeholder: '학습자원명을 입력하세요.',
    },
    {
      label: t('학습자원 설명'),
      name: 'learningResourceDescription',
      type: 'textarea',
      value: '',
      placeholder: '콘텐츠에 대한 설명을 입력해주세요.',
    },
  ],
  validator: {
    channel: z.string().required(),
    learningResourceName: z.string().required(),
  },
};

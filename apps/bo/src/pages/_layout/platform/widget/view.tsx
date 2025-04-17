import { createFileRoute, useRouter } from '@tanstack/react-router';
import { z } from '@learnway/shared';
import { useEffect } from 'react';

import { Button, DynamicFormField, useModal } from '@learnway/ui';
import { LOCALES } from '@learnway/config';

import { pageRouteConfig } from '../../../../features/auth';

import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../../widgets/layout/ui/container/parts/contents-row';

import { FormTranslationBox } from '../../../../features/platform/ui/platform/system/translation/form-translation-box';
import { useTranslation } from '../../../../entities/translation/service/translation.hook';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormRow } from '../../../../shared/ui/form';

import { useWidgets } from '../../../../entities/widgets';

export const Route = createFileRoute('/_layout/platform/widget/view')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      widgetCode: {
        format: 'string',
        required: true,
      },
    },
  }),
});

function RouteComponent() {
  const router = useRouter();
  const { widgetCode, processType, getWidget } = useWidgets();

  const { provider, control, onSubmit, fetchData, getValues, onFormChange, setFormError } =
    useDynamicForm(formConfig);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const widget = (await getWidget(widgetCode)) as any;
    console.log('widget', widget);

    const values = {
      ...widget,
      devices: [],
    };
    fetchData(values);
  };

  /**
   * 목록으로 이동
   */
  const handleGoToListPage = () => {
    router.navigate({ to: '/platform/widget' });
  };

  return (
    processType !== 'LOADING' && (
      <form>
        <PageContainer>
          <ContentsButtons>
            <Button type="submit" variant="point" size="sm">
              {processType === 'REGISTER' ? '저장' : '수정'}
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleGoToListPage}>
              목록
            </Button>
          </ContentsButtons>
          <MainContents>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'widgetName'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'widgetDesc'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={`devices`}>
                  <FormTranslationBox />
                </DynamicFormField>
              </FormRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'isUsed'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'isSecurityContent'} />
              </FormRow>
            </ContentsRow>
          </MainContents>
        </PageContainer>
      </form>
    )
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'widgetName',
      type: 'text',
      label: '위젯명',
      value: false,
    },
    {
      name: 'widgetDesc',
      type: 'textarea',
      label: '위젯설명',
      value: '',
    },
    {
      name: 'devices',
      type: 'checkbox-group',
      label: '디바이스',
      value: [],
      options: [
        {
          value: 'pc',
          label: 'PC',
        },
        {
          value: 'mobile',
          label: 'Mobile',
        },
      ],
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: '사용여부',
      value: true,
    },
    {
      name: 'isSecurityContent',
      type: 'switch',
      label: '보안컨텐츠여부',
      format: 'boolean',
      switchConfig: {
        label: (value: boolean) => (value ? '보안 적용' : '보안 미적용'),
      },
      guideText: '보안콘텐츠 미 설정 시 학습자원의 불법 배포와 보안 위협에 취약합니다',
      value: true,
    },
  ],
  validator: {},
};

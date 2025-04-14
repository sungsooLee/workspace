import { createFileRoute, useRouter } from '@tanstack/react-router';
import { z } from '@learnway/shared';
import { useEffect } from 'react';

import { Button, DynamicFormField, useModal } from '@learnway/ui';
import { LOCALES } from '@learnway/config';

import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../../widgets/layout/ui/container/parts/contents-row';

import { FormTranslationBox } from '../../../../features/platform/ui/platform/system/translation/form-translation-box';
import { useTranslation } from '../../../../entities/translation/service/translation.hook';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { TranslationPopup } from '../../../../features/form/ui/translation';
import { FormI18n } from '../../../../features/form/ui';
import { FormRow } from '../../../../shared/ui/form';

import { useWidgets } from '../../../../entities/widgets';

export const Route = createFileRoute('/_layout/platform/widget/view')({
  component: RouteComponent,
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
    const widget = (await widgetCode(widgetCode)) as any;
    /*
    const newTranslation = {
      messageId: translation.messageId + '',
      code: translation.code,
      keyType: translation.keyType,
      messageDesc: translation.messageDesc,
      translations,
      isUsed: true,
    };
    fetchData(newTranslation);
    */
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
                <DynamicFormField name={`device`}>
                  <FormTranslationBox />
                </DynamicFormField>
              </FormRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'isUsed'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'secureContentYn'} />
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
      name: 'isCodeChecked',
      type: 'switch',
      value: false,
    },
    {
      name: 'code',
      type: 'text',
      label: '다국어 코드',
      value: '',
    },
    {
      name: 'messageId',
      type: 'text',
      label: 'messageId',
      value: '',
    },
    {
      name: 'keyType',
      type: 'dropdown',
      label: '다국어 분류',
      value: 'COMMON_CODE',
      options: [
        { value: 'COMMON_CODE', label: '공통코드' },
        { value: 'MENU', label: '메뉴' },
        { value: 'ERROR', label: '에러' },
        { value: 'LABEL', label: '라벨' },
        { value: 'MESSAGE', label: '메세지' },
        { value: 'CATEGORY', label: '카테고리' },
      ],
    },
    {
      name: 'messageDesc',
      type: 'textarea',
      label: '설명',
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: '사용여부',
      value: true,
    },
  ],
  validator: {
    /*code: z.string().required(),*/
    /*isCodeChecked: z.boolean(),
    code: z
      .string()
      .required()
      .superRefine((data: any, ctx) => {
        console.log('data => ', data);
        if (!data.isCodeChecked && data.code.trim() === '') {
          ctx.addIssue({
            path: ['code'],
            message: 'isCodeChecked가 false일 때는 code가 비워져 있으면 안 됩니다.',
          });
        }
      }),*/
    /*translations: z.array(translationItemSchema),
    keyType: z.string().required(),*/
  },
};

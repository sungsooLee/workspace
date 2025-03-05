import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button, Input, useModal } from '@learnway/ui';
import { z } from '@learnway/shared';

import useDynamicForm from '../../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../../../widgets/layout/ui/container/parts/contents-row';
import {
  DynamicFormConfig,
  DynamicFormField,
  I18nContainer,
} from '../../../../../shared/ui/dynamic-form-field';
import { FormRow } from '../../../../../shared/ui/form-row';
import { FormTranslationBox } from '../../../../../features/platform/ui/platform/system/translation/form-translation-box';
import { useTranslation } from '../../../../../entities/translation/service/translation.hook';
import { useEffect } from 'react';
import { TranslationPopup } from '../../../../../shared/translation-popup/translation-popup';

export const Route = createFileRoute('/_layout/platform/system/translation/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { save, getTranslation } = useTranslation();
  const { alert: openAlert, open } = useModal();
  const router = useRouter();
  const { provider, control, onSubmit, fetchData, getValues, onFormChange } =
    useDynamicForm(formConfig);

  /**
   * 목록으로 이동
   */
  const handleGoToListPage = () => {
    router.navigate({ to: '/platform/system/translation' });
  };
  /**
   * 다국어 팝업 오픈
   */
  const handleOpenTranslation = () => {
    open({
      content: (
        <TranslationPopup
          defaultLang={'kr'}
          translations={{
            keyType: getValues().keyType,
            translations: getValues().translations,
          }}
          config={translationConfig}
        />
      ),
      width: 'xl',
      height: 'lg',
      title: '다국어 번역',
      onClose: (data: any) => {
        onFormChange({ translations: data.translations });
      },
    });
  };

  /**
   * 다국어 저장
   * @param data
   */
  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
    const saveData = {
      ...data,
      isUsed: data.isUsed ? 'TRUE' : 'FALSE',
    };
    //console.log('saveData => ', saveData);
    save(saveData);

    /*openAlert({
      description: <>다국어를 저장하시겠습니까?</>,
      isConfirm: true,
      iconVisible: false,
      onClose: (result: boolean) => {
        // console.log(result);
        if (result) {
          console.log('data {} => ', data);
        }
      },
    });*/
  };
  const init = async () => {
    const translation = (await getTranslation()) as any;
    const representative = translation.translations.find((tr: any) => tr.locale === 'kr');
    console.log(translation);
    fetchData({
      ...translation,
      translation: representative.translation,
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="button" variant="point" size="sm" onClick={() => handleOpenTranslation()}>
            다국어
          </Button>
          <Button type="submit" variant="point" size="sm">
            저장
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={handleGoToListPage}>
            목록
          </Button>
        </ContentsButtons>
        <MainContents>
          <I18nContainer control={control} name={'translations'} defaultLang={'kr'}>
            <ContentsRow>
              <h1 className={'title_3_b'}>기본정보</h1>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'keyType'} />
              </FormRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'code'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={`translations.translation`}>
                  <FormTranslationBox />
                </DynamicFormField>
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'messageDesc'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'isUsed'} />
              </FormRow>
            </ContentsRow>
          </I18nContainer>
        </MainContents>
      </PageContainer>
    </form>
  );
}
const translationBuilderConfig = {
  name: 'translations',
  type: 'array',
  fields: [
    {
      label: '언어',
      name: 'locale',
      type: 'custom',
      value: '',
    },
    {
      label: '기준 언어',
      name: 'translation',
      type: 'translationBox',
      value: '',
    },
  ],
  value: [],
};

const translationItemSchema = z
  .object({
    locale: z.string(),
    translation: z.string(),
  })
  .refine(
    (data) => data.locale !== 'kr' || (data.locale === 'kr' && data.translation.trim() !== ''),
    {
      message: "locale이 'kr'인 경우 translation은 필수입니다.",
      path: ['translation'], // 에러 메시지가 translation 필드에 붙습니다.
    },
  );

const formConfig: DynamicFormConfig = {
  builders: [
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
      ],
    },
    {
      name: 'code',
      type: 'text',
      label: '다국어 코드',
      value: '',
    },
    {
      ...translationBuilderConfig,
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
      value: false,
    },
  ],
  validator: {
    translations: z.array(translationItemSchema),
    keyType: z.string().required(),
  },
};

const translationConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'keyType',
      type: 'text',
      value: '',
    },
    {
      ...translationBuilderConfig,
    },
  ],
  validator: {},
};

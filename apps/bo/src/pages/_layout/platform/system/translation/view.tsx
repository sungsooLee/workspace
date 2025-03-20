import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button, DynamicFormField, useModal } from '@learnway/ui';
import { z } from '@learnway/shared';

import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../../../widgets/layout/ui/container/parts/contents-row';

import { FormTranslationBox } from '../../../../../features/platform/ui/platform/system/translation/form-translation-box';
import { useTranslation } from '../../../../../entities/translation/service/translation.hook';
import { useEffect } from 'react';
import { LOCALES } from '@learnway/config';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { TranslationPopup } from '../../../../../features/form/ui/translation';
import { FormI18n } from '../../../../../features/form/ui';
import { FormRow } from '../../../../../shared/ui/form';

export const Route = createFileRoute('/_layout/platform/system/translation/view')({
  component: RouteComponent,
});
const DEFAULT_LANG = 'ko';
function RouteComponent() {
  const { messageId, processType, save, update, getTranslation } = useTranslation();
  const { confirm: openConfirm, open } = useModal();
  const router = useRouter();
  const { provider, control, onSubmit, fetchData, getValues, onFormChange, setFormError } =
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
          defaultLang={DEFAULT_LANG}
          translations={{
            keyType: getValues().keyType,
            translations: getValues().translations,
          }}
          config={translationConfig}
        />
      ),
      width: 'xl',
      height: 'lg',
      // title: '다국어 번역',
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
    setFormError('code', '중복체크');

    if (processType === 'REGISTER') {
      openConfirm({
        content: <>다국어를 저장 하시겠습니까?</>,

        onClose: (result: boolean) => {
          if (result) {
            save(data);
          }
        },
      });
    } else {
      openConfirm({
        content: <>다국어를 수정 하시겠습니까?</>,

        onClose: (result: boolean) => {
          if (result) {
            update(data);
          }
        },
      });
    }

    /*openConfirm({
      description: <>다국어를 저장하시겠습니까?</>,

      onClose: (result: boolean) => {
        // console.log(result);
        if (result) {
          save(data);
        }
      },
    });*/
  };
  const init = async () => {
    if (!messageId) return;
    const translation = (await getTranslation(messageId)) as any;
    const translations = Object.entries(LOCALES).map(([key, value]) => {
      const findTranslation = translation.translations.find((ts: any) => ts.locale === key) as any;
      if (findTranslation) {
        return findTranslation;
      }
      return { locale: key, translation: '' };
    });
    const newTranslation = {
      messageId: translation.messageId + '',
      code: translation.code,
      keyType: translation.keyType,
      messageDesc: translation.messageDesc,
      translations,
      isUsed: true,
    };
    fetchData(newTranslation);
  };

  const handleCodeDuplicationCheck = () => {
    const code = getValues().code;
    if (!code) {
      setFormError('code', '다국어코드를 입력해주세요.');
    }
    console.log('code => ', code);
  };

  useEffect(() => {
    if (processType === 'MODIFY') {
      init();
    }
  }, [processType]);

  return (
    processType !== 'LOADING' && (
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <PageContainer>
          <ContentsButtons>
            {processType === 'MODIFY' && (
              <Button
                type="button"
                variant="point"
                size="sm"
                onClick={() => handleOpenTranslation()}>
                다국어
              </Button>
            )}
            <Button type="submit" variant="point" size="sm">
              {processType === 'REGISTER' ? '저장' : '수정'}
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleGoToListPage}>
              목록
            </Button>
          </ContentsButtons>
          <MainContents>
            <FormI18n control={control} name={'translations'} defaultLang={DEFAULT_LANG}>
              <ContentsRow>
                <h1 className={'title_3_b'}>기본정보</h1>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'keyType'} />
                </FormRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'code'} />
                  <Button
                    type="button"
                    variant="point"
                    size="sm"
                    onClick={handleCodeDuplicationCheck}>
                    중복확인
                  </Button>
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
            </FormI18n>
          </MainContents>
        </PageContainer>
      </form>
    )
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
      label: '제목',
      name: 'translation',
      type: 'translationBox',
      value: '',
    },
  ],
  value: [
    {
      locale: DEFAULT_LANG,
      translation: '',
    },
  ],
};

const translationItemSchema = z
  .object({
    locale: z.string(),
    translation: z.string(),
  })
  .refine(
    (data) =>
      data.locale !== DEFAULT_LANG ||
      (data.locale === DEFAULT_LANG && data.translation.trim() !== ''),
    {
      message: ``,
      path: ['translation'], // 에러 메시지가 translation 필드에 붙습니다.
    },
  );

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

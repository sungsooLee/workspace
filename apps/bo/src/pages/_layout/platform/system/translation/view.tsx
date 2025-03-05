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
const DEFAULT_LANG = 'ko_KR';
function RouteComponent() {
  const { processType, save, update, getTranslation } = useTranslation();
  const { confirm: openConfirm, open } = useModal();
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
    if (processType === 'REGISTER') {
      openConfirm({
        description: <>다국어를 저장 하시겠습니까?</>,
        isConfirm: true,
        iconVisible: false,
        onClose: (result: boolean) => {
          if (result) {
            save(data);
          }
        },
      });
    } else {
      openConfirm({
        description: <>다국어를 수정 하시겠습니까?</>,
        isConfirm: true,
        iconVisible: false,
        onClose: (result: boolean) => {
          if (result) {
            update(data);
          }
        },
      });
    }

    /*openConfirm({
      description: <>다국어를 저장하시겠습니까?</>,
      isConfirm: true,
      iconVisible: false,
      onClose: (result: boolean) => {
        // console.log(result);
        if (result) {
          save(data);
        }
      },
    });*/
  };
  const init = async () => {
    const translation = (await getTranslation('20')) as any;
    console.log(translation);
    const translations = Object.entries(localeCodes).map(([key, value]) => {
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
    console.log('newTranslation => ', newTranslation);
    fetchData(newTranslation);
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
            <Button type="button" variant="point" size="sm" onClick={() => handleOpenTranslation()}>
              다국어
            </Button>

            <Button type="submit" variant="point" size="sm">
              {processType === 'REGISTER' ? '저장' : '수정'}
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleGoToListPage}>
              목록
            </Button>
          </ContentsButtons>
          <MainContents>
            <I18nContainer control={control} name={'translations'} defaultLang={DEFAULT_LANG}>
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
      label: '기준 언어',
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
      message: `locale이 ${DEFAULT_LANG} 인 경우 translation은 필수입니다.`,
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
const localeCodes: { [key: string]: string } = {
  ko_KR: 'ko_KR',
  ar: 'ar',
  zh: 'zh',
  'zh-TW': 'zh-TW',
  hr: 'hr',
  de: 'de',
  en: 'en',
  'en-AU': 'en-AU',
  et: 'et',
  fr: 'fr',
  he: 'he',
  hi: 'hi',
  id: 'id',
  it: 'it',
  ja: 'ja',
  ms: 'ms',
  ne: 'ne',
  fa: 'fa',
  pt: 'pt',
  'pt-BR': 'pt-BR',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  es: 'es',
  'es-LA': 'es-LA',
  th: 'th',
  tr: 'tr',
  vi: 'vi',
};

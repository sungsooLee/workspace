import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button, useModal } from '@learnway/ui';
import { z } from '@learnway/shared';

import useDynamicForm from '../../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../../../widgets/layout/ui/container/parts/contents-row';
import { DynamicFormConfig, DynamicFormField } from '../../../../../shared/ui/dynamic-form-field';
import { FormRow } from '../../../../../shared/ui/form-row';
import { FormTranslationBox } from '../../../../../features/platform/ui/platform/system/translation/form-translation-box';
import { useTranslation } from '../../../../../entities/translation/service/translation.hook';

export const Route = createFileRoute('/_layout/platform/system/translation/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { save, update } = useTranslation();
  const { alert: openAlert } = useModal();
  const router = useRouter();
  const { provider, onSubmit } = useDynamicForm(formConfig);
  /**
   * 목록으로 이동
   */
  const handleGoToListPage = () => {
    router.navigate({ to: '/platform/system/translation' });
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
      parentId: 1,
      translations: [
        {
          locale: data.locale,
          translation: data.translation,
        },
      ],
    };
    delete saveData.locale;
    delete saveData.translation;
    console.log('saveData => ', saveData);
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
  /*
{
  "commonCodeId": 1,
  "code": "LANGUAGE_CODE",
  "koreanName": "언어코드",
  "englishName": "LANGUAGE CODE",
  "commonCodeDesc": "Refer to ISO 639-1 for list of languages and codes.",
  "depth": 2,
  "sortOrder": 1,
  "isUsed": "TRUE",
  "isDeleted": "FALSE",
  "parentId": 1
}
* */
  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="submit" variant="point" size="sm">
            저장
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={handleGoToListPage}>
            목록
          </Button>
        </ContentsButtons>
        <MainContents>
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
              <DynamicFormField name={'translation'}>
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
        </MainContents>
      </PageContainer>
    </form>
  );
}

const translation = [
  {
    name: 'kr',
    label: '한국어',
  },
  {
    name: 'en',
    label: '영어',
  },
  {
    name: 'ne',
    label: '네팔어',
  },
  {
    name: 'de',
    label: '독일어',
  },
  {
    name: 'ru',
    type: 'text',
    label: '러시아어',
    value: '러시아어',
  },
  {
    name: 'ro',
    label: '루마니아어',
  },
  {
    name: 'ms',
    label: '말레이어',
  },
  {
    name: 'vi',
    label: '베트남어',
  },
  {
    name: 'es',
    label: '스페인어',
  },
  {
    name: 'es-lat',
    label: '스페인어(라틴)',
  },
  {
    name: 'sl',
    label: '슬로베니아어',
  },
  {
    name: 'ar',
    label: '아랍어',
  },
  {
    name: 'et',
    label: '에스토니아어',
  },
  {
    name: 'en-au',
    label: '영어(호주)',
  },
  {
    name: 'it',
    label: '이탈리아어',
  },
  {
    name: 'id',
    label: '인도네시아어',
  },
  {
    name: 'ja',
    label: '일본어',
  },
  {
    name: 'zh',
    label: '중국어',
  },
  {
    name: 'zh-tw',
    label: '중국어(대만)',
  },
  {
    name: 'hr',
    label: '크로아티아어',
  },
  {
    name: 'th',
    label: '태국어',
  },
  {
    name: 'tr',
    label: '튀르키예어',
  },
  {
    name: 'fa',
    label: '페르시아어',
  },
  {
    name: 'pt',
    label: '포르투칼어',
  },
  {
    name: 'pt-br',
    label: '포르투칼어(브라질)',
  },
  {
    name: 'fr',
    label: '프랑스어',
  },
  {
    name: 'he',
    label: '히브리어',
  },
  {
    name: 'hi',
    label: '힌디어',
  },
];

const formConfig: DynamicFormConfig = {
  builders: [
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
      name: 'locale',
      type: 'text',
      label: '언어',
      value: 'kr',
    },
    {
      name: 'translation',
      type: 'custom',
      label: '기준언어(한국어)',
      value: '',
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
    keyType: z.string().required(),
    code: z.string().required(),
    translation: z.string().required(),
    locale: z.string().required(),
  },
};

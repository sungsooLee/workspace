import { createFileRoute, useRouter } from '@tanstack/react-router';
import { z } from '@learnway/shared';
import { Button, useModal } from '@learnway/ui';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsRow } from '../../../widgets/layout/ui/container/parts/contents-row';
import { DynamicFormConfig, DynamicFormField } from '../../../shared/ui/dynamic-form-field';
import useDynamicForm from '../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { t } from 'i18next';

export const Route = createFileRoute('/_layout/menu/translation-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert } = useModal();
  const router = useRouter();
  const { provider, onSubmit } = useDynamicForm(formConfig);
  /**
   * 목록으로 이동
   */
  const handleGoToListPage = () => {
    router.navigate({ to: '/menu/translation-management' });
  };

  /**
   * 다국어 저장
   * @param data
   */
  const handleOnSubmit = (data: any) => {
    openAlert({
      title: <></>,
      description: <>다국어를 저장하시겠습니까?</>,
      isConfirm: true,
      iconVisible: false,
      onClose: (result: boolean) => {
        // console.log(result);
        if (result) {
          console.log('data {} => ', data);
        }
      },
    });
  };

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
            <DynamicFormField provider={provider} name={'gnb'} />
          </ContentsRow>
          <ContentsRow>
            <DynamicFormField provider={provider} name={'code'} />
          </ContentsRow>
          <ContentsRow>
            <DynamicFormField provider={provider} name={'ru'} />
          </ContentsRow>
          <ContentsRow>
            <h1 className={'title_3_b'}>언어정보</h1>
          </ContentsRow>
          {translation.map((tr) => (
            <ContentsRow key={tr.name}>
              <DynamicFormField provider={provider} name={tr.name} />
            </ContentsRow>
          ))}
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
      name: 'gnb',
      type: 'dropdown',
      label: '다국어 분류',
      value: '01',
      options: [{ value: '01', label: '공통코드' }],
    },
    {
      name: 'code',
      type: 'text',
      label: '다국어 코드',
      value: '',
    },
    {
      name: 'ru',
      type: 'text',
      label: '러시아어',
      value: '러시아어',
    },
    ...translation.map((tr) => ({ ...tr, type: 'text', value: '' })),
  ],
  validator: {
    gnb: z.string().required(),
    code: z.string().required('필수 값을 입력 해 주세요'),
    en: z.string().required(),
    kr: z.string().required(),
    ne: z.string().email().optional(),
  },
};

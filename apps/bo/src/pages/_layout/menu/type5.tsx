import { createFileRoute } from '@tanstack/react-router';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { DynamicFormConfig, SearchBoxConfig, useDynamicForm, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../shared/ui/search-box';
import { t } from 'i18next';
import { Button, ContentsRow, DynamicFormField } from '@learnway/ui';
import { FormRow } from '../../../shared/ui/form';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { FormDisplay } from '../../../features/form/ui/form-display';
import { ValidatorConfig } from '@/libs/shared/src/lib/types/zod';
import { buildJodObject } from '@learnway/shared';
import { SubTitlesFormField } from '../../../features/form/ui';
import React from 'react';

export const Route = createFileRoute('/_layout/menu/type5')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit } = useDynamicForm(formConfig);

  const onHandleSubmit = (data: any) => {
    console.log('search config1 data => ', data);
  };

  const handleObjectValid = () => {
    const schema = buildJodObject(objectValid);
    const validData = {
      name: '',
      age: '',
    };
    try {
      const result = schema.parse(validData);
      console.log('유효성 검사 통과:', result);
    } catch (e: any) {
      console.error('유효성 검사 실패:', e.errors);
    }
  };

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="submit" variant="point" size="sm">
            등록
          </Button>

          <Button type="button" variant="point" size="sm" onClick={handleObjectValid}>
            유효성 체크
          </Button>
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'email'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'regxName'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'channelId'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'isExternalCompanyInfo'} />
            </FormRow>
          </ContentsRow>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isExternalCompanyInfo', value: true }]}>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'externalCompanyName'} />
              </FormRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'externalCompanyManagerName'} />
              </FormRow>
            </ContentsRow>
          </FormDisplay>
          <ContentsRow>
            {/*자막 목록*/}
            <FormRow provider={provider}>
              <DynamicFormField name={'subtitles'}>
                <SubTitlesFormField />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
        </MainContents>
      </PageContainer>
    </form>
  );
}

const objectValid: ValidatorConfig = {
  name: {
    format: 'string',
    required: true,
  },
};

const formConfig: DynamicFormConfig = {
  builders: [
    {
      label: '이메일',
      type: 'text',
      name: 'email',
      value: '',
      format: 'email', // 기본 string
    },
    {
      label: '정규표현식체크',
      type: 'text',
      name: 'regxName',
      value: '',
      format: 'string', // 기본 string
    },
    {
      label: '채널 아이디',
      type: 'text',
      name: 'channelId',
      value: '',
      format: 'string', // 기본 string
    },
    {
      label: '채널 아이디',
      type: 'text',
      name: 'channelName',
      value: '',
      format: 'string', // 기본 string
    },
    {
      label: '외부업체정보여부',
      name: 'isExternalCompanyInfo',
      type: 'switch',
      format: 'boolean', // 기본 string
      value: false,
    },
    {
      label: '외부 업체명',
      name: 'externalCompanyName',
      type: 'text',
      format: 'string', // 기본 string
      value: '',
    },
    {
      label: '외부 업체당당자',
      name: 'externalCompanyManagerName',
      type: 'text',
      format: 'string', // 기본 string
      value: '',
    },
    {
      label: '배열 데이터',
      name: 'subtitles',
      type: 'custom',
      format: 'array', // 기본 string
      value: [],
    },
  ],
  validator: {
    channelId: true,
    externalCompanyName: {
      required: (values: Record<string, any>) => values.isExternalCompanyInfo === true,
    },
    externalCompanyManagerName: {
      required: {
        fn: (values: Record<string, any>) => values.isExternalCompanyInfo === true,
        message: '여기는 안돼',
      },
      conditions: [
        {
          fn: (values: Record<string, any>) =>
            values.channelId === '123' &&
            values.isExternalCompanyInfo === true &&
            values.externalCompanyManagerName !== '홍길동',
          message: '채널아이디가 123일때는 홍길동으로 입력해주셔야 합니다.',
        },
      ],
    },
    password1: true,
    password2: {
      required: true,
      conditions: [
        {
          fn: (values: Record<string, any>) => !values.isCheck,
          message: '비밀번호 확인을 눌러주세요',
        },
        {
          fn: (values: Record<string, any>) => values.password1 !== values.password2,
          path: 'password1',
          message: '비밀번호 달라요',
        },
      ],
    },
    subtitles: {
      required: {
        message: '자막데이터는 하나이상 등록 해야 합니다.',
      },
    },
  },
};

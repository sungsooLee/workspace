import { createFileRoute } from '@tanstack/react-router';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  BaseFormFieldProps,
  DynamicFormConfig,
  useDynamicForm,
  useDynamicFormContext,
} from '@learnway/hooks';
import { Button, ContentsRow, DynamicFormField, Input } from '@learnway/ui';
import { FormRow } from '../../../shared/ui/form';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { FormDisplay } from '../../../features/form/ui/form-display';
import { ValidatorConfig } from '@/libs/shared/src/lib/types/zod';
import { buildJodObject } from '@learnway/shared';
import { SubTitlesFormField } from '../../../features/form/ui';
import React, { forwardRef, useState } from 'react';
import { FormInfoArea } from '@shared/ui/form/components/form-info-area';

export const Route = createFileRoute('/_layout/menu/type5')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit, onFormChange, onFormValid } = useDynamicForm(formConfig);
  const [disable, setDisable] = useState(false);
  const onHandleSubmit = (data: any) => {
    console.log('search config1 data => ', data);
  };

  const handleObjectValid = () => {
    const schema = buildJodObject(objectValid2);
    const validData = {};
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
          <Button type="button" variant="point" size="sm" onClick={() => onFormChange()}>
            리셋
          </Button>
          <Button type="button" variant="point" size="sm" onClick={() => onFormValid()}>
            강제 유효성 체크
          </Button>
          <Button
            type="button"
            variant="point"
            size="sm"
            onClick={() => setDisable((state) => !state)}
          >
            Disable
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
              <FormInfoArea>
                <Button disabled={disable}>{disable ? '사용' : '미사용'}</Button>
              </FormInfoArea>
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
            dependencies={[{ name: 'isExternalCompanyInfo', value: true }]}
          >
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
          <ContentsRow>
            {/*자막 목록*/}
            <FormRow provider={provider}>
              <DynamicFormField name={'changeGuideText'}>
                <ChangeGuidText />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
        </MainContents>
      </PageContainer>
    </form>
  );
}

const ChangeGuidText = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
  ({ value, onChange }) => {
    const { onChangeGuideText } = useDynamicFormContext();
    return (
      <div className={'flex'}>
        <Input value={value} onChange={(e: any) => onChange(e.target.value)} />
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() =>
            onChangeGuideText(<span style={{ color: 'blue' }}>가이드 텍스트 변경1 입니다.</span>)
          }
        >
          변경1
        </Button>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() =>
            onChangeGuideText(<span style={{ color: 'red' }}>가이드 텍스트 변경 2 입니다.</span>)
          }
        >
          변경2
        </Button>
      </div>
    );
  },
);

const objectValid2: ValidatorConfig = {
  tabKey: {
    default: undefined,
    format: 'string',
    conditions: [
      {
        fn: (values: Record<string, any>) => values.tabKey === '1',
      },
    ],
  },
};
const objectValid: ValidatorConfig = {
  name: {
    default: undefined,
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
    {
      label: '가이드텍스트 변경',
      name: 'changeGuideText',
      type: 'custom',
      format: 'string', // 기본 string
      value: '',
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

import { FC, useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import {
  Button,
  ChipListModalSelectorFormField,
  useGridBox,
  useGridBoxConfig,
  ContentsRow,
  GridBox,
  Input,
  TextareaFormField,
  RadioGroupFormField,
} from '@learnway/ui';
import {
  ContentsHistoryInfoFormField,
  FormInfoArea,
  FormRow,
  FormSubTitle,
  SwitchFormField,
} from '@shared/ui';
import {
  DynamicFormConfig,
  useDynamicForm,
  CODE_GROUP,
  useSearchBox,
  SearchBoxConfig,
} from '@learnway/hooks';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const CompanyDetailComponent: FC<any> = ({ mode }) => {
  const { provider, fetchData, onSubmit, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);
  return (
    <>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'linkageSystem'}
          element={<RadioGroupFormField disabled={true} />}
        />
      </ContentsRow>

      <FormSubTitle label={'HR 시스템 연동 정보'} />
      <ContentsRow type={'horizontal'}>
        <FormRow
          className={dynamicFormStyles.w_half}
          provider={provider}
          name={'isUseLinkageSystem'}
          element={<SwitchFormField disabled={true} />}
        />
      </ContentsRow>

      <FormSubTitle label={'회사 기본 정보'} />
      <ContentsRow>
        <FormRow className={dynamicFormStyles.w_half} provider={provider} name={'companyType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'name'} />
        <FormRow provider={provider} name={'engName'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'brn'} />
        <FormRow provider={provider} name={'rpsntrName'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'abbreviation'} />
        <FormRow provider={provider} name={'managerEmail'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'managerPhone'} />
        <FormRow provider={provider} name={'managerFax'} />
      </ContentsRow>

      <FormSubTitle label={'플랫폼 계약 설정 정보'} />
      <ContentsRow>
        <FormRow provider={provider} name={'serviceType'} />
        <FormRow provider={provider} name={'paymentCompanyCode'} />
      </ContentsRow>

      <FormSubTitle label={'로그인 및 인증 설정 정보'} />
    </>
  );
};

export const CompanyDetail = CompanyDetailComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'linkageSystem',
      type: 'radio-group',
      label: t('HR 시스템 연동 방식 설정'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.LinkageSystem'],
      },
    },
    {
      name: 'isUseLinkageSystem',
      type: 'switch',
      label: t('HR 시스템 연동 여부'),
      value: false,
      guideText: '회사 정보를 수동 입력하는 경우 등록 정보를 직접 입력해야 합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? 'HR 연동' : '수동 등록'),
      },
    },
    {
      name: 'companyType',
      type: 'radio-group',
      label: t('그룹'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.CompanyType'],
      },
    },
    {
      name: 'name',
      type: 'text',
      label: t('회사명'),
      value: '',
    },
    {
      name: 'engName',
      type: 'text',
      label: t('회사명(영문)'),
      value: '',
    },
    {
      name: 'brn',
      type: 'text',
      label: t('사업자등록번호'),
      value: '',
      placeholder: '사업자등록번호 입력(123-12-12345)',
    },
    {
      name: 'rpsntrName',
      type: 'text',
      label: t('대표자명'),
      value: '',
    },
    {
      name: 'abbreviation',
      type: 'text',
      label: t('법인 약어'),
      value: '',
    },
    {
      name: 'managerEmail',
      type: 'text',
      label: t('대표 이메일'),
      value: '',
      placeholder: 'hyundai@hyundai.com',
    },
    {
      label: t('대표 전화번호'),
      name: 'managerPhone',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'nationCode',
        number: 'managerPhone',
      },
    },
    {
      label: t('대표 팩스번호'),
      name: 'managerFax',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'faxNationCode',
        number: 'managerFax',
      },
    },
    {
      name: 'serviceType',
      type: 'radio-group',
      label: t('서비스 유형 선택'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.PlatformServiceType'],
      },
    },
    {
      name: 'paymentCompanyCode',
      type: 'text',
      label: t('비용 결재 용 법인 코드'),
      value: '',
    },
  ],
  validator: {
    name: true,
    engName: true,
    brn: true,
  },
};

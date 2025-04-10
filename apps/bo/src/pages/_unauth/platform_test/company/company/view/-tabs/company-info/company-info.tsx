import { FormRow, FormSubTitle } from '../../../../../../../../shared/ui/form';
import { Button, ContentsRow, DynamicFormField } from '@learnway/ui';
import React from 'react';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const CompanyInfoComponent = () => {
  const { t } = useTranslation();
  const { provider, onSubmit, control, getValues } = useDynamicForm(formConfig);
  return (
    <>
      <FormSubTitle
        label={t('회사 기본 정보')}
        actionNode={<Button label={'저장'} variant={'point'} size={'md'} />}
        underLine
      />
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'companyType'} />
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'name'} />
        </FormRow>
      </ContentsRow>
    </>
  );
};

export const CompanyInfo = CompanyInfoComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'companyType',
      type: 'radio-group',
      label: t('화사구분'),
      format: 'array',
      value: [],
      options: [
        {
          value: 'visiblePcYn',
          label: 'PC',
        },
        {
          value: 'visibleMobileYn',
          label: '모바일',
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      label: t('화사/법인명'),
      value: '',
    },
  ],
};

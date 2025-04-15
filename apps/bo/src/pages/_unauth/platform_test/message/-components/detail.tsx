import { useTranslation } from 'react-i18next';
import { Button, ContentsRow, DynamicFormField } from '@learnway/ui';
import React from 'react';
import { FormRow, FormSubTitle } from '@shared/ui/form';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { t } from 'i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';

const MessageDetailComponent = () => {
  const { t } = useTranslation();
  const { provider, onSubmit, control, getValues } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle
        label={'상세정보'}
        underLine
        actionNode={
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text}>
              {'추가'}
            </Button>
            <Button variant="save" size="sm" type={'submit'}>
              {'저장'}
            </Button>
          </div>
        }
      />
      <div className="inner_contents">
        {/*분류*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'labelMessageType'} />
          </FormRow>
        </ContentsRow>
        {/*메세지코드*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'labelMessageMultilingulKey'} />
          </FormRow>
        </ContentsRow>
        {/*메세*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'labelMessageName'} />
          </FormRow>
        </ContentsRow>
        {/*설명*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'labelMessageDesc'} />
          </FormRow>
        </ContentsRow>
        {/*사용여부*/}
        <ContentsRow type={'horizontal'} className={'inactive'}>
          <FormRow provider={provider}>
            <DynamicFormField name={'isUsed'} />
          </FormRow>
        </ContentsRow>
      </div>
    </form>
  );
};

export const MessageDetail = MessageDetailComponent;

/**
 * 필수값 : name, type
 */
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'labelMessageType',
      label: t('분류'),
      type: 'radio-group',
      format: 'string',
      options: [
        {
          label: '라벨',
          value: '1',
        },
        {
          label: '메세지',
          value: '2',
        },
      ],
      value: '',
    },
    {
      name: 'labelMessageMultilingulKey',
      label: t('메세지 코드'),
      type: 'text',
      value: '',
    },
    {
      name: 'labelMessageName',
      label: t('메세지'),
      type: 'text-area',
      value: '',
    },
    {
      name: 'labelMessageDesc',
      label: t('설명'),
      type: 'text-area',
      value: '',
    },
    {
      name: 'isUsed',
      label: t('사용여부'),
      type: 'switch',
      value: false,
      format: 'boolean',
    },
  ],
};

import { useTranslation } from 'react-i18next';
import { Button, ContentsRow, DynamicFormField, useModal } from '@learnway/ui';
import React, { useEffect } from 'react';

import { FormRow, FormSubTitle } from '@shared/ui/form';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { FormInfoArea } from '@shared/ui/form/components/form-info-area';
import {
  useCreateLabelMessage,
  useFetchLabelMessage,
  useUpdateLabelMessage,
} from '@entities/label-messages';
import { useRouter } from '@tanstack/react-router';

interface MessageDetailProps {
  /**
   * 라벨/메세지 NO
   */
  labelMessageId: number;
}

const MessageDetailComponent = ({ labelMessageId }: MessageDetailProps) => {
  const { t } = useTranslation<any>();
  const router = useRouter();
  const { confirm: openConfirm } = useModal();
  const [isCreateMode, setIsCreateMode] = React.useState(false);
  const { provider, onSubmit, control, getValues, fetchData, onFormChange } =
    useDynamicForm(formConfig);
  const { data } = useFetchLabelMessage(labelMessageId);
  const { mutate: create } = useCreateLabelMessage({
    onSuccess: async (response: any) => {
      console.log('useCreateLabelMessage :: onSuccess', response);
    },
  });
  const { mutate: update } = useUpdateLabelMessage({
    onSuccess: async (response: any) => {
      console.log('useUpdateLabelMessage :: onSuccess', response);
    },
  });

  useEffect(() => {
    // 음수인 경우 추가 모드 (부모창에서 추가 버튼 눌렀을때 음수가 넘어옴)
    const isCreate = labelMessageId < 0;
    // 폼 초기화 (부모창에서 추가 버튼 눌렀을때)
    isCreate && fetchData();
    // set state
    setIsCreateMode(isCreate);
  }, [labelMessageId]);

  useEffect(() => {
    console.log('detail :: useEffect.data', data);
    // data && fetchData(data);
    fetchData(data)
  }, [data]);

  const handleMultilingualManageClick = () => {
    router.navigate({
      to: '/platform/system/multilingual',
      state: {
        keyType: data?.labelMessageType, // LABEL, MESSAGE
        multilinguaKey: data?.labelMessageMultilingulKey, // 메세지 코드
      },
    });
  };

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    const payload = {
      ...data,
      labelMessageId: isCreateMode ? '' : data?.labelMessageId,
    };
    if (await openConfirm('저장 하시겠습니까?')) {
      isCreateMode ? create(payload) : update(payload);
    }
  };


  console.log({isCreateMode, labelMessageId});

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle
        label={'상세정보'}
        underLine
        actionNode={
          <div className={layoutStyles.btn_wrap}>
            <Button variant="save" size="sm" type={'submit'} label={t('저장')} />
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
        {/*메세지*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <FormInfoArea>
              <Button
                variant="point"
                size="sm"
                label={t('다국어 관리')}
                disabled={isCreateMode}
                onClick={handleMultilingualManageClick}
              />
            </FormInfoArea>
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
      label: '분류',
      type: 'radio-group',
      format: 'string',
      options: [
        { value: 'LABEL', label: '라벨' },
        { value: 'MESSAGE', label: '메세지' },
      ],
      value: 'LABEL',
    },
    {
      name: 'labelMessageMultilingulKey',
      label: '메세지 코드',
      type: 'text',
      value: '',
    },
    {
      name: 'labelMessageName',
      label: '메세지',
      type: 'textarea',
      format: 'string',
      value: '',
    },
    {
      name: 'labelMessageDesc',
      label: '설명',
      type: 'textarea',
      value: '',
    },
    {
      name: 'isUsed',
      label: '사용여부',
      type: 'switch',
      value: false,
      format: 'boolean',
    },
    {
      name: 'labelMessageId',
      type: 'hidden',
      format: 'number',
      value: ''
    },
  ],
  validator: {
    labelMessageType: {
      required: true,
    },
    labelMessageMultilingulKey: {
      required: true,
    },
    labelMessageName: {
      required: true,
    },
  },
};

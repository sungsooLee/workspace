import { useTranslation } from 'react-i18next';
import { Button, ContentsRow, DynamicFormField, useModal } from '@learnway/ui';
import React, { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

import { FormRow, FormSubTitle } from '@shared/ui/form';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { FormInfoArea } from '@shared/ui/form/components/form-info-area';
import {
  useCreateLabelMessage,
  useFetchLabelMessage,
  useUpdateLabelMessage,
} from '@entities/label-messages';

interface MessageDetailProps {
  /**
   * 라벨/메세지 NO
   */
  labelMessageId: number;

  /**
   * 저장 완료 callback function
   */
  onSuccessSave?: () => void;
}

const MessageDetailComponent = ({ labelMessageId, onSuccessSave }: MessageDetailProps) => {
  const router = useRouter();
  const { t } = useTranslation<any>();
  const [isCreateMode, setIsCreateMode] = React.useState(true);
  const { confirm: openConfirm } = useModal();
  const { provider, onSubmit, onFormChange, getValues } = useDynamicForm(formConfig);
  const { data } = useFetchLabelMessage(labelMessageId);
  const { mutate: create } = useCreateLabelMessage({
    onSuccess: async (response: any) => {
      console.log('useCreateLabelMessage :: onSuccess', response);
      onSuccessSave?.();
    },
  });
  const { mutate: update } = useUpdateLabelMessage({
    onSuccess: async (response: any) => {
      console.log('useUpdateLabelMessage :: onSuccess', response);
      onSuccessSave?.();
    },
  });

  useEffect(() => {
    console.log('labelMessageId', labelMessageId);
    // 생성 모드 (labelMessageId 음수인 경우, 부모창에서 추가 버튼 눌렀을때 음수로 설정)
    const isCreate = labelMessageId < 0;
    // set state
    setIsCreateMode(isCreate);
    // 생성 모드는 폼 내용 초기화
    if (isCreate) {
      onFormChange();
    }
  }, [labelMessageId]);

  useEffect(() => {
    console.log('detail :: useEffect.data', data);
  }, [data]);

  const handleMultilingualManageClick = () => {
    router.navigate({
      to: '/platform/system/multilingual',
      state: {
        keyType: data?.labelMessageType || 'LABEL', // 다국어 분류, 서버에서 labelMessageType 값 안넘어와서 임시로 하드코딩
        multilinguaKey: data?.labelMessageMultilingulKey, // 다국어 키
        translation: data?.labelMessageName, // 한글 번역값
      },
    });
  };

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    if (await openConfirm('저장 하시겠습니까?')) {
      isCreateMode ? create(data) : update(data);
    }
  };

  console.log('isCreateMode', isCreateMode);
  console.log('data?.labelMessageId', data?.labelMessageId);

  // console.log('getValues', getValues('labelMessageMultilingulKey'));
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
                disabled={!getValues('labelMessageId')}
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
      maxLength: 150,
    },
    {
      name: 'labelMessageName',
      label: '메세지',
      type: 'textarea',
      format: 'string',
      value: '',
      maxLength: 150,
    },
    {
      name: 'labelMessageDesc',
      label: '설명',
      type: 'textarea',
      value: '',
      maxLength: 150,
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
      value: '',
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

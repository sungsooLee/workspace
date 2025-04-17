import { useTranslation } from 'react-i18next';
import { Button, ContentsRow, DynamicFormField, useModal } from '@learnway/ui';
import React, { useEffect } from 'react';
import { FormRow, FormSubTitle } from '@shared/ui/form';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { t } from 'i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { FormInfoArea } from '@shared/ui/form/components/form-info-area';
import { useLabelMessages } from '@entities/label-messages';

interface MessageDetailProps {
  /**
   * 라벨/메세지 NO
   */
  labelMessageId?: number;
}

const MessageDetailComponent = ({ labelMessageId }: MessageDetailProps) => {
  const { t } = useTranslation();
  const { showSaveComplete } = useModal();
  const { provider, onSubmit, control, getValues } = useDynamicForm(formConfig);
  const { detail } = useLabelMessages();

  useEffect(() => {
    console.log('labelMessageId', labelMessageId);
  }, [labelMessageId]);

  const handleMultilingualManageClick = (multilinguaKey: string) => {
    console.log('다국어 관리 화면 이동', {
      to: '/platform/system/multilingual',
      state: {
        keyType: 'LABEL', // 다국어 분류 (다국어 관리 화면에서 검색조건의 '분류' 기본값 설정시 사용)
        multilinguaKey, // 메세지 코드 (다국어 관리 화면에서 검색조건의 '코드' 기본값 설정시 사용)
      },
    });
    // 다국어 관리 화면 이동
    // router.navigate({
    //   to: '/platform/system/multilingual',
    //   state: {
    //     keyType: 'LABEL', // 다국어 분류 (다국어 관리 화면에서 검색조건의 '분류' 기본값 설정시 사용)
    // multilinguaKey, // 메세지 코드 (다국어 관리 화면에서 검색조건의 '코드' 기본값 설정시 사용)
    //   },
    // });
  };

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    // const x = await showSaveComplete();
    // console.log(x);
  };

  // console.log('getValues', getValues('labelMessageMultilingulKey'));
  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle
        label={'상세정보'}
        underLine
        actionNode={
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" label={t('추가')} />
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
                onClick={() =>
                  handleMultilingualManageClick(getValues('labelMessageMultilingulKey'))
                }
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
      format: 'string',
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
    {
      name: 'labelMessageId',
      type: 'hidden',
      value: '',
    },
  ],
};

import { useTranslation } from 'react-i18next';
import { Button, ContentsRow, DynamicFormField, useModal } from '@learnway/ui';
import React, { useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { FormRow, FormSubTitle } from '@shared/ui/form';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { FormInfoArea } from '@shared/ui/form/components/form-info-area';
import {
  queryOptions,
  useCreateLabelMessage,
  useFetchLabelMessage,
  useUpdateLabelMessage,
} from '@entities/label-messages';
import { DuplicateCodeGuideText } from '@features/platform/category';

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
  const { t } = useTranslation();
  const [isCreateMode, setIsCreateMode] = React.useState(true);
  const { confirm: openConfirm } = useModal();
  const { provider, onSubmit, onFormChange, getValues, fetchData, clearFormError, setFormError } =
    useDynamicForm(formConfig);
  const { data } = useFetchLabelMessage(labelMessageId);
  const formDisabled = labelMessageId === 0;

  // 라벨 메세지 등록
  const { mutate: create } = useCreateLabelMessage({
    onSuccess: async (response: any) => {
      console.log('useCreateLabelMessage :: onSuccess', response);
      onSuccessSave?.();
    },
  });

  // 라벨 메세지 수정
  const { mutate: update } = useUpdateLabelMessage({
    onSuccess: async (response: any) => {
      console.log('useUpdateLabelMessage :: onSuccess', response);
      onSuccessSave?.();
    },
  });

  /**
   * 라벨/메세지 ID가 변경될 때마다 호출됩니다.
   * 음수인 경우 생성 모드로 전환하며 폼을 초기화합니다.
   */
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

  /**
   * 조회된 데이터를 폼에 반영합니다.
   */
  useEffect(() => {
    data && fetchData(data);
  }, [data]);

  /**
   * 다국어 관리 페이지로 이동합니다.
   */
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

  /**
   * 저장 버튼 클릭 시 호출되는 이벤트 핸들러입니다.
   * 생성 또는 수정 API를 호출합니다.
   *
   * @param {any} data - 폼 데이터
   */
  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    const payload = {
      ...data,
      labelMessageId: isCreateMode ? '' : data?.labelMessageId,
    };
    if (await openConfirm(t('LABEL.confirm.save.title'))) {
      isCreateMode ? create(payload) : update(payload);
    }
  };

  const [isSuccessCodeCheck, setIsSuccessCodeCheck] = useState(false);
  const [codeCheckState, setCodeCheckState] = useState<'none' | 'success' | 'duplicate' | 'error'>(
    'none',
  );
  const handleCodeChange = (newCode: string) => {
    // 코드가 변경됐을 경우에만 중복 체크 필요
    onFormChange({
      isDuplicateMultilingulKey: true,
    });
    setCodeCheckState('none');

    // const isChanged = isFieldChanged('code', newCode);
    // if (onFormChange) {
    //   // 코드가 변경됐을 경우에만 중복 체크 필요
    //   onFormChange({
    //     isDuplicateMenuCode: !isChanged && mode === 'view',
    //   });
    //   setCodeCheckState(!isChanged && mode === 'view' ? 'success' : 'none');
    // }
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle
        label={t('LABEL.form.label.detailInfo')}
        underLine
        actionNode={
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="save"
              size="sm"
              type={'submit'}
              label={t('LABEL.button.save')}
              disabled={formDisabled}
            />
          </div>
        }
      />
      <div className="inner_contents">
        {/*분류*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'labelMessageType'} disabled={formDisabled} />
          </FormRow>
        </ContentsRow>
        {/*메세지코드*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'labelMessageMultilingulKey'} disabled={formDisabled}>
              <DuplicateCodeGuideText
                clearFormError={clearFormError}
                checkExists={async (data: string) => {
                  const list = await queryOptions.all({ labelMessageMultilingulKey: data });
                  console.log('list', list);
                  // checkExists(data, {
                  //   onSuccess: (data: any) => {
                  //     console.log('#### success', data);
                  //
                  //     const isUnique = data;
                  //     setIsSuccessCodeCheck(isUnique);
                  //     setCodeCheckState(isUnique ? 'success' : 'duplicate');
                  //
                  //     onFormChange?.({
                  //       isDuplicateMenuCode: isUnique,
                  //     });
                  //   },
                  //   onError: () => {
                  //     console.log('#### error');
                  //     setIsSuccessCodeCheck(false);
                  //     setCodeCheckState('error');
                  //     onFormChange?.({ isDuplicateMenuCode: false });
                  //   },
                  // });
                }}
                isSuccess={isSuccessCodeCheck}
                disabled={formDisabled}
                codeCheckState={codeCheckState}
                handleCodeChange={handleCodeChange}
                setFormError={setFormError}
              />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
        {/*메세지*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <FormInfoArea>
              {/* 다국어 관리 : 수정 모드에서만 활성화 */}
              <Button
                variant="point"
                size="sm"
                label={t('LABEL.button.multilingualManage')}
                disabled={!getValues('labelMessageId')}
                onClick={handleMultilingualManageClick}
              />
            </FormInfoArea>
            <DynamicFormField name={'labelMessageName'} disabled={formDisabled} />
          </FormRow>
        </ContentsRow>
        {/*설명*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'labelMessageDesc'} disabled={formDisabled} />
          </FormRow>
        </ContentsRow>
        {/*사용여부*/}
        <ContentsRow type={'horizontal'} className={'inactive'}>
          <FormRow provider={provider}>
            <DynamicFormField name={'isUsed'} disabled={formDisabled} />
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
      label: t('LABEL.form.label.type'),
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
      label: t('LABEL.form.label.labelMessageCode'),
      type: 'text',
      value: '',
      maxLength: 150,
    },
    {
      name: 'labelMessageName',
      label: t('LABEL.form.label.labelMessage'),
      type: 'textarea',
      format: 'string',
      value: '',
      maxLength: 150,
    },
    {
      name: 'labelMessageDesc',
      label: t('LABEL.form.label.description'),
      type: 'textarea',
      value: '',
      maxLength: 150,
    },
    {
      name: 'isUsed',
      label: t('LABEL.form.label.useYn'),
      type: 'switch',
      value: false,
      format: 'boolean',
    },
    {
      name: 'labelMessageId',
      format: 'number',
      type: 'hidden',
      value: '',
    },
    {
      name: 'isDuplicateMultilingulKey',
      type: 'hidden',
      format: 'boolean',
      value: false,
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

import {
  queryKeys,
  useCreateLabelMessage,
  useFetchLabelMessage,
  useUpdateLabelMessage,
} from '@entities/label-messages';
import { translationQueryOptions } from '@entities/translation';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import {
  Button,
  ContentsRow,
  FormSubTitle,
  Input,
  RadioGroupFormField,
  Textarea,
  useModal,
} from '@learnway/ui';
import {
  // DuplicateCheckInputFormField,
  FormRow,
  SwitchFormField,
} from '@shared/ui/form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface MessageDetailProps {
  /**
   * 라벨/메세지 NO
   */
  labelMessageId: number;

  /**
   * 저장 완료 callback function
   */
  onSuccessSave?: (response?: any) => void;
}

const MessageDetailComponent = ({ labelMessageId, onSuccessSave }: MessageDetailProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isCreateMode, setIsCreateMode] = React.useState(true);
  const { confirm: openConfirm, showSaveComplete, showUpdateComplete } = useModal();
  const [currentConfig, setCurrentConfig] = useState(() => createFormConfig('LABEL'));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const
  const {
    provider,
    onSubmit,
    onFormChange,
    getValues,
    updateFormData,
    clearFormError,
    control,
    setFormError,
  } = useDynamicForm(currentConfig);
  const typeWatch = useWatch({ control, name: 'labelMessageType' });

  useEffect(() => {
    if (typeWatch) {
      clearAllFormErrors();
      const newConfig = createFormConfig(typeWatch, getValues);
      setCurrentConfig(newConfig);

      // 타입이 변경되면 중복체크 상태를 초기화
      const currentValues = getValues();
      if (currentValues.labelMessageMultilingulKey?.fieldValue) {
        updateFormData({
          ...currentValues,
          labelMessageMultilingulKey: {
            ...currentValues.labelMessageMultilingulKey,
            checkState: DuplicateState.check,
          },
        });
      }
    }
  }, [typeWatch]);

  const { data } = useFetchLabelMessage(labelMessageId);
  const formDisabled = labelMessageId === 0;
  const clearAllFormErrors = () => {
    currentConfig.builders.forEach((item) => clearFormError(item.name));
  };
  // 라벨 메세지 등록
  const { mutate: create } = useCreateLabelMessage({
    onSuccess: async (response: any) => {
      await showSaveComplete();
      onSuccessSave?.(response);
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  // 라벨 메세지 수정
  const { mutate: update } = useUpdateLabelMessage({
    onSuccess: async (response: any) => {
      await showUpdateComplete();
      onSuccessSave?.(response);
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(response?.labelMessageId) });
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  /**
   * 라벨/메세지 ID가 변경될 때마다 호출됩니다.
   * 음수인 경우 생성 모드로 전환하며 폼을 초기화합니다.
   */
  useEffect(() => {
    clearAllFormErrors();
    // 생성 모드 (labelMessageId 음수인 경우, 부모창에서 추가 버튼 눌렀을때 음수로 설정)
    const isCreate = labelMessageId <= 0;
    setIsCreateMode(isCreate);
    if (isCreate) {
      const initData: { [key: string]: any } = {};
      currentConfig.builders.forEach((item) => {
        initData[item.name] = item.value;
      });
      onFormChange({});
      updateFormData({ ...initData });
    }
  }, [labelMessageId]);

  /**
   * 조회된 데이터를 폼에 반영합니다.
   */
  useEffect(() => {
    if (!isCreateMode && data) {
      const d = {
        ...data,
        labelMessageId: data.labelMessageId,
        labelMessageMultilingulKey: {
          fieldValue: data?.labelMessageMultilingulKey || '',
          checkState: DuplicateState.okStart,
        },
        lastDuplicateText: data?.labelMessageMultilingulKey || '',
        isDuplicateCheck: !isCreateMode,
      };
      updateFormData(d);
    }
  }, [data, labelMessageId, isCreateMode]);

  /**
   * 다국어 관리 페이지로 이동합니다.
   */
  const handleMultilingualManageClick = () => {
    router.navigate({
      to: '/platform/system/multilingual',
      state: {
        keyType: data?.labelMessageType || 'LABEL', // 다국어 분류, 서버에서 labelMessageType 값 안넘어와서 임시로 하드코딩
        multilingualKey: data?.labelMessageMultilingulKey, // 다국어 키
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
    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log('data {} => ', data);
    const payload = {
      ...data,
      labelMessageMultilingulKey:
        data.labelMessageMultilingulKey && data.labelMessageMultilingulKey.fieldValue,
      labelMessageId: isCreateMode ? '' : data?.labelMessageId,
    };

    if (isCreateMode) {
      const isAdd = await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
      });
      isAdd && create(payload);
      if (!isAdd) setIsSubmitting(false);
    } else {
      const isUpdate = await openConfirm({
        title: t('LABEL.confirm.modify.title'),
        content: t('LABEL.confirm.modify.message'),
      });
      isUpdate && update(payload);
      if (!isUpdate) setIsSubmitting(false);
    }
  };

  const duplicateCheck = async (code: string) => {
    const keyTypeCode = getValues('labelMessageType');
    const result = await queryClient.fetchQuery(
      translationQueryOptions.checkExists(keyTypeCode, code),
    );

    if (result) return DuplicateState.duplicated;
    return DuplicateState.ok;
    // const result = (await queryClient.fetchQuery(
    //   queryOptions.all({ labelMessageMultilingulKey: code }),
    // )) as any;
    // const content = result?.content;
    // const isValid =
    //   content?.filter((d: any) => d?.labelMessageId !== getValues()?.labelMessageId)?.length === 0;
    // if (!isValid) return DuplicateState.duplicated;
    // return DuplicateState.ok;
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle
        label={t('LABEL.form.label.labelMessage')}
        lineType={'light'}
        actionNode={
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="save"
              size="sm"
              type={'submit'}
              label={t('LABEL.button.save')}
              disabled={formDisabled || isSubmitting}
            />
          </div>
        }
      />
      <div className={layoutStyles.inner_contents}>
        {/*분류*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'labelMessageType'}
            element={<RadioGroupFormField disabled={formDisabled} />}
          />
        </ContentsRow>
        {/*메세지코드*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'labelMessageMultilingulKey'}
            element={
              <DuplicateCheckInputFormField
                id="labelMessageMultilingulKey"
                label={
                  typeWatch === 'LABEL'
                    ? t('LABEL.form.label.labelCode')
                    : t('LABEL.form.label.messageCode')
                }
                onDuplicationCheck={duplicateCheck}
                disabled={formDisabled}
                type={'alphanumeric'}
                placeholder={t('LABEL.common.placeholder2', { type: t('LABEL.cdId') })}
                hiddenPlaceholder={formDisabled}
                validation={{
                  onError: (msg: string) => setFormError('labelMessageMultilingulKey', msg),
                  onSuccess: () => clearFormError('labelMessageMultilingulKey'),
                }}
              />
            }
          />
        </ContentsRow>
        {/*메세지*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'labelMessageName'}
            element={
              typeWatch === 'LABEL' ? (
                <Input
                  disabled={formDisabled}
                  placeholder={t('LABEL.common.placeholder1', {
                    type: t('LABEL.form.label.labelName'),
                  })}
                  hiddenPlaceholder={formDisabled}
                />
              ) : (
                // <Textarea
                //   disabled={formDisabled}
                //   placeholder={t('LABEL.common.placeholder1', {
                //     type: t('LABEL.form.label.labelName'),
                //   })}
                //   hiddenPlaceholder={formDisabled}
                // />
                <Textarea
                  disabled={formDisabled}
                  placeholder={t('LABEL.common.placeholder1', {
                    type: t('LABEL.form.label.messageName'),
                  })}
                  hiddenPlaceholder={formDisabled}
                />
              )
            }
            infoNode={
              <Button
                variant="point"
                size="xs"
                label={t('LABEL.button.multilingualManage')}
                disabled={isCreateMode}
                onClick={handleMultilingualManageClick}
              />
            }
          ></FormRow>
          {/* 다국어 관리 : 수정 모드에서만 활성화 */}
        </ContentsRow>
        {/*설명*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'labelMessageDesc'}
            element={
              <Textarea
                disabled={formDisabled}
                placeholder={t('LABEL.common.placeholder1', {
                  type: t('LABEL.form.label.description'),
                })}
                hiddenPlaceholder={formDisabled}
              />
            }
          />
        </ContentsRow>
        {/*사용여부*/}
        <ContentsRow type={'horizontal'} className={'inactive'}>
          <FormRow
            provider={provider}
            name={'isUsed'}
            element={<SwitchFormField disabled={formDisabled} />}
          />
        </ContentsRow>
      </div>
    </form>
  );
};

export const MessageDetail = MessageDetailComponent;

/**
 * 필수값 : name, type
 */
const createFormConfig = (
  messageType = 'LABEL',
  getValues?: UseFormReturn['getValues'],
): DynamicFormConfig => {
  const codeLabel =
    getValues && getValues('labelMessageType') === 'MESSAGE'
      ? t('LABEL.form.label.messageCode')
      : t('LABEL.form.label.labelCode');
  return {
    builders: [
      {
        name: 'labelMessageType',
        label: t('LABEL.form.label.category'),
        type: 'radio-group',
        format: 'string',
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.labelmessage.LabelMessageType'],
        },
        value: 'LABEL',
      },
      {
        name: 'labelMessageMultilingulKey',
        label: codeLabel,
        type: 'custom',
        value: { fieldValue: '', checkState: DuplicateState.needInput },
        maxLength: 150,
      },
      {
        name: 'labelMessageName',
        label:
          messageType === 'LABEL'
            ? t('LABEL.form.label.labelName')
            : t('LABEL.form.label.messageName'),
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
        value: true,
        format: 'boolean',
      },
      {
        name: 'labelMessageId',
        format: 'number',
        type: 'hidden',
        value: '',
      },
      {
        name: 'lastDuplicateText',
        format: 'string',
        type: 'hidden',
        value: '',
      },
    ],
    validator: {
      labelMessageType: {
        required: true,
      },
      labelMessageMultilingulKey: {
        format: 'object',
        required: true,
        conditions: [
          {
            fn: (values) => {
              const fieldValue = values.labelMessageMultilingulKey.fieldValue;
              if (fieldValue === '') return true;
              return false;
            },
            message: (values) => {
              const currentType = values?.labelMessageType || messageType;
              const currentCodeLabel =
                currentType === 'LABEL'
                  ? t('LABEL.form.label.labelCode')
                  : t('LABEL.form.label.messageCode');
              return t('LABEL.form.validation.needInput', { code: currentCodeLabel });
            },
          },
          {
            fn: (values: Record<string, any>) => {
              return (
                values.labelMessageMultilingulKey.checkState === DuplicateState.check ||
                values.labelMessageMultilingulKey.checkState === DuplicateState.needInput
              );
            },
            message: (values) => {
              const currentType = values?.labelMessageType || messageType;
              const currentCodeLabel =
                currentType === 'LABEL'
                  ? t('LABEL.form.label.labelCode')
                  : t('LABEL.form.label.messageCode');
              return t('LABEL.form.validation.check', { code: currentCodeLabel });
            },
          },
          {
            fn: (values: Record<string, any>) =>
              values.labelMessageMultilingulKey.checkState === DuplicateState.duplicated,
            message: (values) => {
              const currentType = values?.labelMessageType || messageType;
              const currentCodeLabel =
                currentType === 'LABEL'
                  ? t('LABEL.form.label.labelCode')
                  : t('LABEL.form.label.messageCode');
              return t('LABEL.form.validation.duplicated', { code: currentCodeLabel });
            },
          },
        ],
      },
      labelMessageName: {
        required: true,
      },
    },
  };
};

import { useTranslation } from 'react-i18next';
import { Button, ContentsRow, Input, RadioGroupFormField, Textarea, useModal } from '@learnway/ui';
import React, { useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import {
  DuplicateCheckInputFormField,
  FormRow,
  FormSubTitle,
  SwitchFormField,
} from '@shared/ui/form';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import {
  queryOptions,
  useCreateLabelMessage,
  useFetchLabelMessage,
  useUpdateLabelMessage,
} from '@entities/label-messages';
import { useWatch } from 'react-hook-form';

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
  const [resetKey, setResetKey] = useState(0);
  // const
  const { provider, onSubmit, onFormChange, getValues, fetchData, clearFormError, control } =
    useDynamicForm(currentConfig);
  const typeWatch = useWatch({ control, name: 'labelMessageType' });

  useEffect(() => {
    if (typeWatch) {
      const newConfig = createFormConfig(typeWatch);
      setCurrentConfig(newConfig);
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
      console.log('useCreateLabelMessage :: onSuccess', response);
      setResetKey((prev) => prev + 1);
      onSuccessSave?.(response);
    },
  });

  // 라벨 메세지 수정
  const { mutate: update } = useUpdateLabelMessage({
    onSuccess: async (response: any) => {
      await showUpdateComplete();
      console.log('useUpdateLabelMessage :: onSuccess', response);
      setResetKey((prev) => prev + 1);
      onSuccessSave?.(response);
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
      fetchData({ ...initData });
    }
  }, [labelMessageId]);

  /**
   * 조회된 데이터를 폼에 반영합니다.
   */
  useEffect(() => {
    if (!isCreateMode && data) {
      const d = {
        ...data,
        labelMessageId,
        lastDuplicateText: data?.labelMessageMultilingulKey || '',
        isDuplicateCheck: !isCreateMode,
      };
      fetchData(d);
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
    console.log('data {} => ', data);
    const payload = {
      ...data,
      labelMessageId: isCreateMode ? '' : data?.labelMessageId,
    };

    if (isCreateMode) {
      const isAdd = await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
      });
      isAdd && create(payload);
    } else {
      const isUpdate = await openConfirm({
        title: t('LABEL.confirm.modify.title'),
        content: t('LABEL.confirm.modify.message'),
      });
      isUpdate && update(payload);
    }
  };

  /**
   * 입력된 값에 대한 중복 여부를 비동기적으로 확인합니다.
   * 특정 키(`labelMessageMultilingulKey`)를 사용하여 서버에 중복 검사를 요청하고,
   * 검사 결과를 기반으로 유효성 여부를 반환합니다.
   *
   * @async
   * @function checkDuplicate
   * @returns {Promise<boolean>} 중복이 없으면 `true`, 중복이 있거나 검사 오류 시 `false`를 반환하는 Promise입니다.
   */
  const checkDuplicate = async () => {
    const params = {
      labelMessageMultilingulKey: getValues()?.labelMessageMultilingulKey,
    };
    const result = (await queryClient.fetchQuery(queryOptions.all(params))) as any;
    const content = result?.content;
    const isValid =
      content?.filter((d: any) => d?.labelMessageId !== getValues()?.labelMessageId)?.length === 0;
    return isValid;
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
              disabled={formDisabled}
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
                idKey={resetKey}
                inputType={'alphanumeric'}
                query={queryOptions.all}
                clearFormError={clearFormError}
                duplicationCheckFn={checkDuplicate}
                disabled={formDisabled}
                onSuccess={(isValid: boolean, checkValue: string) => {
                  onFormChange({ isDuplicateCheck: isValid, lastDuplicateText: checkValue });
                }}
                placeholder={t('LABEL.common.placeholder2', { type: t('LABEL.cdId') })}
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
                // <Input
                //   disabled={formDisabled}
                //   placeholder={t('LABEL.common.placeholder1', {
                //     type: t('LABEL.form.label.labelName'),
                //   })}
                // />
                <Textarea
                  disabled={formDisabled}
                  placeholder={t('LABEL.common.placeholder1', {
                    type: t('LABEL.form.label.labelName'),
                  })}
                />
              ) : (
                <Textarea
                  disabled={formDisabled}
                  placeholder={t('LABEL.common.placeholder1', {
                    type: t('LABEL.form.label.messageName'),
                  })}
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
const createFormConfig = (messageType = 'LABEL'): DynamicFormConfig => ({
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
      label:
        messageType === 'LABEL'
          ? t('LABEL.form.label.labelCode')
          : t('LABEL.form.label.messageCode'),
      type: 'custom',
      value: '',
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
      name: 'isDuplicateCheck',
      format: 'boolean',
      type: 'hidden',
      value: false,
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
      required: true,
    },
    labelMessageName: {
      required: true,
    },
    isDuplicateCheck: {
      required: false,
      conditions: [
        // 중복체크 하지 않았을때 or 중복체크 후 값 변경 후 중복체크 하지 않았을때
        {
          fn: (values) => {
            return (
              !values?.isDuplicateCheck ||
              values?.labelMessageMultilingulKey !== values?.lastDuplicateText
            );
          },
          message: t('LABEL.form.validation.check', {
            code: t('LABEL.form.label.labelMessageCode'),
          }),
          path: 'labelMessageMultilingulKey',
        },
      ],
    },
  },
});

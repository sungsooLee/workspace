import { useTranslation } from 'react-i18next';
import {
  Button,
  ContentsRow,
  DynamicFormField,
  RadioGroupFormField,
  TextareaFormField,
  useModal,
} from '@learnway/ui';
import React, { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import {
  DuplicateCheckInputFormField,
  FormRow,
  FormSubTitle,
  SwitchFormField,
} from '@shared/ui/form';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { FormInfoArea } from '@shared/ui/form/components/form-info-area';
import {
  queryOptions,
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
  const { t } = useTranslation();
  const [isCreateMode, setIsCreateMode] = React.useState(true);
  const { confirm: openConfirm } = useModal();
  const { provider, onSubmit, onFormChange, getValues, fetchData, clearFormError } =
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
    // console.log('labelMessageId', labelMessageId);
    // 생성 모드 (labelMessageId 음수인 경우, 부모창에서 추가 버튼 눌렀을때 음수로 설정)
    const isCreate = labelMessageId < 0;
    // set state
    setIsCreateMode(isCreate);
    // 생성 모드는 폼 내용 초기화
    if (isCreate) {
      onFormChange({});
      fetchData({});
    }
  }, [labelMessageId]);

  /**
   * 조회된 데이터를 폼에 반영합니다.
   */
  useEffect(() => {
    const d = {
      ...data,
      // 중복체크를 위해 설정
      labelMessageId, // TODO: formConfig 에 hidden 설정했지만 featchData 에 값 넣지 않으면 validation 에러나서 임시로 넣음, form 문의 필요
      lastDuplicateText: data?.labelMessageMultilingulKey || '',
      isDuplicateCheck: !isCreateMode,
    };
    fetchData(d);
  }, [data, labelMessageId, isCreateMode]);

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
    const key = 'labelMessageMultilingulKey';
    const value = getValues()?.[key];
    const params = {
      [key]: value,
    };
    // const result = (await queryClient.fetchQuery(query(params))) as any;
    const result = value?.length === 1 ? { content: [] } : { content: [1] };
    const content = result?.content;
    const isValid = content?.filter((d: any) => d[key] !== value)?.length === 0;
    console.log({ params, result, isValid });
    return isValid;
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle
        label={t('LABEL.form.label.detailInfo')}
        lineType={'light'}
        actionNode={
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="gray"
              size="sm"
              label={'XX'}
              onClick={() => console.log(getValues())}
            />
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
                query={queryOptions.all}
                clearFormError={clearFormError}
                duplicationCheckFn={checkDuplicate}
                disabled={formDisabled}
                onSuccess={(isValid: boolean, checkValue: string) => {
                  onFormChange({ isDuplicateCheck: isValid, lastDuplicateText: checkValue });
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
            element={<TextareaFormField disabled={formDisabled} />}
          >
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
          </FormRow>
        </ContentsRow>
        {/*설명*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'labelMessageDesc'}
            element={<TextareaFormField disabled={formDisabled} />}
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
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'labelMessageType',
      label: t('LABEL.form.label.category'),
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
      type: 'custom',
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
};

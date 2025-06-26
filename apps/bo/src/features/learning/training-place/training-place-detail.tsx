import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { t } from 'i18next';
import { useRouter } from '@tanstack/react-router';
import { useModal, ContentsRow, TextareaFormField, Input, RadioGroupFormField } from '@learnway/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import { FormRow, FormSubTitle } from '@shared/ui';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP } from '@learnway/hooks';
import { AddressSearchModal } from '@features/shared/ui/modal/address-search-modal';
import { DropdownFormField, InputFormField } from '@features/form';
import { useFetchSpace, useCreateSpace } from '@entities/training-place';
import { EnFormMode, EnPageMode } from '@types';
import SpaceService from '@entities/training-place/api/space';

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(?<![-.+():%])/;

const TrainingPlaceDetailComponent = (props: any, ref: any) => {
  const router = useRouter();
  const { open: openModal, alert: openAlert, confirm: openConfirm, close: closeModal } = useModal();
  const { provider, fetchData, onSubmit, onFormChange, getValues, control } =
    useDynamicForm(formConfig);

  const { data: detailData, refetch } = useFetchSpace(props.uuid);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (props.mode === EnFormMode.VIEW && detailData) {
      const initialData = {
        ...detailData,
        tenantId: detailData.tenants[0].tenantId,
        learningSpaceCode: {
          fieldValue: detailData.learningSpaceCode,
          checkState: DuplicateState.okStart,
        },
      };
      console.log('### initialData', initialData);
      fetchData(initialData);
    }
  }, [detailData]);

  useImperativeHandle(ref, () => ({
    saveData() {
      console.log('saveData');
      const form = formRef.current;
      if (form) {
        console.log('formValue');
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const { create } = useCreateSpace({
    onSuccess: () => {
      openAlert({
        title: t('저장되었습니다.'),
        onClose: () => {
          router.navigate({ to: '/learning/training-place' });
        },
      });
    },
  });

  const duplicateCheck = async (learningSpaceCode: string) => {
    const result: boolean = await SpaceService.existsCode(learningSpaceCode);

    if (result) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  const handleAddressSearchResult = (address: any) => {
    console.log('address', address);
    fetchData({ ...getValues(), address: address.roadAddr, postalCode: address.zipNo });
  };

  const handleSearchAddress = async () => {
    openModal({
      width: 'sm',
      content: <AddressSearchModal onSelect={handleAddressSearchResult} />,
    });
  };

  const formDisabled = props.mode === EnFormMode.VIEW && props.pageMode === EnPageMode.MODAL;

  const isUsedFormField = (
    <FormRow
      provider={provider}
      name={'isUsed'}
      element={<RadioGroupFormField disabled={formDisabled} />}
    />
  );

  const handleOnSubmit = async (data: any) => {
    if (props.mode === EnFormMode.VIEW && props.pageMode === EnPageMode.MODAL) {
      closeModal();
      return;
    }
    console.log('#### handleOnSubmit', data);
    const payload = {
      ...data,
      tenantIds: [data.tenantId],
      learningSpaceCode: data.learningSpaceCode.fieldValue,
    };
    if (props.mode === EnFormMode.ADD) {
      if (await openConfirm('저장 하시겠습니까?')) {
        create(payload);
      }
    } else if (props.mode === EnFormMode.VIEW) {
      if (await openConfirm('수정 하시겠습니까?')) {
        // TODO. API 준비중
        //update(payload);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={'기본정보'} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tenantId'}
          element={<DropdownFormField disabled={formDisabled} />}
        />
        <FormRow
          provider={provider}
          name={'onOffLineType'}
          element={<RadioGroupFormField disabled={formDisabled} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'learningSpaceName'}
          element={<Input disabled={formDisabled} />}
        />
        <FormRow
          provider={provider}
          name={'learningSpaceCode'}
          element={
            <DuplicateCheckInputFormField
              onDuplicationCheck={duplicateCheck}
              disabled={formDisabled}
            />
          }
        />
      </ContentsRow>
      {/* Online */}
      <FormDisplay provider={provider} dependencies={[{ name: 'onOffLineType', value: 'ONLINE' }]}>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'linkUrl'}
            element={<Input disabled={formDisabled} />}
          />
          {isUsedFormField}
        </ContentsRow>
      </FormDisplay>
      {/* Offline */}
      <FormDisplay provider={provider} dependencies={[{ name: 'onOffLineType', value: 'OFFLINE' }]}>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'address'}
            element={
              <Input
                showSearchIcon
                onEnterKeyDown={handleSearchAddress}
                readOnly
                disabled={formDisabled}
              />
            }
          />
          <FormRow
            provider={provider}
            name={'addressDetail'}
            element={<Input disabled={formDisabled} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'mapFileGroupUuid'}
            element={<Input disabled={formDisabled} />}
          />
          {isUsedFormField}
        </ContentsRow>
      </FormDisplay>

      <FormSubTitle label={'기타정보'} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'notes'}
          element={<TextareaFormField resize={'none'} size="sm" disabled={formDisabled} />}
        />
      </ContentsRow>
    </form>
  );
};

export const TrainingPlaceDetail = forwardRef(TrainingPlaceDetailComponent);

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantId',
      type: 'dropdown',
      format: 'number',
      label: t('테넌트'),
      value: '',
      presetOptionLabel: t('선택'),
      optionsConfig: {
        codeGroup: CODE_GROUP['manual.tenant.tenantId'],
      },
    },
    {
      name: 'onOffLineType',
      type: 'radio-group',
      label: t('교육공간 타입'),
      value: 'ONLINE',
      optionsConfig: {
        codeGroup: CODE_GROUP['lms.space.OnOffLineType'],
      },
    },
    {
      name: 'learningSpaceCode',
      type: 'custom',
      label: t('교육공간 코드'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      placeholder: '',
      maxlength: 20,
    },
    {
      name: 'learningSpaceName',
      type: 'text',
      label: t('교육공간명'),
      value: '',
      placeholder: '',
      maxLength: 40,
    },
    {
      name: 'postalCode',
      type: 'hidden',
      value: '',
    },
    {
      name: 'isUsed',
      type: 'radio-group',
      label: t('사용 여부'),
      value: true,
      format: 'boolean',
      options: [
        { value: true, label: t('사용') },
        { value: false, label: t('미사용') },
      ],
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: t('링크주소'),
      value: '',
      placeholder: t('http://를 포함한 전체 URL을 입력하세요.'),
    },
    {
      name: 'address',
      type: 'text',
      label: t('주소'),
      value: '',
      placeholder: '',
    },
    {
      name: 'addressDetail',
      type: 'text',
      label: t('상세 주소'),
      value: '',
      placeholder: '',
      maxLength: 50,
    },
    {
      name: 'mapFileGroupUuid',
      type: 'text',
      label: t('약도 파일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: t('메모'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
  ],
  validator: {
    tenantId: true,
    onOffLineType: true,
    learningSpaceName: true,
    learningSpaceCode: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.learningSpaceCode.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('교육공간 코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.learningSpaceCode.checkState === DuplicateState.check ||
            values.learningSpaceCode.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('교육공간 코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.learningSpaceCode.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('교육공간 코드') }),
        },
      ],
    },
    isUsed: true,
    linkUrl: {
      required: (values) => values.onOffLineType === 'ONLINE',
      conditions: [
        {
          fn: (values) => {
            if (values.linkUrl.trim().length === 0) return false;
            const pattern = new RegExp(URL_REGEX, 'i');
            return !pattern.test(values.linkUrl.trim());
          },
          message: t('URL 형식에 맞게 입력해 주세요.'),
        },
      ],
    },
  },
};

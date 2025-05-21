import { DynamicFormConfig, useDynamicForm } from '@/libs/hooks/src';
import { FormDisplay } from '@features/form/ui/form-display';
import { DateRangePickerFormField } from '@features/learning/ui/resource/date-range-picker-form-field';
import {
  Button,
  ContentsRow,
  FormDateRangePicker,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  RadioGroupFormField,
  useModal,
} from '@learnway/ui';
import { FormRow, FormSubTitle } from '@shared/ui';
import { t } from 'i18next';
import { FC, useEffect } from 'react';

type MyRoleModal = 'request' | 'view' | 'approve' | 'reject';
const MyRoleExtendModalComponent: FC<any> = ({ type }: { type: MyRoleModal }) => {
  const { open: openModal, confirm: openConfirm, close: closeModal } = useModal();
  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control } =
    useDynamicForm(formConfig);

  const handleOnSubmit = (node: any) => {
    console.log('onsubmit', node);
    closeModal(node);
  };

  useEffect(() => {
    onFormChange({ requestRolePeriodEnable: true });
  }, []);

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <ModalContainer>
        <ModalTitle>{t('관리자 권한 연장 신청')}</ModalTitle>
        <ModalBody>
          <FormSubTitle label={t('HRD 담당자 역할 정보')} />
          <ContentsRow>
            <FormRow provider={provider} name={'user'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'role'} />
            <FormRow provider={provider} name={'currentRolePeriod'} />
          </ContentsRow>
          <FormSubTitle label={t('관리자 권한 신청 정보')} />
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'requestRolePeriodEnable', value: true }]}
          >
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'requestRolePeriod'}
                element={<DateRangePickerFormField />}
              />
            </ContentsRow>
          </FormDisplay>
          <ContentsRow>
            <FormRow provider={provider} name={'reason'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'approveStatus'} />
            <FormRow provider={provider} name={'requestDate'} />
          </ContentsRow>
          <FormSubTitle label={t('관리자 권한 승인 정보')} />
          <ContentsRow>
            <FormRow provider={provider} name={'approveDate'} />
            <FormRow provider={provider} name={'approveUser'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'rejectReason'} />
          </ContentsRow>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button type="submit" label={t('확인')} variant={'primary'} size={'lg'} />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const MyRoleExtendModal = MyRoleExtendModalComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'user',
      type: 'text',
      label: t('신청자'),
      value: '',
      disabled: true,
    },
    {
      name: 'role',
      type: 'text',
      label: t('HRD 담당자 역할'),
      value: '',
      disabled: true,
    },
    {
      name: 'currentRolePeriod',
      type: 'text',
      label: t('권한 기간'),
      value: '',
      disabled: true,
    },
    {
      name: 'requestRolePeriod',
      type: 'custom',
      label: t('권한 신청 시작/종료일'),
      value: '',
    },
    {
      name: 'requestRolePeriodEnable',
      type: 'custom',
      value: false,
      guideText: '사용기한 가이드 텍스트',
    },
    {
      name: 'reason',
      type: 'textarea',
      label: t('신청 사유'),
      value: '',
      maxLength: 150,
    },
    {
      name: 'approveStatus',
      type: 'text',
      label: t('신청 상태'),
      value: '',
    },
    {
      name: 'requestDate',
      type: 'text',
      label: t('신청일'),
      value: '',
    },
    {
      name: 'approveDate',
      type: 'text',
      label: t('승인/반려일'),
      value: '',
    },
    {
      name: 'approveUser',
      type: 'text',
      label: t('승인/반려자'),
      value: '',
    },
    {
      name: 'rejectReason',
      type: 'textarea',
      label: t('반려 사유'),
      value: '',
      maxLength: 150,
    },
  ],
  validator: {
    approveRolePeriod: {
      required: true,
    },
    reson: {
      required: true,
    },
  },
};

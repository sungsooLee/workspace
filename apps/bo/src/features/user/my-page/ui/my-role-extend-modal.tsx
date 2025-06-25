import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormDisplay } from '@features/form/ui/form-display';
import { DateRangePickerFormField } from '@features/learning/ui/resource/date-range-picker-form-field';
import {
  Button,
  ContentsRow,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  RangeDatePicker,
  Textarea,
  useModal,
} from '@learnway/ui';
import { FormRow, FormSubTitle } from '@shared/ui';
import { t } from 'i18next';
import { FC, useEffect } from 'react';
import { formUtils } from '@entities/form-utils';
import { useGetRoleApplication, useRoleApplication } from '@entities/role/service/role-manage.hook';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';

import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dayjs from 'dayjs';

type MyRoleModal = 'request' | 'view';

const MyRoleExtendModalComponent: FC<{
  type: MyRoleModal;
  data: any;
  callback?: () => void;
}> = ({ type, data, callback }: { type: MyRoleModal; data: any; callback?: () => void }) => {
  console.log('### modal data ', data);
  const { close: closeModal } = useModal();
  const { provider, fetchData, onSubmit, onFormChange } = useDynamicForm(formConfig);

  const { data: viewData } = useGetRoleApplication(data?.roleApplicationId ?? undefined);
  const { createRoleApplication } = useRoleApplication({});

  useEffect(() => {
    if (!viewData) return;

    onFormChange({
      requestRolePeriod: { from: new Date(viewData.startDate), to: new Date(viewData.endDate) },
      roleId: viewData.roleId,
      userUuid: viewData.userUuid,
      userName: viewData.userName,
      roleName: viewData.roleName,
      currentRolePeriod: `${viewData.startDate} ~ ${viewData.endDate}`,
      status: viewData.status,
      createdDate: formatDate(viewData.createdDate, DATE_TIME_FORMAT.DATETIME_MIN),
      reason: viewData.reason,
    });
  }, [viewData]);

  const isApprovedInfo = false;
  const handleOnSubmit = (node: any) => {
    console.log('### node', node);

    if (type === 'view') {
      closeModal(node);
      return;
    }

    createRoleApplication(
      {
        userUuid: node.userUuid,
        roleId: node.roleId,
        startDate: formatDate(node.requestRolePeriod?.from, DATE_TIME_FORMAT.DATE_SERVER),
        endDate: formatDate(node.requestRolePeriod?.to, DATE_TIME_FORMAT.DATE_SERVER),
        reason: node.reason,
        status: 'EXTEND', // 연장 이넘코드
      },
      {
        onSuccess: () => {
          callback?.();
          closeModal(node);
        },
      },
    );
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
            <FormRow provider={provider} name={'userName'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'roleName'} />
            <FormRow provider={provider} name={'currentRolePeriod'} />
          </ContentsRow>
          <FormSubTitle className="mt-3" label={t('관리자 권한 신청 정보')} />
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'requestRolePeriodEnable', value: true }]}
          >
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'requestRolePeriod'}
                element={
                  <DateRangePickerFormField
                    disabled={type === 'view'}
                    minDate={dayjs().toDate()}
                    maxDate={dayjs().add(2, 'year').toDate()}
                  />
                }
              />
            </ContentsRow>
          </FormDisplay>
          {/* <FormDisplay
            provider={provider}
            dependencies={[{ name: 'requestRolePeriodEnable', value: true }]}
          >
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'requestRolePeriod2'}
                element={<RangeDatePicker size="lg" className={styles.datepicker_item} />}
              />
            </ContentsRow>
          </FormDisplay> */}
          <ContentsRow className="mb-4">
            <FormRow
              provider={provider}
              name={'reason'}
              element={<Textarea disabled={type === 'view'} />}
            />
          </ContentsRow>
          {type === 'view' && (
            <ContentsRow>
              <FormRow provider={provider} name={'status'} element={<Input disabled />} />
              <FormRow provider={provider} name={'createdDate'} element={<Input disabled />} />
            </ContentsRow>
          )}

          {/* 승인 반려 정보 있을때 */}
          {isApprovedInfo && (
            <>
              <FormSubTitle label={t('관리자 권한 승인 정보')} />
              <ContentsRow>
                <FormRow provider={provider} name={'approveDate'} />
                <FormRow provider={provider} name={'approveUser'} />
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider} name={'rejectReason'} />
              </ContentsRow>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {/* <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} /> */}
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
      name: 'userUuid',
      type: 'text',
      label: t('신청자'),
      value: '',
      disabled: true,
    },
    {
      name: 'userName',
      type: 'text',
      label: t('신청자'),
      value: '',
      disabled: true,
    },
    {
      name: 'roleId',
      type: 'number',
      label: t('HRD 담당자 역할 아이디'),
      value: 0,
      disabled: true,
    },
    {
      name: 'roleName',
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
      // value: '',
      value: {
        from: formUtils.nowDate(),
        to: formUtils.nowDate({ unit: 'day', offset: 30 }),
      },
    },
    // {
    //   name: 'requestRolePeriod2',
    //   type: 'custom',
    //   label: t('권한 신청 시작/종료일'),
    //   value: [formUtils.nowDate(), formUtils.nowDate({ unit: 'day', offset: 30 })],
    // },
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
      name: 'status',
      type: 'text',
      label: t('신청 상태'),
      value: '',
    },
    {
      name: 'createdDate',
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
    requestRolePeriod: {
      required: true,
    },
    reason: {
      required: true,
    },
  },
};

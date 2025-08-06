import dayjs from 'dayjs';
import { t, TFunction } from 'i18next';
import { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useCreateMyRoleApplication,
  useGetMyRoleApplication,
} from '@entities/role/service/role-manage.hook';
import { useDynamicForm } from '@learnway/hooks';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { Textarea } from '@learnway/ui/textarea';

import { DateRangePickerFormField, FormDisplay, FormRow } from '@shared/ui/form';

// request - 연장신청, view 보기, approvel - 승인/반려
type MyRoleModal = 'request' | 'view' | 'approvel';

const MyRoleExtendModalComponent: FC<{
  type: MyRoleModal;
  data: any;
  callback?: () => void;
}> = ({ type, data, callback }: { type: MyRoleModal; data: any; callback?: () => void }) => {
  const { closeModal, alert: openAlert, showSaveComplete, closeAllModal } = useModal();

  const { t: useTranslationT } = useTranslation();
  const formConfig = FormConfig(useTranslationT);

  const { provider, updateFormData, onSubmit, onFormChange } = useDynamicForm(formConfig);

  const { data: viewData } = useGetMyRoleApplication(data?.roleApplicationId ?? undefined);
  const { createMyRoleApplication } = useCreateMyRoleApplication({});

  const isApprovelInfoUse = useMemo(() => {
    if (!viewData) return false;
    if (viewData.approvedDate && viewData.approver) {
      return true;
    } else {
      return false;
    }
  }, [viewData]);

  useEffect(() => {
    if (!viewData) return;

    if (type === 'request') {
      onFormChange({
        userUuid: viewData.applicant.uuid,
        roleId: viewData.role.roleId,
        userName: `${viewData.applicant.company.name} > ${viewData.applicant.dept.deptName} ${viewData.applicant.name}`,
        roleName: viewData.role.name,
        currentRolePeriod: `${viewData.startDate} ~ ${viewData.endDate}`,
      });
      return;
    }

    onFormChange({
      requestRolePeriod: { from: new Date(viewData.startDate), to: new Date(viewData.endDate) }, // 권한 시작일 / 권한 종료일 (요청)
      roleId: viewData.role.roleId,
      userUuid: viewData.applicant.uuid,
      userName: `${viewData.applicant.company.name} > ${viewData.applicant.dept.deptName} ${viewData.applicant.name}(${viewData.applicant.employeeNumber})`,
      roleName: viewData.role.name,
      currentRolePeriod: `${viewData.startDate} ~ ${viewData.endDate}`,
      status: viewData.status, // 승인 상태
      createdDate: formatDate(viewData.createdDate, DATE_TIME_FORMAT.DATETIME_MIN),
      reason: viewData.reason, // 신청 사유
      rejectReason: viewData.rejectReason ?? '', // 반려 사유
      approveDate: formatDate(viewData.approvedDate, DATE_TIME_FORMAT.DATETIME_MIN), // 승인/반려일
      approveUser: viewData.approver
        ? `${viewData.approver?.company.name} > ${viewData.approver?.dept.deptName} ${viewData.approver?.name}(${viewData.approver?.employeeNumber})`
        : '', // 승인/반려자
    });
  }, [viewData, type]);

  type CustomError = {
    code: string;
    message: string;
  };

  function isCustomError(error: unknown): error is CustomError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'message' in error &&
      typeof (error as any).code === 'string' &&
      typeof (error as any).message === 'string'
    );
  }

  const handleOnSubmit = (node: any) => {
    console.log('### node', node);

    if (type !== 'request') {
      closeModal(node);
      return;
    }

    createMyRoleApplication(
      {
        applicantUuid: node.userUuid,
        roleId: node.roleId,
        startDate: formatDate(node.requestRolePeriod?.from, DATE_TIME_FORMAT.DATE_SERVER),
        endDate: formatDate(node.requestRolePeriod?.to, DATE_TIME_FORMAT.DATE_SERVER),
        reason: node.reason,
        status: 'EXTEND', // 연장 이넘코드
      },
      {
        onSuccess: () => {
          callback?.();
          showSaveComplete({
            onClose: () => {
              closeAllModal();
            },
          });
        },
        onError: (error: unknown) => {
          console.log('### error', error);
          if (isCustomError(error) && error.code === 'B306') {
            openAlert({
              content: error.message,
            });
          }
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
          <FormSubTitle label={t('관리자 권한 신청 정보')} />
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
                    readOnly={type === 'view'}
                    // disabled={type === 'view'}
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
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'reason'}
              element={<Textarea readOnly={type === 'view'} />}
            />
          </ContentsRow>
          {type === 'view' && (
            <ContentsRow>
              <FormRow provider={provider} name={'status'} element={<Input readOnly />} />
              <FormRow provider={provider} name={'createdDate'} element={<Input readOnly />} />
            </ContentsRow>
          )}

          {/* 승인 반려 정보 있을때 */}
          {type !== 'request' && isApprovelInfoUse && (
            <>
              <FormSubTitle label={t('관리자 권한 승인 정보')} />
              <ContentsRow>
                <FormRow provider={provider} name={'approveDate'} element={<Input readOnly />} />
                <FormRow provider={provider} name={'approveUser'} element={<Input readOnly />} />
              </ContentsRow>
              {viewData?.rejectReason !== '' && (
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name={'rejectReason'}
                    element={<Textarea readOnly />}
                  />
                </ContentsRow>
              )}
            </>
          )}
        </ModalBody>
        {type === 'request' && (
          <ModalFooter>
            <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
            <Button type="submit" label={t('확인')} variant={'primary'} size={'lg'} />
          </ModalFooter>
        )}
      </ModalContainer>
    </form>
  );
};

export const MyRoleExtendModal = MyRoleExtendModalComponent;

const FormConfig = (t: TFunction<'translation', undefined>) => {
  return {
    builders: [
      {
        name: 'userUuid',
        type: 'text',
        label: t('신청자'),
        value: '',
        readOnly: true,
      },
      {
        name: 'userName',
        type: 'text',
        label: t('신청자'),
        value: '',
        readOnly: true,
      },
      {
        name: 'roleId',
        type: 'number',
        label: t('HRD 담당자 역할 아이디'),
        value: 0,
        readOnly: true,
      },
      {
        name: 'roleName',
        type: 'text',
        label: t('HRD 담당자 역할'),
        value: '',
        readOnly: true,
      },
      {
        name: 'currentRolePeriod',
        type: 'text',
        label: t('권한 기간'),
        value: '',
        readOnly: true,
      },
      {
        name: 'requestRolePeriod',
        type: 'custom',
        label: t('권한 신청 시작/종료일'),
        // value: '',
        value: {
          // from: formUtils.nowDate(),
          // to: formUtils.nowDate({ unit: 'day', offset: 30 }),
          from: undefined,
          to: undefined,
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
};

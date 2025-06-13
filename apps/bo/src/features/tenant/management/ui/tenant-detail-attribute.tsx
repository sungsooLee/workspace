import { FC, useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

import { Button, ContentsRow, Input, DynamicFormField, useModal } from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import { FormRow, ContentsHistoryInfoFormField, FormSubTitle } from '@shared/ui';

import { TenantDetailAttributeCompany } from './tenant-detail-attribute-company';

/** Hook 정의 */
import {
  useTenantAttributeCompany,
  useUpdateTenantAttributeCompany,
} from '@entities/tenant/service/tenant-attribute.hook';

/**
 * 화면번호: NLP_BO_TMS_1003_00_04 (과정등록 연관 설정 figma: NLP_BO_TMS_1003_00-04)
 * @param props
 * @param ref
 * @returns
 */
const TenantDetailAttributeComponent = (props: any, ref: any) => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');
  const [companyTabItem, setCompaynTabItem] = useState<any>([]);
  const [attributeRawData, setAttributeRawData] = useState<any>();

  const routerState = useRouterState();
  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const { data: attributeData, refetch } = useTenantAttributeCompany(tenantId);

  const formRef = useRef<HTMLFormElement>(null);

  const { open: openModal, confirm: openConfirm } = useModal();
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, control } =
    useDynamicForm(formConfig);

  const { update } = useUpdateTenantAttributeCompany(tenantId, {
    onSuccess: (data: any) => {
      refetch();
    },
  });

  useImperativeHandle(ref, () => ({
    saveData() {
      const form: any = formRef.current;
      if (form) {
        console.log('formValue');
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const handleOnSubmit = async (payload: any) => {
    console.log('payload {} => ', payload);
    if (await openConfirm('저장 하시겠습니까?')) {
      update(payload);
    }
  };

  useEffect(() => {
    fetchData({ ...attributeData, tenantName: tenantName });
  }, [attributeData]);

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('테넌트 기본 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name="tenantName" element={<Input disabled={true} />} />
      </ContentsRow>
      <FormSubTitle label={t('교육 및 과정 연관 설정 정보')} lineType={'dark'} />

      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isUseApprovalLine'} />
        <FormRow provider={provider} name={'isLimitLearningTime'} />
        <FormRow provider={provider} name={'isLimitDailyProgress'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isResetProgress'} />
        <FormRow provider={provider} name={'isUseTextbook'} />
        <FormRow provider={provider} name={'isUseTrainingCostPerPerson'} />
        {/* <FormRow provider={provider} name={'isUseTextbookShippingAddress'} /> */}
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isUseEmploymentInsuranceRefund'} />
        <FormRow provider={provider} name={'isProvideCertificate'} />
        <FormRow provider={provider} name={'isUseLearningPoint'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isUsePreLevelTest'} />
        <FormRow provider={provider} name={'isUseCourseFlag'} />
        <div className={cn(formStyles.form_item)}></div>
      </ContentsRow>
      <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
        <ContentsHistoryInfoFormField />
      </ContentsRow>
    </form>
  );
};

export const TenantDetailAttribute = forwardRef(TenantDetailAttributeComponent);

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트명'),
      value: '',
    },
    {
      name: 'isUseApprovalLine',
      type: 'switch',
      label: t('수강 신청 결재라인 사용'),
      value: false,
      guideText: '수강 신청할 때 승인하는 결제 라인을 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isLimitLearningTime',
      type: 'switch',
      label: t('학습시간 제한'),
      value: false,
      guideText: t('정해진 시간에만 학습을 할 수 있도록 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isLimitDailyProgress',
      type: 'switch',
      label: t('1일 진도 제한'),
      value: false,
      guideText: t('하루에 학습할 수 있는 진도 제한을 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isResetProgress',
      type: 'switch',
      label: t('진도 초기화'),
      value: false,
      guideText: t('수강했던 학습 자원의 재학습 여부를 설정합니다. '),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isUseTextbook',
      type: 'switch',
      label: t('교재 사용'),
      value: false,
      guideText: t('과정 등록 시 교재와 교재 정보 사용 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    // {
    //   name: 'isUseTextbookShippingAddress',
    //   type: 'switch',
    //   label: t('교재 배송지 사용'),
    //   value: false,
    //   guideText: t('교재를 사용하는 경우 교재 배송지 필요 여부를 설정합니다.'),
    //   switchConfig: {
    //     label: (value: boolean) => (value ? t('사용') : t('미사용')),
    //   },
    // },
    {
      name: 'isUseTrainingCostPerPerson',
      type: 'switch',
      label: t('1인당 교육비 사용'),
      value: false,
      guideText: t('교육비 사용 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isUseEmploymentInsuranceRefund',
      type: 'switch',
      label: t('고용보험 환급 사용'),
      value: false,
      guideText: t('과정 등록 시 고융보험 환급 사용 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isProvideCertificate',
      type: 'switch',
      label: t('수료증 제공 여부'),
      value: false,
      guideText: t('과정 이수 시 수료증 제공 여부를 설정합니다. '),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isUseLearningPoint',
      type: 'switch',
      label: t('학습 포인트(마일리지) 사용'),
      value: false,
      guideText: t('학습 포인트 사용 여부를 설정합니다. '),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isUsePreLevelTest',
      type: 'switch',
      label: t('사전 레벨 테스트 사용 '),
      value: false,
      guideText: t('학습자가 해당 과청 수강 신청 시 사전 레벨 테스트 필요 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isUseCourseFlag',
      type: 'switch',
      label: t('과정 플래그 사용'),
      value: false,
      guideText: t(
        ' 수강신청 마스터, 과정 추출, 교육 통계에 사용하는 과정 분류 값 사용 여부를 설정합니다. ',
      ),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
  ],
  validator: {
    isCourseCommentEnabled: { required: true },
    isCourseExternalSharingEnabled: { required: true },
    isCourseEnrollmentEnabled: { required: true },
    isCourseEnrollmentApprovalEnabled: { required: true },
    isLearningRegionRestricted: { required: true },
    isLearningTimeRestricted: { required: true },
    isLearningDeviceRestricted: { required: true },
    isContentSecurityEnabled: { required: true },
    isCourseBudgetUsed: { required: true },
    isEmploymentInsuranceRefundEnabled: { required: true },
  },
};

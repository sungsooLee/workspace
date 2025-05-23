import React, { FC, forwardRef, useEffect, useState, useRef, useImperativeHandle } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import { FormTranslationBox } from '@features/platform/ui/platform/system/translation/form-translation-box';

import { Button, ContentsRow, Input, DynamicFormField, useModal } from '@learnway/ui';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

/** Hook 정의 */
import {
  useTenantAttributeCompany,
  useUpdateTenantAttributeCompany,
} from '@entities/tenant/service/tenant-attribute.hook';

const TenantDetailAttributeCompanyComponent = (
  {
    tenantId,
    attributeData,
    companyId,
    tenantName,
    onUpdateComplete,
  }: {
    tenantId: number;
    attributeData: any;
    companyId: string;
    tenantName: string;
    onUpdateComplete: () => void;
  },
  ref: any,
) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { open: openModal, confirm: openConfirm } = useModal();
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, control } =
    useDynamicForm(formConfig);
  const { update } = useUpdateTenantAttributeCompany(tenantId, {
    onSuccess: (data: any) => {
      fetchData(data);
      onUpdateComplete?.();
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
    console.log(tenantName, attributeData);
    fetchData({ ...attributeData, tenantName: tenantName });
  }, [attributeData]);

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <div className="title_wrap">
        <strong className="title">{t('테넌트 속성 관리')}</strong>
      </div>
      <ContentsRow>
        <FormRow provider={provider} name="tenantName" element={<Input disabled={true} />} />
      </ContentsRow>
      <div className="title_wrap no_line">
        <strong className="title">{t('과정 등록 연관 설정')}</strong>
      </div>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isUseApprovalLine'} />
        <FormRow provider={provider} name={'isLimitLearningTime'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isLimitDailyProgress'} />
        <FormRow provider={provider} name={'isResetProgress'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isUseTextbook'} />
        <FormRow provider={provider} name={'isUseTextbookShippingAddress'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isUseTrainingCostPerPerson'} />
        <FormRow provider={provider} name={'isUseEmploymentInsuranceRefund'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isProvideCertificate'} />
        <FormRow provider={provider} name={'isUseLearningPoint'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isUsePreLevelTest'} />
        <FormRow provider={provider} name={'isUseCourseFlag'} />
      </ContentsRow>
      <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
        <ContentsHistoryInfoFormField />
      </ContentsRow>
    </form>
  );
};

export const TenantDetailAttributeCompany = forwardRef(TenantDetailAttributeCompanyComponent);

// Form 구조 정의
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
    {
      name: 'isUseTextbookShippingAddress',
      type: 'switch',
      label: t('교재 배송지 사용'),
      value: false,
      guideText: t('교재를 사용하는 경우 교재 배송지 필요 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
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
    {
      name: 'companyId',
      type: 'text',
      format: 'number',
      label: '',
      value: 1,
    },
  ],
  validator: {
    tenantName: { required: true },
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

import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import { FormTranslationBox } from '@features/platform/ui/platform/system/translation/form-translation-box';

import { Button, ContentsRow, Input, DynamicFormField } from '@learnway/ui';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

/** Hook 정의 */
import { useTenantAttributeCompany } from '@entities/tenant/service/tenant-attribute.hook';

const FORM_MODE = {
  NONE: 'NONE',
  VIEW: 'VIEW',
  ADD: 'ADD',
};

const TenantDetailAttributeCompanyComponent: FC<any> = ({ tenantId, companyId, tenantName }) => {
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, control } =
    useDynamicForm(formConfig);

  const { data } = useTenantAttributeCompany(tenantId);

  useEffect(() => {
    if (data) {
      const mockData = {};
      fetchData(mockData);
    }
  }, [data]);

  return (
    <div>
      <div className="title_wrap">
        <strong className="title">{t('테넌트 속성 관리')}</strong>
      </div>
      <ContentsRow>
        <FormRow provider={provider} name={'tenantName'} element={<Input disabled={true} />} />
      </ContentsRow>
      <div className="title_wrap no_line">
        <strong className="title">{t('과정 등록 연관 설정')}</strong>
      </div>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isCourseCommentWrite'} />
        <FormRow provider={provider} name={'isCourseOutsideSharing'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isCourseApply'} />
        <FormRow provider={provider} name={'isCourseApproval'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isLearningDelayedLimit'} />
        <FormRow provider={provider} name={'isLearningTimeLimit'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isLearningDeviceLimit'} />
        <FormRow provider={provider} name={'isContentSecurityApply'} />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow provider={provider} name={'isCourseBudgetUse'} />
        <FormRow provider={provider} name={'isCourseEmploymentInsuranceRefund'} />
      </ContentsRow>
      <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
        <ContentsHistoryInfoFormField />
      </ContentsRow>
    </div>
  );
};

export const TenantDetailAttributeCompany = TenantDetailAttributeCompanyComponent;

// Form 구조 정의
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트명'),
      value: '테넌트명 value',
    },
    {
      name: 'isCourseCommentWrite',
      type: 'switch',
      label: t('과정 댓글 작성'),
      value: false,
      guideText: '과정 ',
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 댓글 작성 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 댓글 작성 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isCourseOutsideSharing',
      type: 'switch',
      label: t('과정 외부 공유'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 해당 과정의 사용자간 공유 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 해당 과정의 사용자간 공유 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isCourseApply',
      type: 'switch',
      label: t('수강신청 설정 여부'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 수강 신청 기능 사용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 수강 신청 기능 사용 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isCourseApproval',
      type: 'switch',
      label: t('수강신청 승인자'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 수강신청 승인 결재 기능 사용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 수강신청 승인 결재 기능 사용 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isLearningDelayedLimit',
      type: 'switch',
      label: t('학습 지연 제한'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 학습 지역 제한 기능 사용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 학습 지역 제한 기능 사용 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isLearningTimeLimit',
      type: 'switch',
      label: t('학습 시간 제한'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 학습시간 제한 기능 사용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 학습시간 제한 기능 사용 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isLearningDeviceLimit',
      type: 'switch',
      label: t('학습 기기 제한'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 학습 기기 제한 기능 사용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 학습 기기 제한 기능 사용 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isContentSecurityApply',
      type: 'switch',
      label: t('콘텐츠 보안 적용'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 콘텐츠 보안 적용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 콘텐츠 보안 적용 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isCourseBudgetUse',
      type: 'switch',
      label: t('과정 예산 사용'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 에산 사용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 에산 사용 여부를 설정할 수 없습니다.'),
      },
    },
    {
      name: 'isCourseEmploymentInsuranceRefund',
      type: 'switch',
      label: t('과정 고용보험 환급'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
        guideText: (value: boolean) =>
          value
            ? t('과정 등록 시 고융보험 환급 사용 여부를 설정할 수 있습니다.')
            : t('과정 등록 시 고융보험 환급 사용 여부를 설정할 수 없습니다.'),
      },
    },
  ],
  validator: {
    tenantName: { required: true },
    isCourseCommentWrite: { required: true },
    isCourseOutsideSharing: { required: true },
    isCourseApply: { required: true },
    isCourseApproval: { required: true },
    isLearningDelayedLimit: { required: true },
    isLearningTimeLimit: { required: true },
    isLearningDeviceLimit: { required: true },
    isContentSecurityApply: { required: true },
    isCourseBudgetUse: { required: true },
    isCourseEmploymentInsuranceRefund: { required: true },
  },
};

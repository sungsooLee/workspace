import { useState } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { cn } from '@/libs/shared/src';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import {
  ContentsRow,
  Button,
  ChipListModalSelectorFormField,
  DynamicFormField,
  useModal,
} from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { ThumbnailUploaderFormField } from '@features/learning';
import { DynamicFormConfig, useDynamicForm } from '@/libs/hooks/src';
import { TenantManagerModal } from '@features/tenant/management/ui/tenant-manager-modal';
import { CompanyModal } from '@features/tenant/management/ui/company-modal';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import { useCreateTenant } from '@entities/tenant/service/tenant.hook';
import { LearningResourceProductionGuideModal } from '@features/learning/learning-resource/learning-resource-production-guide-modal';
import { UserInquiryModal } from '@features/shared/ui/modal/hrd-user-inquiry-modal';
export const Route = createFileRoute('/_layout/tenant/management/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { open: openModal, confirm: openConfirm } = useModal();
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);
  const { create } = useCreateTenant({});

  const handleListButtonClick = () => {
    router.navigate({ to: '/tenant/management' });
  };

  const handleCheckChange = (values: any[]) => {
    console.log('=>', values);
  };
  const handleResetButtonClick = () => {
    openModal({ content: <UserInquiryModal />, width: 'xl' });

    console.log('click reset');
  };
  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    const payload = {
      ...data,
    };
    if (await openConfirm('저장 하시겠습니까?')) {
      create(payload);
    }
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button onClick={handleListButtonClick} variant="point" size="sm">
            {t('목록')}
          </Button>
        </LinkBox>

        <Button onClick={handleResetButtonClick} variant="point" size="sm">
          {t('초기화')}
        </Button>
        <Button variant="primary" size="sm">
          {t('저장')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className="title_wrap">
            <strong className="title">{'기본 정보'}</strong>
          </div>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'tenantName'} />
              <Button variant="gray" size="sm">
                {'중복'}
              </Button>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="tenantLogo">
                <ThumbnailUploaderFormField />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'managerName'}>
                <ChipListModalSelectorFormField
                  chipList={{
                    labelField: 'name',
                    valueField: 'value',
                    hideBorder: true,
                  }}
                  modalConfig={{
                    title: '',
                    width: 'xl',
                    content: <TenantManagerModal />,
                  }}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'tenantJungsanTag'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'company'}>
                <ChipListModalSelectorFormField
                  chipList={{
                    labelField: 'name',
                    valueField: 'value',
                    hideBorder: true,
                  }}
                  modalConfig={{
                    title: '',
                    width: 'xl',
                    content: <CompanyModal />,
                  }}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>

          <ContentsRow type={'horizontal'}>
            <FormRow provider={provider}>
              <DynamicFormField name={'isUsed'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'description'} resize="none" />
            </FormRow>
          </ContentsRow>
          <div className="title_wrap no_line">
            <strong className="title">{'시스템 설정'}</strong>
          </div>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'device'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'useCategory'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'language'} onCheckedChange={handleCheckChange} />
            </FormRow>
          </ContentsRow>
        </form>
      </MainContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트명'),
      value: '',
      placeholder: '',
    },
    {
      label: t('테넌트 로고 (Size : 000x000)'),
      name: 'tenantLogo',
      type: 'custom',
      format: 'array',
      value: [],
      tooltip: '테넌트에 사용할 로고로 파일 1개만 등록할 수 있습니다.',
    },
    {
      name: 'managerName',
      label: t('테넌트 담당자'),
      type: 'custom',
      value: '',
    },
    {
      name: 'tenantJungsanTag',
      type: 'text',
      label: t('테넌트 정산 태그'),
      value: '',
      placeholder: '',
      maxLength: 150,
    },
    {
      name: 'company',
      label: t('회사 선택'),
      type: 'custom',
      value: '',
      tooltip:
        '테넌트 소속 회사를 여러개 선택할 수 있습니다. 회사가 여러 개인 경우 회사별로 개별 설정이 필요합니다.',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: true,
      format: 'boolean',
      tooltip:
        '테넌트 사용이 ON이면 학습자 사이트에 로그인 할 수 있으며, OFF이면 로그인 할 수 없습니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      guideText: '테넌트 사용 여부를 설정할 수 있습니다.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: t('설명'),
      value: '',
      maxLength: 2000,
      placeholder: '설명을 입력해 주세요.',
    },
    {
      name: 'device',
      type: 'checkbox-group',
      label: t('디바이스'),
      format: 'array',
      tooltip:
        'PC, 모바일, APP 모두 사용가능하며 과정 등록 시 PC, 모바일 학습 여부를 설정할 수 있습니다.',
      value: ['all', 'isWebExposed', 'isMobileExposed', 'isAppExposed'],
      options: [
        {
          value: 'isWebExposed',
          label: 'PC',
        },
        {
          value: 'isMobileExposed',
          label: 'Mobile',
        },
        {
          value: 'isAppExposed',
          label: 'APP',
        },
      ],
      checkGroupConfig: {
        allCheck: true,
      },
    },
    {
      name: 'language',
      type: 'checkbox-group',
      label: t('언어'),
      format: 'array',
      tooltip: '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다.',
      value: ['ko', 'en'],
      options: [
        { value: 'ko', label: '한국어' },
        { value: 'en', label: '영어' },
        { value: 'ne', label: '네팔어' },
        { value: 'ms', label: '말레이어' },
        { value: 'vi', label: '베트남어' },
        { value: 'es', label: '스페인어' },
      ],
      checkGroupConfig: {
        allCheck: true,
      },
    },
    {
      name: 'useCategory',
      type: 'checkbox-group',
      label: t('카테고리 사용 여부'),
      format: 'array',
      tooltip: '테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다',
      value: ['all', 'common', 'tenant'],
      options: [
        {
          value: 'common',
          label: '공통 카테고리',
        },
        {
          value: 'tenant',
          label: '테넌트 카테고리',
        },
      ],
      checkGroupConfig: {
        allCheck: true,
      },
    },
  ],
  validator: {
    tenantName: { required: true },
    tenantLogo: { required: true },
    managerName: { required: true },
    tenantJungsanTag: { required: true },
    company: { required: true },
    isUsed: { required: true },
    device: {
      required: {
        fn: (values) => {
          return (
            !values.isMobileExposed && !values.isWebExposed && !values.isAppExposed && !values.all
          );
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
    useCategory: {
      required: {
        fn: (values) => {
          return !values.common && !values.tenant && !values.all;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
    language: {
      required: {
        fn: (values) => {
          return !values.common && !values.tenant && !values.all;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
  },
};

import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import {
  Button,
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  ContentsRow,
  TextareaFormField,
  useModal,
} from '@learnway/ui';
import { CODE_GROUP, DynamicFormConfig, useCodeStore, useDynamicForm } from '@learnway/hooks';

import { FormSubTitle, FormRow, ThumbnailListFormField } from '@shared/ui';

import { useCreateTenant } from '@entities/tenant/service/tenant.hook';
import {
  DuplicateCheckInputFormField,
  DuplicateState,
} from '@features/tenant/management/ui/duplicate-check-input-form-field';
import { pageRouteConfig } from '@features/auth';
import { CompanyShuttleModal, CompanyChoiceModal, UserChoiceModal } from '@features/shared';
import TenantService from '@entities/tenant/api/tenant';
import { isEqual } from 'lodash';
import { EnDeviceType, EnUseCategory } from '@types';

export const Route = createFileRoute('/_layout/platform/tenant/management/regist')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.page.title.tenant.managemant',
    },
  }),
});

const defaultLangOptions = [
  { value: 'ko', label: '한국어', disabled: true },
  { value: 'en', label: '영어', disabled: true },
];

const duplicateCheck = async (tenantName: string) => {
  const result: boolean = await TenantService.existTenant(tenantName);

  if (result) return DuplicateState.duplicated;
  else return DuplicateState.ok;
};

/**
 * 화면번호: NLP_BO_TMS_1001
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const [languageTypeList, setLanguageTypeList] = useState<any[]>(defaultLangOptions);

  const { open: openModal, confirm: openConfirm } = useModal();
  const { control, provider, onSubmit, onFormChange, formState } = useDynamicForm(formConfig);

  const { create } = useCreateTenant({
    onSuccess: async () => {
      router.navigate({ to: '/platform/tenant/management' });
    },
  });
  const { getCode } = useCodeStore();

  const formRef = useRef<HTMLFormElement>(null);
  const handleListButtonClick = () => {
    router.navigate({ to: '/platform/tenant/management' });
  };

  const handleSaveButtonClick = async () => {
    const form = formRef.current;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };
  const handleResetButtonClick = () => {
    onFormChange();
  };

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    const logoImageUrl = data.logoImageUrl?.length > 0 ? data.logoImageUrl[0] : '';

    const payload = {
      ...data,
      tenantName: data.tenantName.fieldValue,
      logoImageUrl: logoImageUrl,
      isPc: data.device.includes(EnDeviceType.isPc),
      isMobile: data.device.includes(EnDeviceType.isMobile),
      isApp: data.device.includes(EnDeviceType.isApp),
      isCommonCategory: data.useCategory.includes(EnUseCategory.isCommonCategory),
      isTenantCategory: data.useCategory.includes(EnUseCategory.isTenantCategory),
      companyTenantList: data.companyTenantList.map((i: any) => i.companyId),
      tenantMappingRoleList: data.tenantMappingRoleList.map((i: any) => i.roleId),
      tenantMappingUserList: data.tenantMappingUserList.map((i: any) => i.userId),
    };
    console.log('payload {} => ', payload);
    if (await openConfirm('저장 하시겠습니까?')) {
      create(payload);
    }
  };

  useEffect(() => {
    console.log('formState', formState.isDirty);
  }, [formState.isDirty]);

  useEffect(() => {
    const init = async () => {
      const data = await getCode(CODE_GROUP['pms.multilingual.LanguageType']);
      const newOptions = data
        .filter((i) => {
          return i.value !== 'ko' && i.value !== 'en';
        })
        .map((item) => {
          return { label: item.cdContent, value: item.value };
        });
      const newValues = [...defaultLangOptions, ...newOptions];
      if (!isEqual(newValues, languageTypeList)) {
        setLanguageTypeList([...defaultLangOptions, ...newOptions]);
      }
    };
    init();
  }, []);

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
        <Button variant="primary" size="sm" onClick={handleSaveButtonClick}>
          {t('저장')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
          <FormSubTitle label={t('기본 정보')} lineType={'dark'} />
          <ContentsRow>
            <FormRow
              provider={provider}
              name="tenantName"
              element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateCheck} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="logoImageUrl" element={<ThumbnailListFormField />} />
          </ContentsRow>
          {/* <ContentsRow>
            <FormRow
              provider={provider}
              name="tenantMappingUserList"
              element={
                <ChipListModalSelectorFormField
                  chipList={{
                    labelField: 'name',
                    valueField: 'userId',
                    wordwrap: true,
                  }}
                  modalConfig={{
                    title: '',
                    width: 'xl',
                    content: <UserChoiceModal />,
                  }}
                />
              }
            />
          </ContentsRow> */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name="tenantMappingUserList"
              element={
                <ChipListModalSelectorFormField
                  chipList={{
                    labelField: 'name',
                    valueField: 'userId',
                  }}
                  modalConfig={{
                    title: '',
                    width: 'xl',
                    content: <UserChoiceModal />,
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="tenantBillingTag" />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="companyTenantList"
              element={
                <ChipListModalSelectorFormField
                  chipList={{
                    labelField: 'name',
                    valueField: 'companyId',
                    hideBorder: true,
                  }}
                  modalConfig={{
                    title: '',
                    width: 'xl',
                    content: <CompanyShuttleModal />,
                  }}
                />
              }
            />
          </ContentsRow>

          <ContentsRow type="horizontal">
            <FormRow provider={provider} name="isUsed" />
            <FormRow provider={provider} name="isSecurityPledge" />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="tenantDesc"
              element={<TextareaFormField resize="none" />}
            />
          </ContentsRow>
          <FormSubTitle label={t('시스템 설정')} lineType={'dark'} />
          <ContentsRow>
            <FormRow
              provider={provider}
              name="device"
              element={<CheckboxGroupFormField disabled={true} />}
            />
            <FormRow provider={provider} name="useCategory" />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="tenantMappingLanguageTypeList"
              element={<CheckboxGroupFormField options={languageTypeList} />}
            />
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
      type: 'custom',
      label: t('테넌트명'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      placeholder: '',
      maxLength: 150,
    },
    {
      label: t('테넌트 로고 (Size : 000x000)'),
      name: 'logoImageUrl',
      type: 'custom',
      format: 'array',
      value: [],
      tooltip: t('테넌트에 사용할 로고로 파일 1개만 등록할 수 있습니다.'),
    },
    {
      name: 'tenantMappingUserList',
      label: t('테넌트 담당자'),
      type: 'custom',
      format: 'array',
      value: [],
      placeholder: t('담당자를 선택해주세요.'),
    },
    {
      name: 'tenantMappingRoleList',
      type: 'custom',
      label: t('테넌트 역할'),
      format: 'array',
      value: [],
    },
    {
      name: 'tenantBillingTag',
      type: 'text',
      label: t('테넌트 정산 태그'),
      value: '',
      placeholder: '',
      maxLength: 150,
    },
    {
      name: 'companyTenantList',
      label: t('회사 선택'),
      type: 'custom',
      format: 'array',
      value: [],
      tooltip: t(
        '테넌트 소속 회사를 여러개 선택할 수 있습니다. 회사가 여러 개인 경우 회사별로 개별 설정이 필요합니다.',
      ),
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: true,
      format: 'boolean',
      tooltip: t(
        '테넌트 사용이 ON이면 학습자 사이트에 로그인 할 수 있으며, OFF이면 로그인 할 수 없습니다.',
      ),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      guideText: t('테넌트 사용 여부를 설정할 수 있습니다.'),
    },
    {
      name: 'isSecurityPledge',
      type: 'switch',
      label: t('보안 서약 사용'),
      value: true,
      format: 'boolean',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      guideText: t('보안 서약  사용 여부를 설정할 수 있습니다.'),
    },
    {
      name: 'tenantDesc',
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
      tooltip: t(
        'PC, 모바일, APP 모두 사용가능하며 과정 등록 시 PC, 모바일 학습 여부를 설정할 수 있습니다.',
      ),
      value: [EnDeviceType.isPc, EnDeviceType.isMobile, EnDeviceType.isApp],
      options: [
        {
          label: 'PC',
          value: EnDeviceType.isPc,
        },
        {
          label: 'Mobile',
          value: EnDeviceType.isMobile,
        },
        {
          label: 'App',
          value: EnDeviceType.isApp,
        },
      ],
      showSelectAll: true,
    },
    {
      name: 'tenantMappingLanguageTypeList',
      type: 'checkbox-group',
      label: t('언어'),
      format: 'array',
      tooltip: t(
        '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다.',
      ),
      value: ['ko', 'en'],
      showSelectAll: true,
      cols: 6,
    },
    {
      name: 'useCategory',
      type: 'checkbox-group',
      label: t('카테고리 사용 여부'),
      format: 'array',
      tooltip: '테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다',
      value: [EnUseCategory.isCommonCategory, EnUseCategory.isTenantCategory],
      options: [
        {
          value: EnUseCategory.isCommonCategory,
          label: '공통 카테고리',
        },
        {
          value: EnUseCategory.isTenantCategory,
          label: '테넌트 카테고리',
        },
      ],
      showSelectAll: true,
    },
  ],
  validator: {
    tenantName: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.tenantName.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('테넌트명') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.tenantName.checkState === DuplicateState.check ||
            values.tenantName.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('테넌트명') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.tenantName.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('테넌트명') }),
        },
      ],
    },

    logoImageUrl: {
      required: true,
      conditions: [
        {
          fn: (values) => {
            if (values.logoImageUrl.length == 0) return true;
            return false;
          },
          message: t('테넌트 로고 이미지를 등록 해주세요.'),
        },
      ],
    },
    tenantMappingUserList: { required: true },
    tenantBillingTag: { required: true },
    companyTenantList: { required: true },
    isUsed: { required: true },
    isSecurityPledge: { required: true },
    device: {
      required: {
        fn: (values) => {
          return (
            !values[EnDeviceType.isApp] &&
            !values[EnDeviceType.isMobile] &&
            !values[EnDeviceType.isPc]
          );
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
    useCategory: {
      required: {
        fn: (values) => {
          return !values[EnUseCategory.isCommonCategory] && !values[EnUseCategory.isTenantCategory];
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
    tenantMappingLanguageTypeList: {
      required: {
        fn: (values) => {
          return values.tenantMappingLanguageTypeList.length === 0;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
  },
};

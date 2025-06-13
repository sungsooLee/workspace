import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useRouterState } from '@tanstack/react-router';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

import { cn } from '@learnway/shared';
import {
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  ContentsRow,
  TextareaFormField,
  useModal,
} from '@learnway/ui';
import { CODE_GROUP, DynamicFormConfig, useCodeStore, useDynamicForm } from '@learnway/hooks';

import {
  FormSubTitle,
  ContentsHistoryInfoFormField,
  FormRow,
  ThumbnailListFormField,
} from '@shared/ui';

import { isEqual } from 'lodash';
import { CompanyShuttleModal, RoleChoiceModal, UserChoiceModal } from '@features/shared';
import {
  DuplicateCheckInputFormField,
  DuplicateState,
} from '@features/tenant/management/ui/duplicate-check-input-form-field';
import { useFetchTenant, useUpdateTenant } from '@entities/tenant';
import TenantService from '@entities/tenant/api/tenant';
import { EnDeviceType, EnUseCategory } from '@types';

const duplicateCheck = async (tenantName: string) => {
  const result: boolean = await TenantService.existTenant(tenantName);

  if (result) return DuplicateState.duplicated;
  else return DuplicateState.ok;
};

/**
 * 화면번호: NLP_BO_TMS_1002 (테넌트기본 정보)
 * @param props
 * @param ref
 * @returns
 */
const TenantDetailBaseComponent = (props: any, ref: any) => {
  const routerState = useRouterState();
  const { open: openModal, confirm: openConfirm } = useModal();

  const [languageTypeList, setLanguageTypeList] = useState<any[]>([]);
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });
  const tenantId = routerState.location.state?.tenantId;

  const { t } = useTranslation();
  const { getCode } = useCodeStore();
  const { data: tenantData, refetch } = useFetchTenant(tenantId);
  const { update } = useUpdateTenant({
    onSuccess: () => {
      refetch();
    },
  });
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    saveData() {
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

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    const logoImageUrl = data.logoImageUrl?.length > 0 ? data.logoImageUrl[0] : '';
    const tagStringList = data.tenantTagList.split(',');
    const payload = {
      ...data,
      tenantName: data.tenantName.fieldValue,
      logoImageUrl: logoImageUrl,
      isPc: data.device.includes(EnDeviceType.isPc),
      isMobile: data.device.includes(EnDeviceType.isMobile),
      isApp: data.device.includes(EnDeviceType.isApp),
      isCommonCategory: data.useCategory.includes(EnUseCategory.isCommonCategory),
      isTenantCategory: data.useCategory.includes(EnUseCategory.isTenantCategory),
      tenantId: tenantId,
      tenantTagList: tagStringList.map((item: string) => ({ tagName: item })),
      tenantUserList: data.tenantUserList.map((item: any) => ({ userUuid: item.uuid })),
    };
    console.log('payload {} => ', payload);
    if (await openConfirm('저장 하시겠습니까?')) {
      update(payload);
    }
  };
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  useEffect(() => {
    if (tenantData) {
      const device = [];
      const useCategory = [];
      const logoImageUrl = [tenantData.logoImageUrl];
      tenantData.isPc && device.push(EnDeviceType.isPc);
      tenantData.isMobile && device.push(EnDeviceType.isMobile);
      tenantData.isApp && device.push(EnDeviceType.isApp);
      tenantData.isCommonCategory && useCategory.push(EnUseCategory.isCommonCategory);
      tenantData.isTenantCategory && useCategory.push(EnUseCategory.isTenantCategory);
      let tag = '';
      if (tenantData.tenantTagList && tenantData.tenantTagList.length > 0) {
        tag = tenantData.tenantTagList.map((item) => item.tagName).join(',');
      }
      fetchData({
        ...tenantData,
        tenantName: { fieldValue: tenantData.tenantName, checkState: DuplicateState.okStart },
        logoImageUrl: logoImageUrl,
        device: device,
        useCategory: useCategory,
        tenantDesc: tenantData.tenantDesc ?? '',
        tenantTagList: tag,
        companyTenantList: tenantData.companyTenantList.map((item) => ({
          companyId: item.companyId,
          name: item.companyName,
        })),
        tenantUserList: tenantData.tenantUserList.map((item) => ({
          uuid: item.userUuid,
          name: item.userName ?? '이름 없음',
        })),
      });
    }
  }, [tenantData]);

  useEffect(() => {
    const init = async () => {
      const data = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      const defaultOption = data
        .filter((i) => i.value === 'KO' || i.value === 'EN')
        .map((item) => {
          return { label: item.cdContent, value: item.value, disabled: true };
        });
      const newOptions = data
        .filter((i) => {
          return i.value !== 'KO' && i.value !== 'EN';
        })
        .map((item) => {
          return { label: item.cdContent, value: item.value };
        });
      const newValues = [...defaultOption, ...newOptions];
      if (!isEqual(newValues, languageTypeList)) {
        setLanguageTypeList([...defaultOption, ...newOptions]);
      }
    };
    init();
  }, []);
  return (
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
      <ContentsRow>
        <FormRow
          provider={provider}
          name="tenantUserList"
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'uuid',
                hideBorder: true,
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
        <FormRow provider={provider} name="tenantTagList" />
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

      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name="isUsed" />
        <FormRow provider={provider} name="isSecurityPledge" />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="tenantDesc"
          element={<TextareaFormField resize={'none'} />}
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
          name="langCountryCodeTypeList"
          element={<CheckboxGroupFormField options={languageTypeList} />}
        />
      </ContentsRow>
      <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
        <ContentsHistoryInfoFormField />
      </ContentsRow>
    </form>
  );
};

export const TenantDetailBase = forwardRef(TenantDetailBaseComponent);

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
      name: 'tenantUserList',
      label: t('테넌트 담당자'),
      type: 'custom',
      format: 'array',
      value: [],
      placeholder: t('담당자를 선택해주세요.'),
    },
    {
      name: 'tenantTagList',
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
      value: [],
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
      name: 'langCountryCodeTypeList',
      type: 'checkbox-group',
      label: t('언어'),
      format: 'array',
      tooltip: t(
        '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다.',
      ),
      value: [],
      showSelectAll: true,
      cols: 6,
    },
    {
      name: 'useCategory',
      type: 'checkbox-group',
      label: t('카테고리 사용 여부'),
      format: 'array',
      tooltip: '테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다',
      value: [],
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
    tenantUserList: { required: true },
    tenantTagList: { required: true },
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
    langCountryCodeTypeList: {
      required: {
        fn: (values) => {
          return values.langCountryCodeTypeList.length === 0;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
  },
};

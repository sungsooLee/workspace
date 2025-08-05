import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useRouterState } from '@tanstack/react-router';

import { CODE_GROUP, useCodeStore, useDynamicForm2 } from '@learnway/hooks';

import { isEqual } from 'lodash-es';
import { DuplicateState } from '@features/form';
import { useFetchTenant, useUpdateTenant } from '@entities/tenant';
import TenantService from '@entities/tenant/api/tenant';
import { EnDeviceType, EnFormMode, EnUseCategory } from '@types';

import { TenantDetailBaseForm } from '../../../../features/platform-management/tenant/ui/tenant-detail-base-form';
import { useModal } from '@learnway/ui/modal';

/**
 * 화면번호: NLP_BO_TMS_1002 (테넌트기본 정보)
 * @param props
 * @param ref
 * @returns
 */
const TenantDetailBaseComponent = (props: any, ref: any) => {
  const routerState = useRouterState();
  const { openModal, confirm: openConfirm } = useModal();

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
  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    getValues,
    clearFormError,
    setFormError,
    formState,
  } = useDynamicForm2();

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    saveData() {
      const form = formRef.current;
      if (form) {
        console.log('formValue', getValues());
        console.log('formValue', provider.control);
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const duplicateCheck = async (tenantName: string) => {
    const result: boolean = await TenantService.existTenant(tenantName, tenantId);

    if (result) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    const tagStringList = data.tenantTagList.split(',');
    const payload = {
      ...data,
      tenantName: data.tenantName.fieldValue,
      logoImageUrl: data.logoImageUrl?.length > 0 ? data.logoImageUrl[0] : '',
      isPc: data.device.includes(EnDeviceType.isPc),
      isMobile: data.device.includes(EnDeviceType.isMobile),
      isApp: data.device.includes(EnDeviceType.isApp),
      isCommonCategory: data.useCategory.includes(EnUseCategory.isCommonCategory),
      isTenantCategory: data.useCategory.includes(EnUseCategory.isTenantCategory),
      tenantId,
      tenantTagList: tagStringList.map((item: string) => ({ tagName: item })),
      tenantUserList: data.tenantUserList.map((item: any) => ({
        tenantId,
        userUuid: item.uuid,
      })),
      companyTenantList: data.companyTenantList.map((v: any) => ({
        tenantId,
        companyId: v.companyId,
      })),
    };
    console.log('payload {} => ', payload);
    if (await openConfirm(t('저장 하시겠습니까?'))) {
      update(payload);
    }
  };
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  useEffect(() => {
    if (tenantData && formState.isReady) {
      console.log('#### tenantData {} => ', tenantData);
      const device = [];
      const useCategory = [];
      const logoImageUrl = [tenantData.logoImageUrl];
      if (tenantData.logoImageUrl.includes('/upload/content/image')) {
        const imageUrl = tenantData.logoImageUrl.substring(
          tenantData.logoImageUrl.indexOf('/upload/content/image') + 1,
        );
        logoImageUrl.push(imageUrl);
      }
      tenantData.isPc && device.push(EnDeviceType.isPc);
      tenantData.isMobile && device.push(EnDeviceType.isMobile);
      tenantData.isApp && device.push(EnDeviceType.isApp);
      tenantData.isCommonCategory && useCategory.push(EnUseCategory.isCommonCategory);
      tenantData.isTenantCategory && useCategory.push(EnUseCategory.isTenantCategory);
      let tag = '';
      if (tenantData.tenantTagList && tenantData.tenantTagList.length > 0) {
        tag = tenantData.tenantTagList.map((item) => item.tagName).join(',');
      }

      const platformAttributeProperties = tenantData.flatformProperties;
      updateFormData({
        ...tenantData,
        tenantName: { fieldValue: tenantData.tenantName, checkState: DuplicateState.okStart },
        logoImageUrl,
        device,
        useCategory,
        tenantDesc: tenantData.tenantDesc ?? '',
        tenantTagList: tag,
        companyTenantList: tenantData.companyTenantList.map((item) => ({
          companyId: item.companyId,
          name: item.companyName,
        })),
        tenantUserList: tenantData.tenantUserList.map((item) => ({
          uuid: item.userUuid,
          name: item.userName ?? t('이름 없음'),
        })),
        isEnrollOption: platformAttributeProperties.isUseEnrollOption,
        isTextBookOption: platformAttributeProperties.isUseTextBookOption,
        isInstructorOption: platformAttributeProperties.isUseInstructorOption,
        isPassOption: platformAttributeProperties.isUsePassOption,
        isCommunicationOption: platformAttributeProperties.isUseCommunicationOption,
        isLearningEnvOption: platformAttributeProperties.isUseLearningEnvOption,
        isLearningControlOption: platformAttributeProperties.isUseLearningControlOption,
        isRelatedCourseOption: platformAttributeProperties.isUseRelatedCourseOption,
        isAdminDataOption: platformAttributeProperties.isUseAdminDataOption,
        isCarTenantCustomOption: platformAttributeProperties.isUseCarTenantCustomOption,
        isRotemTenantCustomOption: platformAttributeProperties.isUseRotemTenantCustomOption,
        isOutsourcingTenantCustomOption:
          platformAttributeProperties.isUseOutsourcingTenantCustomOption,
        isWiaTenantCustomOption: platformAttributeProperties.isUseWiaTenantCustomOption,
        isAutoeverTenantCustomOption: platformAttributeProperties.isUseAutoeverTenantCustomOption,
      });
    }
  }, [tenantData, formState.isReady]);

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
      <TenantDetailBaseForm
        formMode={EnFormMode.VIEW}
        provider={provider}
        languageOptions={languageTypeList}
        duplicateCheck={duplicateCheck}
      />
    </form>
  );
};

export const TenantDetailBase = forwardRef(TenantDetailBaseComponent);

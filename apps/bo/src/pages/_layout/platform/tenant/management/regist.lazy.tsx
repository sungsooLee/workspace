import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';

import { CODE_GROUP, useCodeStore, useDynamicForm2 } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';

import TenantService from '@entities/tenant/api/tenant';
import { useCreateTenant } from '@entities/tenant/service/tenant.hook';
import { pageRouteConfig } from '@features/auth';
import { DuplicateState } from '@features/form';
import { TenantDetailBaseForm } from '@features/platform-management/tenant/ui/tenant-detail-base-form';
import { EnDeviceType, EnFormMode, EnUseCategory } from '@types';
import { isEqual } from 'lodash';

export const Route = createLazyFileRoute('/_layout/platform/tenant/management/regist')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.page.title.tenant.managemant',
    },
  }),
});

/**
 * 화면번호: NLP_BO_TMS_1001
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const [languageTypeList, setLanguageTypeList] = useState<any[]>([]);

  const { openModal, confirm: openConfirm } = useModal();
  const { control, provider, onSubmit, onFormChange, formState } = useDynamicForm2();

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
    const tagStringList = data.tenantTagList.split(',');
    const payload = {
      ...data,
      tenantName: data.tenantName.fieldValue,
      logoImageUrl: data.logoImageUrl?.length > 0 ? data.logoImageUrl[0] : '',
      companyTenantList: data.companyTenantList.map((v: any) => ({ companyId: v.companyId })),
      isPc: data.device.includes(EnDeviceType.isPc),
      isMobile: data.device.includes(EnDeviceType.isMobile),
      isApp: data.device.includes(EnDeviceType.isApp),
      isCommonCategory: data.useCategory.includes(EnUseCategory.isCommonCategory),
      isTenantCategory: data.useCategory.includes(EnUseCategory.isTenantCategory),
      tenantTagList: tagStringList.map((item: string) => ({ tagName: item })),
      tenantUserList: data.tenantUserList.map((item: any) => ({ userUuid: item.uuid })),
      isSecurityPledge: true,
    };
    console.log('payload {} => ', payload);
    if (await openConfirm(t('저장 하시겠습니까?'))) {
      create(payload);
    }
  };

  useEffect(() => {
    console.log('formState', formState.isDirty);
  }, [formState.isDirty]);

  useEffect(() => {
    const init = async () => {
      const data = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      const defaultOptions = data
        .filter((i) => {
          return i.value === 'KO' || i.value === 'EN';
        })
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
      const newValues = [...defaultOptions, ...newOptions];
      if (!isEqual(newValues, languageTypeList)) {
        setLanguageTypeList([...defaultOptions, ...newOptions]);
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
          <TenantDetailBaseForm
            formMode={EnFormMode.ADD}
            provider={provider}
            languageOptions={languageTypeList}
            duplicateCheck={duplicateCheck}
          />
        </form>
      </MainContents>
    </PageContainer>
  );
}

const duplicateCheck = async (tenantName: string) => {
  const result: boolean = await TenantService.existTenant(tenantName, undefined);

  if (result) return DuplicateState.duplicated;
  else return DuplicateState.ok;
};

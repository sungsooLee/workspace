import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useState } from 'react';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import {
  CompanyOrganizationCheck,
  EnOrganizationShowType,
  TenantCompanyOrganizationTree,
} from '@features/platform-management/company';
import { Tabs } from '@learnway/ui/tabs';

const CompanyOrganizationComponent = () => {
  const routerState = useRouterState();

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnOrganizationShowType.check);
  const companyCode = routerState.location.state?.companyCode;
  const companyId = routerState.location.state?.companyId;
  const roleInfo = routerState.location.state?.roleInfo;

  const menuItems = [
    {
      title: t('회사 조직 확인'),
      key: EnOrganizationShowType.check,
      content: <CompanyOrganizationCheck companyCode={companyCode} />,
    },
    {
      title: t('회사 조직 (원본)'),
      key: EnOrganizationShowType.origin,
      content: (
        <TenantCompanyOrganizationTree
          companyCode={companyCode}
          companyId={companyId}
          showType={EnOrganizationShowType.origin}
          roleInfo={roleInfo}
        />
      ),
    },
    {
      title: t('회사 조직 (플랫폼)'),
      key: EnOrganizationShowType.platform,
      content: (
        <TenantCompanyOrganizationTree
          companyCode={companyCode}
          companyId={companyId}
          showType={EnOrganizationShowType.platform}
          roleInfo={roleInfo}
        />
      ),
    },
  ];

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  return (
    <Tabs
      items={menuItems}
      type="line"
      size="sm"
      className={styles.progress_wrap}
      selectedTabKey={selectedTabKey}
      onTabChange={handleTabChange}
    />
  );
};

export const CompanyOrganization = CompanyOrganizationComponent;

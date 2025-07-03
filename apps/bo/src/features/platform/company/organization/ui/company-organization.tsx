import { useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { Tabs } from '@learnway/ui';

import {
  EnOrganizationShowType,
  TenantCompanyOrganizationTree,
  CompanyOrganizationCheck,
} from '@features/platform/company';

const CompanyOrganizationComponent = () => {
  const routerState = useRouterState();

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnOrganizationShowType.check);
  const companyCode = routerState.location.state?.companyCode;

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
          showType={EnOrganizationShowType.origin}
        />
      ),
    },
    {
      title: t('회사 조직 (플랫폼)'),
      key: EnOrganizationShowType.platform,
      content: (
        <TenantCompanyOrganizationTree
          companyCode={companyCode}
          showType={EnOrganizationShowType.platform}
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

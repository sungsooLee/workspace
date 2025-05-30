import { useState, useEffect } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { Tabs, Button } from '@learnway/ui';
import { ContentsButtons } from '@widgets/layout';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { CompanyOrganizationDetailCompare } from '@features/platform/company/company-organization-detail-compare';
import { CompanyOrganizationDetailMaster } from '@features/platform/company/company-organization-detail-master';
import { CompanyOrganizationDetailPlatform } from '@features/platform/company/company-organization-detail-platform';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createFileRoute('/_layout/platform/company/organization/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const [selectedTabKey, setSelectedTabKey] = useState<string>('compare');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  useEffect(() => {
    if (!companyCode) router.navigate({ to: '/platform/company/organization' });
  }, [companyCode]);

  const menuItems = [
    {
      title: '회사 조직 확인',
      key: 'compare',
      content: <CompanyOrganizationDetailCompare />,
    },
    {
      title: '회사 조직 (원본)',
      key: 'master',
      content: <CompanyOrganizationDetailMaster />,
    },
    {
      title: '회사 조직 (플랫폼)',
      key: 'platform',
      content: <CompanyOrganizationDetailPlatform />,
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          onClick={() => router.navigate({ to: '/platform/company/organization' })}
        >
          {t('LABEL.button.list')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={menuItems}
          type="line"
          size={'sm'}
          className={styles.tab_wrap}
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}

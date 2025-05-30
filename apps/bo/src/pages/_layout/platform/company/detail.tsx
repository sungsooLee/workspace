import { useState, useEffect } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { Tabs, Button } from '@learnway/ui';
import { ContentsButtons } from '@widgets/layout';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { CompanyDetail } from '@features/platform/company/company-detail';
import { CompanyDetailHR } from '@features/platform/company/company-detail-hr';

export const Route = createFileRoute('/_layout/platform/company/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  //if (!companyCode) router.navigate({ to: '/platform/company' });

  const [selectedTabKey, setSelectedTabKey] = useState('company');

  useEffect(() => {
    if (!companyCode) router.navigate({ to: '/platform/company' });
  }, [companyCode]);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const menuItems = [
    {
      title: '회사 정보',
      key: 'company',
      content: <CompanyDetail mode="view" />,
    },
    {
      title: 'HR 연동 정보',
      key: 'hr',
      content: <CompanyDetailHR />,
    },
  ];

  return (
    <PageContainer tabs={true}>
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          onClick={() => router.navigate({ to: '/platform/company' })}
        >
          {t('LABEL.button.list')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={menuItems}
          type="fill"
          className="page_tabs"
          selectedTabKey={'hr'}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}

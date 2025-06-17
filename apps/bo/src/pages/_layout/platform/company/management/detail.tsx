import { useState, useEffect, useRef } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { Tabs, Button } from '@learnway/ui';
import { ContentsButtons } from '@widgets/layout';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { CompanyDetail } from '@features/platform/company/ui/company-detail';
import { CompanyDetailHR } from '@features/platform/company/ui/company-detail-hr';

export const Route = createFileRoute('/_layout/platform/company/management/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const formRef = useRef(1);

  const [selectedTabKey, setSelectedTabKey] = useState('company');

  useEffect(() => {
    if (!companyCode) router.navigate({ to: '/platform/company/management' });
  }, [companyCode]);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const handleSaveClick = () => {
    console.log('formRef', formRef);
    const detail: any = formRef.current;
    detail.saveData();
  };

  const handleListClick = () => {
    router.navigate({ to: '/platform/company/management' });
  };

  const menuItems = [
    {
      title: '회사 정보',
      key: 'company',
      content: <CompanyDetail ref={formRef} mode="view" />,
    },
    {
      title: 'HR 연동 정보',
      key: 'hr',
      content: <CompanyDetailHR />,
    },
  ];

  return (
    <PageContainer hideOutLine={true}>
      <ContentsButtons>
        {selectedTabKey === 'company' ? (
          <>
            <LinkBox>
              <Button variant="point" size="sm" onClick={handleListClick}>
                {t('LABEL.button.list')}
              </Button>
            </LinkBox>
            <Button variant="primary" size="sm" onClick={handleSaveClick}>
              {t('LABEL.button.save')}
            </Button>
          </>
        ) : (
          <Button variant="point" size="sm" onClick={handleListClick}>
            {t('LABEL.button.list')}
          </Button>
        )}
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={menuItems}
          type="fill"
          className="page_tabs"
          selectedTabKey={'company'}
          onTabChange={handleTabChange}
          showContentBorder={true}
        />
      </MainContents>
    </PageContainer>
  );
}

import { CompanyDetail, CompanyDetailHR } from '@features/platform-management/company';
import { Button } from '@learnway/ui/button';
import { Tabs } from '@learnway/ui/tabs';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { EnFormMode } from '@types';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';

export const Route = createLazyFileRoute('/_layout/platform/company/management/detail')({
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
  }, []);

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
      title: t('회사 정보'),
      key: 'company',
      content: <CompanyDetail ref={formRef} mode={EnFormMode.VIEW} />,
    },
    {
      title: t('HR 연동 정보'),
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
              <Button
                variant="point"
                size="sm"
                onClick={handleListClick}
                label={t('LABEL.button.list')}
              />
            </LinkBox>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveClick}
              label={t('LABEL.button.save')}
            />
          </>
        ) : (
          <Button
            variant="point"
            size="sm"
            onClick={handleListClick}
            label={t('LABEL.button.list')}
          />
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

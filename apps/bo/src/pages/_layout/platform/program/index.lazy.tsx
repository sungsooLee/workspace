import { pageRouteConfig } from '@features/auth';
import { ApiTree } from '@features/platform-management/platform/api-managemnet/ui/api-tree';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui/tabs';
import { MainContents, PageContainer, SectionLayout } from '@shared/ui';
import { createLazyFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { useState } from 'react';

export const Route = createLazyFileRoute('/_layout/platform/program/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.page.title.programManage',
    },
  }),
});

function RouteComponent() {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');
  const renderTabContent = (tabKey: string) => {
    return (
      <SectionLayout contentsRatio={'half'}>
        <ApiTree menuScope={selectedTabKey} />
      </SectionLayout>
    );
  };
  const items = [
    {
      title: t('LABEL.common.learnerMenu'),
      key: 'FO',
      content: renderTabContent('FO'),
    },
    {
      title: t('LABEL.common.hrdCenterMenu'),
      key: 'BO',
      content: renderTabContent('BO'),
    },
  ];

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  return (
    <PageContainer>
      <MainContents>
        <Tabs
          selectedTabKey={selectedTabKey}
          items={items}
          className={styles.tab_wrap}
          type="line"
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}

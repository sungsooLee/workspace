import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { Tabs } from '@learnway/ui';
import { cn } from '@learnway/shared';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { pageRouteConfig } from '../../../../features/auth';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { ProgramTree } from '../../../../features/platform/program/ui/program-tree';

export const Route = createFileRoute('/_layout/platform/program/')({
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
      <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
        <ProgramTree menuScope={selectedTabKey} />
      </div>
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
    <PageContainer scrollHidden={true}>
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

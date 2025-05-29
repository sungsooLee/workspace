import { useState } from 'react';
import { t } from 'i18next';
import { Button, Tabs } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';

import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { SectionLayout } from '../../../../widgets/layout/ui/container/section-layout/section-layout';
import { MenuManage } from '../../../../features/platform/menu/ui/menu-manage';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createFileRoute('/_layout/platform/menu/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');

  const renderTabContent = (tabKey: string) => {
    return (
      <SectionLayout contentsRatio={'half'}>
        <MenuManage menuScope={tabKey} />
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
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => {
            router.navigate({
              to: '/platform/system/multilingual',
              state: {
                keyType: selectedTabKey === 'FO' ? 'LEARNER_MENU' : 'HRD_CENTER_MENU',
              },
            });
          }}
        >
          {t('LABEL.button.multilingualManage')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          selectedTabKey={selectedTabKey}
          items={items}
          type="line"
          onTabChange={handleTabChange}
          className={styles.tab_wrap}
        />
      </MainContents>
    </PageContainer>
  );
}

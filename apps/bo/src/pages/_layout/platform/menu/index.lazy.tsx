import { MenuManage } from '@features/platform-management/platform/menu-managemnet';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Button } from '@learnway/ui/button';
import { Tabs } from '@learnway/ui/tabs';
import { ContentsButtons, MainContents, PageContainer, SectionLayout } from '@shared/ui/layout';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useState } from 'react';

export const Route = createLazyFileRoute('/_layout/platform/menu/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');

  const items = [
    {
      title: t('학습자 메뉴'),
      key: 'FO',
      content: (
        <SectionLayout contentsRatio={'half'}>
          <MenuManage menuScope="FO" />
        </SectionLayout>
      ),
    },
    {
      title: t('HRD센터 메뉴'),
      key: 'BO',
      content: (
        <SectionLayout contentsRatio={'half'}>
          <MenuManage menuScope="BO" />
        </SectionLayout>
      ),
    },
  ];

  const handleTabChange = (tabKey: string) => {
    setSelectedTabKey(tabKey);
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
          {t('다국어 관리')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          selectedTabKey={selectedTabKey}
          items={items}
          type="line"
          onTabChange={handleTabChange}
          // onBeforeTabChange={handleBeforeTabChange}
          className={styles.tab_wrap}
        />
      </MainContents>
    </PageContainer>
  );
}

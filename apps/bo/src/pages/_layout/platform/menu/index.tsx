import { useState, useRef } from 'react';
import { t } from 'i18next';
import { Button, Tabs, useModal } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { MenuManage, MenuManageRef } from '@features/platform/menu/ui/menu-manage';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createFileRoute('/_layout/platform/menu/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');
  const { confirm: openConfirm } = useModal();

  // 각 탭의 MenuManage 컴포넌트 참조
  const foMenuManageRef = useRef<MenuManageRef>(null);
  const boMenuManageRef = useRef<MenuManageRef>(null);

  const items = [
    {
      title: t('LABEL.common.learnerMenu'),
      key: 'FO',
      content: (
        <SectionLayout contentsRatio={'half'}>
          <MenuManage ref={foMenuManageRef} menuScope="FO" />
        </SectionLayout>
      ),
    },
    {
      title: t('LABEL.common.hrdCenterMenu'),
      key: 'BO',
      content: (
        <SectionLayout contentsRatio={'half'}>
          <MenuManage ref={boMenuManageRef} menuScope="BO" />
        </SectionLayout>
      ),
    },
  ];

  const handleTabChange = (tabKey: string) => {
    setSelectedTabKey(tabKey);

    // foMenuManageRef.current?.setSkipConfirmation(false);
    // boMenuManageRef.current?.setSkipConfirmation(false);
  };

  const handleBeforeTabChange = async (currentTabKey: string, nextTabKey: string) => {
    // 현재 활성 탭의 변경사항 확인
    const currentMenuManageRef = currentTabKey === 'FO' ? foMenuManageRef : boMenuManageRef;

    if (currentMenuManageRef.current?.hasFormChanges()) {
      const shouldProceed = await openConfirm({
        title: '저장하지 않고 이동',
        content: '변경된 내용이 있습니다. 저장하지 않고 다른 탭으로 이동하시겠습니까?',
      });

      if (shouldProceed) {
        currentMenuManageRef.current?.setSkipConfirmation(true);
      }

      return shouldProceed;
    }

    return true;
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
          // onBeforeTabChange={handleBeforeTabChange}
          className={styles.tab_wrap}
        />
      </MainContents>
    </PageContainer>
  );
}

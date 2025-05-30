import { ReactNode, useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { Tabs, Button } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

/* tab contents */
import { TenantDetailMenu } from '@features/tenant/management/ui/tenant-detail-menu';
import { TenantDetailCategory } from '@features/tenant/management/ui/tenant-detail-category';
import { TenantDetailAttribute } from '@features/tenant/management/ui/tenant-detail-attribute';
import { TenantDetailWidget } from '@features/tenant/management/ui/tenant-detail-widget';
import { TenantDetailBanner } from '@features/tenant/management/ui/tenant-detail-banner';
import { TenantDetailLearningRole } from '@features/tenant/management/ui/tenant-detail-learning-role';

import { EnTenantDetailTabKey } from '@types';

export const Route = createFileRoute('/_layout/tenant/management/detail')({
  component: RouteComponent,
});
const scrollHidden: string[] = [EnTenantDetailTabKey.base, EnTenantDetailTabKey.attribute];
const buttonShowTabs: string[] = [EnTenantDetailTabKey.base, EnTenantDetailTabKey.attribute];
/**
 * 화면 번호:
 * 테넌트 속성 과정연관 (NLP_BO_TMS_1003_00_04),
 * 메뉴 (NLP_BO_TMS_1002_01, NLP_BO_TMS_1002_01_01, NLP_BO_TMS_1002_01_03, NLP_BO_TMS_1002_01_04)
 * 카테고리 (NLP_BO_TMS_1002_02_01 , NLP_BO_TMS_1002_02_02)
 * 역할 (NLP_BO_TMS_1003_04, NLP_BO_TMS_1003_04_01, NLP_BO_TMS_1003_04_02, NLP_BO_TMS_1003_04_03, NLP_BO_TMS_1003_04_04, NLP_BO_TMS_1003_04_05)
 * 위젯 (NLP_BO_TMS_1003_05)
 * 배너 (NLP_BO_TMS_1105, NLP_BO_TMS_1106)
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnTenantDetailTabKey.attribute);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  const handleListButtonClick = () => {
    router.navigate({ to: '/tenant/management' });
  };

  const handleResetButtonClick = () => {
    switch (selectedTabKey) {
      case 'attrbute':
        alert('attrbute');
        break;

      default:
        alert('없음');
    }
  };

  const menuItems = [
    {
      title: '테넌트 속성 관리',
      key: EnTenantDetailTabKey.attribute,
      content: <TenantDetailAttribute />,
    },
    {
      title: '테넌트 메뉴관리',
      key: EnTenantDetailTabKey.menu,
      content: <TenantDetailMenu />,
    },
    {
      title: '테넌트 카테고리 관리',
      key: EnTenantDetailTabKey.category,
      content: <TenantDetailCategory />,
    },
    {
      title: '테넌트 역할 관리',
      key: EnTenantDetailTabKey.learningRole,
      content: <TenantDetailLearningRole />,
    },
    {
      title: '테넌트 위젯 관리',
      key: EnTenantDetailTabKey.widget,
      content: <TenantDetailWidget />,
    },
    {
      title: '테넌트 배너 관리',
      key: EnTenantDetailTabKey.banner,
      content: <TenantDetailBanner />,
    },
  ];

  return (
    <PageContainer>
      {buttonShowTabs.includes(selectedTabKey) && (
        <ContentsButtons>
          <LinkBox>
            <Button onClick={handleListButtonClick} variant="point" size="sm">
              목록
            </Button>
          </LinkBox>

          <Button onClick={handleResetButtonClick} variant="point" size="sm">
            초기화
          </Button>
          <Button variant="point" size="sm">
            수정
          </Button>
        </ContentsButtons>
      )}
      {!buttonShowTabs.includes(selectedTabKey) && (
        <ContentsButtons>
          <Button onClick={handleListButtonClick} variant="point" size="sm">
            목록
          </Button>
        </ContentsButtons>
      )}
      <MainContents>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={EnTenantDetailTabKey.attribute}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}

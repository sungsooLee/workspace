import { Children, FC, isValidElement, ReactNode, useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { Tabs, Button } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import { EnTenantDetailTabKey } from '@types';
/* tab contents */
import { TenantDetailMenu } from '@features/tenant/management/ui/tenant-detail-menu';
import { TenantDetailBase } from '@features/tenant/management/ui/tenant-detail-base';
import { TenantDetailCategory } from '@features/tenant/management/ui/tenant-detail-category';
import { TenantDetailAttribute } from '@features/tenant/management/ui/tenant-detail-attribute';
import { TenantDetailWidget } from '@features/tenant/management/ui/tenant-detail-widget';
import { TenantDetailBanner } from '@features/tenant/management/ui/tenant-detail-banner';
import { TenantDetailLearningRole } from '@features/tenant/management/ui/tenant-detail-learning-role';

export const Route = createFileRoute('/_layout/platform/tenant/management/detail')({
  component: RouteComponent,
});

const buttonShowTabs: string[] = [EnTenantDetailTabKey.base, EnTenantDetailTabKey.attribute];
function RouteComponent() {
  const router = useRouter();
  const formBaseRef = useRef<HTMLFormElement>(null);
  const formAttrRef = useRef<HTMLFormElement>(null);

  const [selectedTabKey, setSelectedTabKey] = useState(EnTenantDetailTabKey.base);

  const handleTabChange = (tabKey: EnTenantDetailTabKey) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  const handleListButtonClick = () => {
    router.navigate({ to: '/platform/tenant/management' });
  };

  const handleResetButtonClick = () => {
    switch (selectedTabKey) {
      case EnTenantDetailTabKey.base:
        alert(EnTenantDetailTabKey.base);
        break;
      case EnTenantDetailTabKey.attribute:
        alert(EnTenantDetailTabKey.attribute);
        break;
      default:
        alert('없음');
    }
  };

  const menuItems = [
    {
      title: '테넌트 기본 정보',
      key: EnTenantDetailTabKey.base,
      content: <TenantDetailBase formRef={formBaseRef} roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 속성 관리',
      key: EnTenantDetailTabKey.attribute,
      content: <TenantDetailAttribute formRef={formAttrRef} roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 메뉴관리 매핑',
      key: EnTenantDetailTabKey.menu,
      content: <TenantDetailMenu roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 카테고리 관리',
      key: EnTenantDetailTabKey.category,
      content: <TenantDetailCategory roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 역할 관리',
      key: EnTenantDetailTabKey.learningRole,
      content: <TenantDetailLearningRole roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 위젯 관리',
      key: EnTenantDetailTabKey.widget,
      content: <TenantDetailWidget roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 배너 관리',
      key: EnTenantDetailTabKey.banner,
      content: <TenantDetailBanner roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 디자인/테마 관리',
      key: EnTenantDetailTabKey.theme,
      content: '테넌트 디자인/테마 관리',
    },
  ];

  return (
    <PageContainer scrollHidden={false}>
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
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}

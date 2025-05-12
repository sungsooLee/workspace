import { Children, FC, isValidElement, ReactNode, useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { Tabs, Button } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

/* tab contents */
import { TenantDetailMenu } from '@features/tenant/management/ui/tenant-detail-menu';
// import { TenantDetailBase } from '@features/tenant/management/ui/tenant-detail-base';
import { TenantDetailCategory } from '@features/tenant/management/ui/tenant-detail-category';
import { TenantDetailAttribute } from '@features/tenant/management/ui/tenant-detail-attribute';
import { TenantDetailWidget } from '@features/tenant/management/ui/tenant-detail-widget';
import { TenantDetailBanner } from '@features/tenant/management/ui/tenant-detail-banner';
import { TenantDetailLearningRole } from '@features/tenant/management/ui/tenant-detail-learning-role';

export const Route = createFileRoute('/_layout/tenant/management/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedTabKey, setSelectedTabKey] = useState('attrbute');

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
      key: 'attrbute',
      content: <TenantDetailAttribute />,
    },
    {
      title: '테넌트 메뉴관리',
      key: 'menu',
      content: <TenantDetailMenu />,
    },
    {
      title: '테넌트 카테고리 관리',
      key: 'category',
      content: <TenantDetailCategory />,
    },
    {
      title: '테넌트 역할 관리',
      key: 'learningRole',
      content: <TenantDetailLearningRole />,
    },
    {
      title: '테넌트 위젯 관리',
      key: 'widget',
      content: <TenantDetailWidget />,
    },
    {
      title: '테넌트 배너 관리',
      key: 'banner',
      content: <TenantDetailBanner />,
    },
  ];

  return (
    <PageContainer scrollHidden={false}>
      {selectedTabKey === 'menu01' && (
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
      {selectedTabKey !== 'menu01' && (
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
          selectedTabKey={'menu01'}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}

import { Children, FC, isValidElement, ReactNode, useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { Tabs, Button } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

/* tab contents */
import { TenantDetailMenu } from '@features/tenant/ui/tenant-detail-menu';
import { TenantDetailBase } from '@features/tenant/ui/tenant-detail-base';
import { TenantDetailCategory } from '@features/tenant/ui/tenant-detail-category';
import { TenantDetailAttribute } from '@features/tenant/ui/tenant-detail-attribute';
import { TenantDetailWidget } from '@features/tenant/ui/tenant-detail-widget';

export const Route = createFileRoute('/_layout/tenant/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const [selectedTabKey, setSelectedTabKey] = useState('menu01');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  const handleListButtonClick = () => {
    router.navigate({ to: '/tenant/' });
  };

  const handleResetButtonClick = () => {
    switch (selectedTabKey) {
      case 'menu01':
        alert('menu01');
        break;
      case 'menu02':
        alert('menu02');
        break;
      case 'menu03':
        alert('menu03');
        break;
      case 'menu04':
        alert('menu04');
        break;
      default:
        alert('없음');
    }
  };
  return (
    <PageContainer scrollHidden={false}>
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

const menuItems = [
  {
    title: '테넌트 기본 정보',
    key: 'menu01',
    content: <TenantDetailBase />,
  },
  {
    title: '테넌트 속성 관리',
    key: 'menu02',
    content: <TenantDetailAttribute />,
  },
  {
    title: '테넌트 메뉴관리 메핑',
    key: 'menu03',
    content: <TenantDetailMenu />,
  },
  {
    title: '테넌트 카테고리 관리',
    key: 'menu04',
    content: <TenantDetailCategory />,
  },
  {
    title: '테넌트 역할 관리',
    key: 'menu05',
    content: '',
  },
  {
    title: '테넌트 위젯 관리',
    key: 'menu06',
    content: <TenantDetailWidget />,
  },
  {
    title: '테넌트 배너 관리',
    key: 'menu07',
    content: '',
  },
];

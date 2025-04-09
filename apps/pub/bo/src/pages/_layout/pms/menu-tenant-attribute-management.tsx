import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import pageStyles from './tenant-menu-management.module.css';
import { Tabs } from '@learnway/ui';
import { cn } from '@learnway/shared';

/* tab contents */
import { TenantAttribute01 } from './-tabcontents/tenant-attribute01';
import { TenantAttribute02 } from './-tabcontents/tenant-attribute02';

export const Route = createFileRoute('/_layout/pms/menu-tenant-attribute-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const menuItems = [
    {
      title: '1. 테넌트 속성 관리',
      key: 'menu01',
      content: '',
    },
    {
      title: '2. 테넌트 디자인/테마관리',
      key: 'menu02',
      content: '',
    },
    {
      title: '3. 테넌트 메뉴관리',
      key: 'menu03',
      content: '',
    },
    {
      title: '4. 테넌트 카테고리 관리',
      key: 'menu04',
      content: '',
    },
    {
      title: '5. 테넌트 역할 관리',
      key: 'menu05',
      content: '',
    },
    {
      title: '6. 메인 위젯관리',
      key: 'menu06',
      content: '',
    },
    {
      title: '7. 배너관리',
      key: 'menu07',
      content: '',
    },
  ];
  const tabItems = [
    {
      title: '현대자동차',
      key: 'tab01',
      content: <TenantAttribute01 />,
    },
    {
      title: '기아자동차',
      key: 'tab02',
      content: <TenantAttribute02 />,
    },
  ];
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={cn(styles.main_contents, pageStyles.start)}>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={'menu03'}
        />
        <Tabs
          items={tabItems}
          type="line"
          size={'sm'}
          className={styles.tab_wrap}
          selectedTabKey={'tab01'}
        />
      </div>
    </PageContainer>
  );
}

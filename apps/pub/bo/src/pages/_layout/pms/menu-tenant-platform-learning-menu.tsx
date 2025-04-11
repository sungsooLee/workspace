import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import pageStyles from './tenant-menu-management.module.css';
import { Tabs } from '@learnway/ui';
import { cn } from '@learnway/shared';

/* tab contents */
import { TenantPlatformLearningMenu } from './-tabcontents/tenant-platform-learning-menu'; // 학습자 메뉴
import { TenantPlatformHrdMenu } from './-tabcontents/tenant-platform-hrd-menu'; // HRD 메뉴

export const Route = createFileRoute('/_layout/pms/menu-tenant-platform-learning-menu')({
  component: RouteComponent,
});

function RouteComponent() {
  const menuItems = [
    {
      title: '1. 테넌트 기본 정보',
      key: 'menu01',
      content: '',
    },
    {
      title: '2. 테넌트 메뉴 매핑',
      key: 'menu02',
      content: '',
    },
    {
      title: '3. 테넌트 카테고리 매핑',
      key: 'menu03',
      content: '',
    },
    {
      title: '4. 테넌트 역할 생성',
      key: 'menu04',
      content: '',
    },
  ];
  const tabItems = [
    {
      title: '학습자 메뉴',
      key: 'tab01',
      content: <TenantPlatformLearningMenu />,
    },
    {
      title: 'HRD센터 메뉴',
      key: 'tab02',
      content: <TenantPlatformHrdMenu />,
    },
  ];
  return (
    <PageContainer scrollHidden={true}>
      {/* main_contents */}
      <div className={cn(styles.main_contents, pageStyles.start)}>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={'menu02'}
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

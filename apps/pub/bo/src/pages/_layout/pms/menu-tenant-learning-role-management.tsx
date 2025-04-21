import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Tabs } from '@learnway/ui';
import { cn } from '@learnway/shared';

/* styles */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

/* tab contents */
import { TenantLearningRoleMenu } from './-tabcontents/tenant-learning-role-menu'; // 학습자 역할정보
import { TenantLearningMenuSetting } from './-tabcontents/tenant-learning-menu-setting'; // 학습자 메뉴설정

export const Route = createFileRoute('/_layout/pms/menu-tenant-learning-role-management')({
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
      title: '학습자 역할정보',
      key: 'tab01',
      content: <TenantLearningRoleMenu />,
    },
    {
      title: '학습자 메뉴설정',
      key: 'tab02',
      content: <TenantLearningMenuSetting />,
    },
    {
      title: '학습자 역할부여',
      key: 'tab03',
      content: '',
    },
    {
      title: 'HRD센터 역할정보',
      key: 'tab04',
      content: '',
    },
    {
      title: 'HRD센터 메뉴설정',
      key: 'tab05',
      content: '',
    },
    {
      title: 'HRD센터 역할부여',
      key: 'tab06',
      content: '',
    },
  ];
  return (
    <PageContainer scrollHidden={true}>
      {/* main_contents */}
      <div className={cn(styles.main_contents)}>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={'menu05'}
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

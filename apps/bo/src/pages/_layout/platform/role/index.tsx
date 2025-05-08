import { createFileRoute } from '@tanstack/react-router';
import { RoleInfo } from '../../../../features/platform/role/ui/role-info';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { Tabs } from '../../../../../../../libs/ui/src';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createFileRoute('/_layout/platform/role/')({
  component: RouteComponent,
});

const menuItems = [
  {
    title: '1. 테넌트 기본 정보',
    key: 'menu01',
    content: '',
  },
  {
    title: '2. 테넌트 메뉴 관리',
    key: 'menu02',
    content: '',
  },
  {
    title: '3. 테넌트 카테고리 관리',
    key: 'menu03',
    content: '',
  },
  {
    title: '4. 테넌트 역할 관리',
    key: 'menu04',
    content: '',
  },
  {
    title: '테넌트 디자인/테마 관리',
    key: 'menu05',
    content: '',
  },
];

function RouteComponent() {
  return (
    <PageContainer scrollHidden={true}>
      <MainContents>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={'menu04'}
        />
        <RoleInfo />
      </MainContents>
    </PageContainer>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';

/* tab contents */
import { CompanyInfomation } from './-tabcontents/company-infomation'; // 회사정보
import { AutoUserGroup } from './-tabcontents/auto-user-group'; // 자동유저그룹관리

export const Route = createFileRoute('/_layout/pms/menu-platform-company-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '회사정보',
      key: 'tab01',
      content: <CompanyInfomation />,
    },
    {
      title: '자동유저그룹관리',
      key: 'tab02',
      content: <AutoUserGroup />,
    },
  ];
  return (
    <PageContainer scrollHidden={true}>
      {/* main_contents */}
      <div className={styles.main_contents}>
        <Tabs items={items} type="line" size={'sm'} className={styles.tab_wrap} />
      </div>
    </PageContainer>
  );
}

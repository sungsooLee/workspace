import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Tabs } from '@learnway/ui';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

/* tab contents */
import { CompanyGroupConfirm } from './-tabcontents/company-group-confirm'; // 회사조직(원본)

export const Route = createFileRoute('/_layout/pms/menu-tenant-company-group')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '회사조직 확인',
      key: 'tab01',
      content: <CompanyGroupConfirm />,
    },
    {
      title: '회사조직(원본)',
      key: 'tab02',
      content: <CompanyGroupConfirm />,
    },
    {
      title: '회사조직(플랫폼)',
      key: 'tab03',
      content: <CompanyGroupConfirm />,
    },
  ];
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}>
        <Tabs
          items={items}
          type="line"
          size={'sm'}
          className={styles.tab_wrap}
          selectedTabKey={'tab02'}
        />
      </div>
    </PageContainer>
  );
}

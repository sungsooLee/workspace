import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';

/* tab contents */
import { MainBasicInfo } from './-tabcontents/main-basic-info'; // 기본 정보

export const Route = createFileRoute('/_layout/pms/menu-main-registration')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '기본정보',
      key: 'tab01',
      content: <MainBasicInfo />,
    },
    {
      title: '다국어 입력',
      key: 'tab02',
      //   content: <HrdMenu />,
    },
  ];
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}>
        <Tabs items={items} type="line" size={'sm'} className={styles.tab_wrap} />
      </div>
    </PageContainer>
  );
}

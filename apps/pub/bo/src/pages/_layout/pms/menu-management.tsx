import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';

/* tab contents */
import { LearningMenu } from './-tabcontents/learning-menu'; // 학습자 메뉴
import { HrdMenu } from './-tabcontents/hrd-menu'; // HRD 메뉴

export const Route = createFileRoute('/_layout/pms/menu-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '학습자',
      key: 'tab01',
      content: <LearningMenu />,
    },
    {
      title: 'HRD센터',
      key: 'tab02',
      content: <HrdMenu />,
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

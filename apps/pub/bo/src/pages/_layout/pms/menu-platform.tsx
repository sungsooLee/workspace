import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';

/* tab contents */
import { ApiLearningMenu } from './-tabcontents/api-learning-menu'; // 학습자 메뉴
import { ApiHrdMenu } from './-tabcontents/api-hrd-menu'; // HRD 메뉴

export const Route = createFileRoute('/_layout/pms/menu-platform')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '학습자 메뉴',
      key: 'a',
      content: <ApiLearningMenu />,
    },
    {
      title: 'HRD센터 메뉴',
      key: 'b',
      content: <ApiHrdMenu />,
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

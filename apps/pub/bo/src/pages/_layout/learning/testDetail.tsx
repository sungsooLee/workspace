import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Tabs } from '@learnway/ui';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

/* tab contents */
import { TestInfo } from './-tabcontents/test-info'; // 시험지 정보(OMR 시험지)
import { QuestionInfo } from './-tabcontents/question-info'; // 문항 추가(랜덤형)

export const Route = createFileRoute('/_layout/learning/testDetail')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '시험지 정보(OMR 시험지)',
      key: 'option01',
      content: <TestInfo />,
    },
    {
      title: '문항 추가(랜덤형)',
      key: 'option02',
      content: <QuestionInfo />,
    },
  ];
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <Tabs selectedTabKey={'option01'} items={items} type="progress" size={'sm'} />
        </div>
      </PageContainer>
    </form>
  );
}

import { createLazyFileRoute } from '@tanstack/react-router';
import { Tabs } from '@learnway/ui';
import { MainContents, PageContainer } from '@shared/ui';
import { TestInfo } from './-components/test-info';
import { QuestionInfo } from './-components/question-info';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/test-paper/view')({
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
    <PageContainer>
      <MainContents>
        <form className="form_row">
          {/* main_contents */}
          <div className={styles.main_contents}>
            <Tabs selectedTabKey={'option01'} items={items} type="progress" size={'sm'} />
          </div>
        </form>
      </MainContents>
    </PageContainer>
  );
}

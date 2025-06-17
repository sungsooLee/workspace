/* eslint-disable import/first */
/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../../../bo/src/widgets/layout/ui/container/slot/main-contents';
import { Tabs } from '@learnway/ui';

export const Route = createFileRoute('/_layout/lms/procedure-open-setting')({
  component: RouteComponent,
});

/* contents */
import { OpenSetting } from './-contents/open-setting';

function RouteComponent() {
  const items = [
    {
      title: '1. 기본정보 설정',
      key: 'tab01',
      content: <h2>Tab A content</h2>,
    },
    {
      title: '2. 수강신청 설정',
      key: 'tab02',
      content: <h2>Tab B content</h2>,
    },
    {
      title: '3. 커리큘럼 설정',
      key: 'tab03',
      content: <h2>Tab C content</h2>,
    },
    {
      title: '4. 상세 설정',
      key: 'tab04',
      content: <h2>Tab D content</h2>,
    },
    {
      title: '5. 게시 설정',
      key: 'tab05',
      content: <OpenSetting />,
    },
  ];
  return (
    <PageContainer>
      <MainContents>
        <Tabs selectedTabKey={'tab05'} items={items} type="progress" size={'sm'} />
      </MainContents>
    </PageContainer>
  );
}

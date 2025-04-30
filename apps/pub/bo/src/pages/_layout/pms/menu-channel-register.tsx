import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Tabs, Button } from '@learnway/ui';

/* tab contents */
import { ChannelBasicInfo } from './-tabcontents/channel-basic-info';

export const Route = createFileRoute('/_layout/pms/menu-channel-register')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '기본 정보',
      key: 'a',
      content: <ChannelBasicInfo />,
    },
    {
      title: '화면/사용 설정',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
    {
      title: '역활 관리',
      key: 'c',
      content: <h2>Tab C content</h2>,
    },
    {
      title: '구독자 관리',
      key: 'd',
      content: <h2>Tab D content</h2>,
    },
    {
      title: '유저그룹 관리',
      key: 'e',
      content: <h2>Tab E content</h2>,
    },
  ];

  return (
    <form className="form_row">
      <PageContainer tabs={true}>
        <Tabs items={items} type="fill" className="page_tabs" />
      </PageContainer>
    </form>
  );
}

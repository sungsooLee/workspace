import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Tabs } from '@learnway/ui';

/* tab contents */
import { GroupInfo } from './-tabcontents/group-info';

export const Route = createFileRoute('/_layout/pms/group-management-info')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '회사 정보',
      key: 'a',
      content: <GroupInfo />,
    },
    {
      title: 'HR 연동 정보',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
  ];
  return (
    <form className="form_row">
      <PageContainer hideOutLine={true}>
        <Tabs items={items} type="fill" className={'page_tabs'} showContentBorder={true} />
      </PageContainer>
    </form>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { Tabs } from '@learnway/ui';
export const Route = createFileRoute('/_layout/pms/layout')({
  component: RouteComponent,
});

function RouteComponent() {
  // const [selectedTabKey] = useState<string>('');

  const items = [
    {
      title: 'Tab A',
      key: 'a',
      content: (
        <h2>
          Tab A content
          <br />
          11111
          <br />
          11111
          <br />
          11111
        </h2>
      ),
    },
    {
      title: 'Tab B',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
    {
      title: 'Tab C',
      key: 'c',
      content: <h2>Tab C content</h2>,
    },
    {
      title: 'Tab D',
      key: 'd',
      content: <h2>Tab D content</h2>,
    },
    {
      title: 'Tab E',
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

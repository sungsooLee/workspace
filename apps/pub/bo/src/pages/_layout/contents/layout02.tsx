import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
/* Notice */
import { Notice } from './-components/notice';

export const Route = createFileRoute('/_layout/contents/layout02')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = ['aaaaaaaaa', 'bbbbbbbb', 'cccccccc'];
  return (
    <form className="form_row">
      <PageContainer>
        <Notice title="타이틀" text="텍스트 영역입니다." list={items} />
      </PageContainer>
    </form>
  );
}

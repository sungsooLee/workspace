import { createFileRoute } from '@tanstack/react-router';
import { WordWrap } from './-component/word-wrap';

export const Route = createFileRoute('/_guide/guide/word-wrap')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={{ width: '100px' }}>
      <WordWrap text={'엑셀 파일 업로드 후 대기 중인 상태'} />
    </div>
  );
}

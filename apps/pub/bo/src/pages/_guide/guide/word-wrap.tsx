import { createFileRoute } from '@tanstack/react-router';
import { WordWrap } from './-component/word-wrap';

export const Route = createFileRoute('/_guide/guide/word-wrap')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={{ width: '100px' }}>
      <WordWrap text={'dnsjdnsdnsjdsjdsdnsjjndsjdnj'} />
    </div>
  );
}

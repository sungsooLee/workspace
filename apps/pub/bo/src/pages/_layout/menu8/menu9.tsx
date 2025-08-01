import { Editor } from '@learnway/ui/editor';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/menu8/menu9')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Lexical Editor</h1>
      <div className={'pt-10'}>
        <Editor value={''} />
      </div>
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { Button, Tooltip } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/tooltip')({
  component: RouteComponent,
});

function RouteComponent() {
  //   const Content = () => (
  //     <div className="w-80">
  //       <h3 className="bg-green-50">Content Header</h3>
  //       <h4 className="bg-gray-3 h-20">Content Body</h4>
  //     </div>
  //   );
  return (
    <div>
      <h2 className="guide_tit2">Tootip Component Guide</h2>
      <Tooltip content={'tooltip content'}>
        <Button>Button</Button>
      </Tooltip>
    </div>
  );
}

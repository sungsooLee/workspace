import { createFileRoute } from '@tanstack/react-router';
import { Button, EmptyText } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/empty')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <EmptyText
        description={'Default Description'}
        footer={
          <>
            <Button variant={'gray'} size={'lg'} label={'action 1'} />
            <Button variant={'primary'} size={'lg'} label={'action 2'} />
          </>
        }
      />
    </div>
  );
}

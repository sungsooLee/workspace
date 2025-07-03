import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/components/button')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <button type="">작성완료</button>
    </div>
  );
}

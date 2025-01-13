import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/menu/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello 가이드 -메뉴</div>;
}

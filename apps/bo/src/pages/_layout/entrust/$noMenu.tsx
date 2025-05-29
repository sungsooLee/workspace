import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/entrust/$noMenu')({
  component: RouteComponent,
});

function RouteComponent() {
  const { noMenu } = Route.useParams();

  return <div>" - 페이지없음 -"! {noMenu}</div>;
}

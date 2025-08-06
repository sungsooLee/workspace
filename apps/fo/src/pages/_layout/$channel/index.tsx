import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/$channel/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { channel } = Route.useParams();

  console.log('@@@ channel', channel);

  return <div>채널 홈 입니다.</div>;
}

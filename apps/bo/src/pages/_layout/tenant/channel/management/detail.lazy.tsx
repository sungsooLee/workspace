import { ChannelDetail } from '@features/channel';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/_layout/tenant/channel/management/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  useEffect(() => {
    if (!channelUuid) router.navigate({ to: '/tenant/channel/management' });
  }, []);

  return <ChannelDetail />;
}

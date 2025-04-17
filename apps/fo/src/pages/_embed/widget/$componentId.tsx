import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useCurrentRoute } from '@learnway/hooks';

import { WidgetContainer } from '../../../widgets/platform';

export const Route = createFileRoute('/_embed/widget/$componentId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { params, search } = useCurrentRoute(Route);

  useEffect(() => {
    if (search?.isMobile === true) {
      const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
      body.classList.add('mobile');
    }
  }, []);

  return <WidgetContainer componentId={params.componentId} />;
}

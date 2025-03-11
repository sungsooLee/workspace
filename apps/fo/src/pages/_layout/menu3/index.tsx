import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MobileView, BrowserView } from 'react-device-detect';

import { Button } from '@learnway/ui';
import { pageRouteConfig } from '../../../features/auth';

import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

export const Route = createFileRoute('/_layout/menu3/')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { mobile: { showFooter: true } } }),
});

function RouteComponent() {
  return (
    <div>
      'Hello /_layout/menu3/!'
      <MobileView>
        <MobileContainerFooter>
          <Button>Fixed footer 닫기</Button>
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}

import { createFileRoute, useRouter } from '@tanstack/react-router';
import { isEmpty } from 'lodash';
import { SearchAccountPage, FindEmailPage } from '@learnway/auth';

import { pageRouteConfig } from '../../../features/auth';
import { useEffect, useState } from 'react';
import { useCurrentRoute } from '@learnway/hooks';
export const Route = createFileRoute('/_auth/search-password/')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      tabKey: {
        format: 'string',
        default: 'password',
        conditions: [
          {
            fn: (values: any) => !['account', 'password'].includes(values.tabKey),
          },
        ],
      },
      step: {
        format: 'string',
        default: 'email',
      },
    },
    meta: {
      title: 'LABEL.common.searchPassword',
    },
  }),
});

type step = 'email' | 'auth';

function RouteComponent() {
  const { state } = useCurrentRoute(Route);
  const router = useRouter();
  const [step, setStep] = useState<step>(state?.step ?? 'email');

  console.log('state', state);

  useEffect(() => {
    setStep(state.step ?? 'email');
  }, [state.step]);

  return (
    <>
      {step === 'email' && <FindEmailPage route={Route} />}
      {step === 'auth' && <SearchAccountPage route={Route} enableTab={false} hiddenIcon={false} />}
    </>
  );
}

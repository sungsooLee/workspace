import { createFileRoute } from '@tanstack/react-router';

import { isEmpty } from 'lodash';

import { ChangePasswordBySearchAccountPage } from '@learnway/auth';

import { pageRouteConfig } from '../../../features/auth';

export const Route = createFileRoute('/_auth/search-account/change-password')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      authToolType: {
        format: 'string',
        default: 'PHONE',
        conditions: [
          {
            fn: (values: any) => !['PHONE', 'EMAIL'].includes(values.authToolType),
          },
        ],
      },
      phoneNumber: {
        format: 'object',
        required: {
          fn: (data) => {
            return isEmpty(data.phoneNumber) && data.authToolType === 'PHONE';
          },
        },
      },
      email: {
        format: 'email',
        required: {
          fn: (data) => data.authToolType === 'EMAIL',
        },
      },
    },
    meta: {
      title: 'LABEL.common.passwordInput',
    },
  }),
});

function RouteComponent() {
  return <ChangePasswordBySearchAccountPage route={Route} />;
}

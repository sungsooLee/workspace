import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { Tabs, useModal } from '@learnway/ui';
import type { PhoneNumberValue } from '@learnway/ui';
import { cn, z } from '@learnway/shared';

import { AuthForm, AuthFormData, AUTH_TOOL_TYPE, pageRouteConfig } from '../../features/auth';
import { useAsyncFetchEmail } from '../../entities/user';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

export const Route = createFileRoute('/_auth/identity-verification')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  const router = useRouter();
  const { alert } = useModal();

  const [defaultAuthValues, setDefaultAuthValues] = useState<AuthFormData>();

  const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();

  const handleSuccess = (data: any) => {
    router.navigate({ to: '/search-account/change-password', state: { ...data } });
    return;
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div
          className={styles.search_info}
          onClick={() =>
            router.navigate({
              to: '/change-password',
              state: {
                authToolType: 'PHONE',
                name: '아무개',
                birthday: '19781223',
                phoneNumber: '01093432161',
              },
            })
          }>
          {t(`MESSAGE.CAN_CHECK_ACCOUNT_AFTER_VERIFYING`)}
        </div>

        <AuthForm
          defaultValues={defaultAuthValues}
          onSuccess={(data: any) => handleSuccess(data)}
          onCancel={() => handleCancel()}
        />
      </div>
    </div>
  );
}

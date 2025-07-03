import { useEffect, useState } from 'react';
import { useRouter, useMatches } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useCurrentRoute } from '@learnway/hooks';

import { AuthForm, AuthFormData } from '../features/auth';
import { useAsyncFetchEmail } from '../entities';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

export function IdentityVerificationPage({ route }: any) {
  const { t } = useTranslation();

  const router = useRouter();
  const { state } = useCurrentRoute(route);

  const matches = useMatches();

  useEffect(() => {
    matches.map((match: any) => {
      console.log('match', match.route?.id, match.staticData?.meta?.title, match);
    });
  }, []);

  const { alert } = useModal();

  const [defaultAuthValues, setDefaultAuthValues] = useState<AuthFormData>();

  const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();

  const handleSuccess = (data: any) => {
    router.navigate({ to: state.redirectUrl, state: { ...data } });
    return;
  };

  const handleCancel = () => {
    router.history.go(-1);
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div
          className={styles.search_info}
          onClick={() =>
            router.navigate({
              to: state.redirectUrl,
              state: {
                authToolType: 'PHONE',
                name: '아무개',
                birthday: '19781223',
                phoneNumber: '01093432161',
              } as any,
            })
          }
        >
          {t(`LABEL.message.canCheckAccountAfterVerifying`)}
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

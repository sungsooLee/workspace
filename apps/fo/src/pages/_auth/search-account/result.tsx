import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { pageRouteConfig } from '../../../features/auth';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { useCurrentRoute } from '@learnway/hooks';

import { ProccessResult } from '../../../widgets/auth';

import styles from '@learnway/styles/fo/pages/_auth/search-account/result.module.css';

export const Route = createFileRoute('/_auth/search-account/result')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      email: {
        format: 'email',
        required: true,
      },
    },
    meta: {
      title: 'LABEL.ACCOUNT_SEARCH',
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();

  const router = useRouter();
  const { state } = useCurrentRoute(Route);

  const handleGoLogin = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_auth}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        {state?.email ? (
          <ProccessResult
            title={t('MESSAGE.SEARCH_ACCOUNT_RESULT')}
            className={styles.success_info}>
            <div className={styles.result_message}>{state.email}</div>
          </ProccessResult>
        ) : (
          <ProccessResult
            isSuccess={false}
            title={t('MESSAGE.SEARCH_ACCOUNT_RESULT_NOT_FOUND')}
            className={styles.success_info}></ProccessResult>
        )}

        <div className={styles.btn_txt}>
          {isEmpty(state?.email) ? (
            <Link to="/search-account">{t('LABEL.SEARCH_ACCOUNT')}</Link>
          ) : (
            <Link to="/search-account" search={{ tabKey: 'password' }}>
              {t('LABEL.SEARCH_PASSWORD')}
            </Link>
          )}
        </div>

        <div className={`${styles.btn_wrap}`}>
          <Button variant="primary" size="xl" onClick={() => handleGoLogin()}>
            {t('LABEL.LOGIN')}
          </Button>
        </div>
      </div>
    </div>
  );
}

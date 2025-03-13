import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { pageRouteConfig } from '../../../features/auth';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';

import { ProccessResult } from '../../../widgets/auth';
import styles from '@learnway/styles/fo/pages/_auth/search-account/result.module.css';

export const Route = createFileRoute('/_auth/search-account/result')({
  component: RouteComponent,
  ...pageRouteConfig({
    // error 인 경우 throw message
    validate: ({ params, search, state }) => {
      if (!state?.email) {
        //throw '잘못된 접근';
      }
      return;
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();

  const router = useRouter();

  const { state } = Route.useRouteContext();

  const handleGoLogin = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_auth}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        {state.email ? (
          <ProccessResult title={t('MESSAGE.SEARCH_ACCOUNT_RESULT')} className="">
            <div className={styles.result_message}>{state.email}</div>
          </ProccessResult>
        ) : (
          <ProccessResult
            isSuccess={false}
            title={t('MESSAGE.SEARCH_ACCOUNT_RESULT_NOT_FOUND')}></ProccessResult>
        )}

        <div className={styles.btn_txt}>
          {isEmpty(state.email) ? (
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

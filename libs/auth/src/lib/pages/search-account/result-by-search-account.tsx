import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { useCurrentRoute } from '@learnway/hooks';

import { ProccessResult } from '../../shared';

import styles from '@learnway/styles/fo/pages/_auth/search-account/result.module.css';

export function ResultBySearchAccountPage({ route }: any) {
  const { t } = useTranslation();

  const router = useRouter();
  const { state } = useCurrentRoute(route);

  const handleGoLogin = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_auth}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        {state?.email ? (
          <ProccessResult
            title={t('LABEL.message.searchAccountResult')}
            className={styles.success_info}
          >
            <div className={styles.result_message}>{state.email}</div>
          </ProccessResult>
        ) : (
          <ProccessResult
            isSuccess={false}
            title={t('LABEL.message.searchAccountResultNotFound')}
            className={styles.success_info}
          ></ProccessResult>
        )}

        <div className={styles.btn_txt}>
          {isEmpty(state?.email) ? (
            <Link to="/search-account" state={{ tabKey: 'password' } as any}>
              {t('LABEL.common.searchAccount')}
            </Link>
          ) : (
            <Link to="/search-password" state={{ tabKey: 'password' } as any}>
              {t('LABEL.common.searchPassword')}
            </Link>
          )}
        </div>

        <div className={`${styles.btn_wrap}`}>
          <Button variant="primary" size="xl" onClick={() => handleGoLogin()}>
            {t('LABEL.common.login')}
          </Button>
        </div>
      </div>
    </div>
  );
}

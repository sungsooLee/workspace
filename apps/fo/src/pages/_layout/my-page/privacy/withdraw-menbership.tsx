import { useTranslation } from 'react-i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { IcoCaution03 } from '@learnway/icons';
import { Button, Checkbox, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useDeleteUser, useLogoutUser } from '@learnway/auth';

import { MAIN_CONTAINERS } from '../../../../widgets/layout';
import { pageRouteConfig } from '../../../../features/auth';
import { BrowserFooter, MobileResponsiveContainerFooter } from '../../../../shared/m.ui';

import styles from '@learnway/styles/fo/pages/_layout/my-page/privacy/withdraw-menbership.module.css';

export const Route = createFileRoute('/_layout/my-page/privacy/withdraw-menbership')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.WITHDRAW_MEMBERSHIP',
      mobile: { showHeader: false, showFooter: false, showMainFooter: false },
      container: MAIN_CONTAINERS.MY_PAGE,
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  const { alert } = useModal();
  const { remove } = useDeleteUser();
  const { logout } = useLogoutUser();

  const handleWithdrawMembership = () => {
    remove({
      onSuccess: async () => {
        logout();
        await alert({
          title: t('LABEL.ALERT_WITHDRAW_MEMBERSHIP_SUCCESS_TITLE'),
          content: t('LABEL.ALERT_WITHDRAW_MEMBERSHIP_SUCCESS'),
        });
        router.navigate({ to: '/login' });
      },
    });
  };
  return (
    <div className={`${styles.start} ${styles.secession}`}>
      <div className={styles.box}>
        <div className={styles.confirm}>
          <IcoCaution03 width={32} height={32} stroke="#ff4646"></IcoCaution03>
          <p className="whitespace-break-spaces">{t('LABEL.ALERT_WITHDRAW_MEMBERSHIP')}</p>
        </div>

        <div className={styles.bullet_notice}>
          <ul>
            <li>{t('LABEL.CAUTION_WITHDRAW_MEMBERSHIP_01')}</li>
            <li>{t('LABEL.CAUTION_WITHDRAW_MEMBERSHIP_02')}</li>
            <li>{t('LABEL.CAUTION_WITHDRAW_MEMBERSHIP_03')}</li>
          </ul>
          <Checkbox size="lg" label={t('LABEL.AGREE_TO_BE_THE_INSTRUCTIONS')} />
        </div>
      </div>

      <MobileResponsiveContainerFooter>
        <BrowserFooter>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              {t('LABEL.CANCEL')}
            </Button>
            <Button variant="primary" size="xl" onClick={() => handleWithdrawMembership()}>
              {t('LABEL.WITHDRAW_MEMBERSHIP')}
            </Button>
          </div>
        </BrowserFooter>
      </MobileResponsiveContainerFooter>
    </div>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { IcoCaution03 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { useDeleteUser, useLogoutUser } from '@learnway/auth/entities';

import { MAIN_CONTAINERS } from '../../../../widgets/layout';
import { pageRouteConfig } from '../../../../features/auth';
import { BrowserFooter, MobileResponsiveContainerFooter } from '../../../../shared/m.ui';

import styles from '@learnway/styles/fo/pages/_layout/my-page/privacy/withdraw-menbership.module.css';
import { Button } from '@learnway/ui/button';
import { Checkbox } from '@learnway/ui/checkbox';
import { useModal } from '@learnway/ui/modal';

export const Route = createFileRoute('/_layout/my-page/privacy/withdraw-menbership')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.common.withdrawMembership',
      mobile: { showHeader: false, showFooter: false, showMainFooter: false },
      container: MAIN_CONTAINERS.MY_PAGE,
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [agree, setAgree] = useState<boolean>(false);

  const { alert } = useModal();
  const { remove } = useDeleteUser();
  const { logout } = useLogoutUser();

  const handleWithdrawMembership = () => {
    if (!agree) {
      return;
    }

    remove({
      onSuccess: async () => {
        logout();
        await alert({
          title: t('LABEL.messages.alertWithdrawMembershipSuccessTitle'),
          content: t('LABEL.messages.alertWithdrawMembershipSuccess'),
        });
        router.navigate({ to: '/login' });
      },
    });
  };

  const handleCancel = () => {
    router.navigate({ to: '/my-page/privacy' });
  };

  return (
    <div className={`${styles.start} ${styles.secession}`}>
      <div className={styles.box}>
        <div className={styles.confirm}>
          <IcoCaution03 width={32} height={32} stroke="#ff4646"></IcoCaution03>
          <p className="whitespace-break-spaces">{t('LABEL.messages.alertWithdrawMembership')}</p>
        </div>

        <div className={styles.bullet_notice}>
          <ul>
            <li>{t('LABEL.messages.cautionWithdrawMembership01')}</li>
            <li>{t('LABEL.messages.cautionWithdrawMembership02')}</li>
            <li>{t('LABEL.messages.cautionWithdrawMembership03')}</li>
          </ul>
          <Checkbox
            size="lg"
            label={t('LABEL.messages.agreeToBeTheInstructions')}
            onCheckedChange={(checked: boolean) => setAgree(checked)}
          />
        </div>
      </div>

      <MobileResponsiveContainerFooter className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
        <BrowserFooter>
          <Button variant="gray" size="xl" onClick={() => handleCancel()}>
            {t('LABEL.common.cancel')}
          </Button>
          <Button variant="primary" size="xl" onClick={() => handleWithdrawMembership()}>
            {t('LABEL.common.withdrawMembership')}
          </Button>
        </BrowserFooter>
      </MobileResponsiveContainerFooter>
    </div>
  );
}

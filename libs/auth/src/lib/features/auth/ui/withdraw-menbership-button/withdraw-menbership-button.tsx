import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@learnway/ui/button';

//interface WithdrawMembershipButtonComponentProps {}

function WithdrawMembershipButtonComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleWithdrawMembership = () => {
    router.navigate({ to: '/my-page/privacy/withdraw-menbership' });
  };

  return (
    <Button variant="gray" size="sm" onClick={() => handleWithdrawMembership()}>
      {t('LABEL.common.withdrawMembership')}
    </Button>
  );
}

export const WithdrawMembershipButton = WithdrawMembershipButtonComponent;

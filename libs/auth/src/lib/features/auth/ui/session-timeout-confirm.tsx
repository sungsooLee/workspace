import { useTranslation } from 'react-i18next';

import { useModal } from '@learnway/ui';
import { useLoginTimerDisplay } from '../../../entities';

function SessionTimeoutConfirmComponent() {
  const { close } = useModal();
  const { t } = useTranslation();
  const { time } = useLoginTimerDisplay();

  return (
    <>
      <p className="whitespace-break-spaces">{t('LABEL.messages.sessionExtensionConfirm')}</p>
      <div className="time">
        {t('LABEL.common.remainingTime')} : <strong>{time}</strong>
      </div>
    </>
  );
}

export const SessionTimeoutConfirm = SessionTimeoutConfirmComponent;

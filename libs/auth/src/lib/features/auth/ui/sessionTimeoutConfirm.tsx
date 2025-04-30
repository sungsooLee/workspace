import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { duration, DATE_TIME_FORMAT } from '@learnway/shared';
import { useModal } from '@learnway/ui';
import { SESSION_TIMEOUT_EXTENSION_ALERT_DURATION } from '../const/auth.constant';

const TIME_LIMIT_VERIFY = SESSION_TIMEOUT_EXTENSION_ALERT_DURATION / 1000;

function SessionTimeoutConfirmComponent() {
  const { close } = useModal();
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(TIME_LIMIT_VERIFY);

  const timerText = duration({ seconds }, DATE_TIME_FORMAT.MIN_SEC).toString();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // 0이 되면 타이머 멈춤
          close();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p className="whitespace-break-spaces">{t('LABEL.message.sessionExtensionConfirm')}</p>
      <div className="time">
        {t('LABEL.common.remainingTime')} : <strong>{timerText}</strong>
      </div>
    </>
  );
}

export const SessionTimeoutConfirm = SessionTimeoutConfirmComponent;

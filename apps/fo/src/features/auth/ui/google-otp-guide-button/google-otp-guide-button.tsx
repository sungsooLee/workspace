import { useTranslation } from 'react-i18next';
import { cn } from '@learnway/shared';
import { Button, useModal } from '@learnway/ui';

import { GoogleOtpGuideModal } from './google-otp-guide-modal';
import styles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css';

//interface GoogleOtpGuideButtonComponentProps {}

function GoogleOtpGuideButtonComponent() {
  const { t } = useTranslation();
  const { open: openModal } = useModal();

  return (
    <Button
      className={cn(styles.link, 'auth--otp-guide-link')}
      onClick={() =>
        openModal({
          width: 'sm',
          content: <GoogleOtpGuideModal />,
        })
      }
    >
      {t('LABEL.common.googleAuthGuide')}
    </Button>
  );
}

export const GoogleOtpGuideButton = GoogleOtpGuideButtonComponent;

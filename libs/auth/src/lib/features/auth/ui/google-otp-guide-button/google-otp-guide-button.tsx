import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { useTranslation } from 'react-i18next';

import { useModal } from '@learnway/ui/modal';

import styles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css';
import { GoogleOtpGuideModal } from './google-otp-guide-modal';

//interface GoogleOtpGuideButtonComponentProps {}

function GoogleOtpGuideButtonComponent() {
  const { t } = useTranslation();
  const { openModal } = useModal();

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

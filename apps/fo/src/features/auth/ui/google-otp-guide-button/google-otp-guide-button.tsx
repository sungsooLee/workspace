import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { IcoCaution } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { useModal, Button } from '@learnway/ui';

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
          title: 'FIDO 인증',
          width: 'sm',
          content: <GoogleOtpGuideModal />,
          footer: false,
        })
      }>
      구글 OTP 인증 가이드
    </Button>
  );
}

export const GoogleOtpGuideButton = GoogleOtpGuideButtonComponent;

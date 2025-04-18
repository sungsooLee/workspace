import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { IcoCaution } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { useModal, Button } from '@learnway/ui';

import styles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide.module.css';

function GoogleOtpGuideModalComponent() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.google_cert_guide_popup}`}>
      <div className={styles.guide_list}>
        <div className={styles.list_box}>
          <h3>1.구글 OTP(Google Authenticator) 앱을 휴대폰에 설치해 주세요.</h3>
          <ul className={styles.info_list}>
            <li>구글 OTP 앱 소개 PC 화면(휴대폰에 앱 설치 필수)</li>
          </ul>
          <div className={styles.btn_box}>
            <Button variant="gray" size="sm">
              AOS 다운로드
            </Button>{' '}
            <Button variant="gray" size="sm">
              IOS 다운로드
            </Button>
          </div>
        </div>

        <div className={styles.list_box}>
          <h3>2.러닝웨이 구글 OTP 계정을 생성해 주세요.</h3>
          <ul className={styles.info_list}>
            <li>PC에서 QR코드로 인증키 생성 버튼을 클릭하면 QR 코드가 생성됩니다.</li>
          </ul>
          <div className={styles.guide_img_box}></div>
        </div>
      </div>
    </div>
  );
}

export const GoogleOtpGuideModal = GoogleOtpGuideModalComponent;

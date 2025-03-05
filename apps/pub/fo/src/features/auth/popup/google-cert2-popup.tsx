import { memo } from 'react';
import styles from './google-cert2-popup.module.css';
import signupStyles from '../../../pages/_auth/signup.module.css';
import { IcoCaution } from '@learnway/icons';

import { Button } from '@learnway/ui';

const GoogleCert2PopupCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.google_cert_popup}`}>
      <div className={styles.otp_key}>
        <span className={styles.txt}>구글 OTP 설정 키</span>
        <div className={styles.key}>aqwe fder dfdg 4dfd dfdf 3a4g 6ki7 6hj9</div>
      </div>
      <div className={styles.txt_info}>구글 OTP 앱을 설치하고 QR 코드를 스캔해 주세요.</div>
      <div className={signupStyles.noti_info_txt}>
        <Button className={signupStyles.btn_txt}>QR코드 스캔</Button>
      </div>
      <div className={signupStyles.signup_noti}>
        <dl className={signupStyles.check_point}>
          <dt>
            <IcoCaution width={16} height={16} stroke="#6F798B" />
            유의사항
          </dt>
          <dd>구글 OTP 앱에서 +를 탭하고 QR코드 스캔을 선택해 주세요.</dd>
          <dd>QR코드 스캔 후 다음 버튼을 클릭해 주세요.</dd>
        </dl>
      </div>
    </div>
  );
};

export const GoogleCert2Popup = memo(GoogleCert2PopupCompoment);

import { memo } from 'react';

import styles from './google-cert1-popup.module.css';
import signupStyles from '../../../pages/_auth/signup.module.css';
import { IcoCaution } from '@learnway/icons';
import imgQrcode from '../../../assets/images/temp/img_qrcode.png';
import { Button, useModal } from '@learnway/ui';
import { GoogleCert2Popup } from '../../../features/auth';

const GoogleCert1PopupCompoment = () => {
  const { open: openModal } = useModal();
  const { close: closeModal } = useModal();
  return (
    <div className={`${styles.start} ${styles.google_cert_popup}`}>
      <figure className={styles.qrcode}>
        <img src={imgQrcode} alt="qrcode" />
      </figure>
      <div className={styles.txt_info}>구글 OTP 앱을 설치하고 QR 코드를 스캔해 주세요.</div>
      <div className={signupStyles.noti_info_txt}>
        <Button
          className={signupStyles.btn_txt}
          onClick={() => {
            closeModal(); // 모달 닫기 함수 호출
            openModal({
              title: '구글 OTP 인증키 생성',
              width: 'sm',
              content: <GoogleCert2Popup />,
              footer: true,
            });
          }}>
          스캔할 수 없나요?
        </Button>
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

export const GoogleCert1Popup = memo(GoogleCert1PopupCompoment);

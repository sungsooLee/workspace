import { memo } from 'react';

import styles from './google-qrcode-popup.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { IcoCaution } from '@learnway/icons';
import imgQrcode from '../../../assets/images/temp/img_qrcode.png';
import { Button, useModal } from '@learnway/ui';
import { GoogleInputPopup, GoogleKeyPopup } from '../../../features/auth';

const CustomFooter = () => {
  const { close: closeModal } = useModal();
  const { open: openModal } = useModal();
  return (
    <>
      <Button variant="gray" size="lg" onClick={() => closeModal()}>
        취소
      </Button>
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          closeModal(); // 모달 닫기 함수 호출
          setTimeout(() => {
            openModal({
              title: '구글 OTP 인증키 생성',
              width: 'sm',
              content: <GoogleInputPopup />,
            });
          });
        }}>
        다음
      </Button>
    </>
  );
};

const GoogleQrcodePopupCompoment = () => {
  const { open: openModal } = useModal();
  const { close: closeModal } = useModal();
  return (
    <div className={`${styles.start} ${styles.google_qrcode_popup}`}>
      <figure className={styles.qrcode}>
        <img src={imgQrcode} alt="qrcode" />
      </figure>
      <div className={styles.txt_info}>구글 OTP 앱을 설치하고 QR 코드를 스캔해 주세요.</div>
      <div className={styles.noti_info_txt}>
        <Button
          className={styles.btn_txt}
          onClick={() => {
            closeModal(); // 모달 닫기 함수 호출
            setTimeout(() => {
              openModal({
                title: '구글 OTP 인증키 생성',
                width: 'sm',
                content: <GoogleKeyPopup />,
              });
            });
          }}>
          스캔할 수 없나요?
        </Button>
      </div>
      <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
        <dl className={noticeBoxStyles.check_point}>
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

export const GoogleQrcodePopup = memo(GoogleQrcodePopupCompoment);

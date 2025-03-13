import { memo } from 'react';
import styles from './google-key-popup.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { IcoCaution } from '@learnway/icons';
import { GoogleQrcodePopup, GoogleInputPopup } from '../../../features/auth';
import { Button, useModal } from '@learnway/ui';

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
              footer: true,
            });
          });
        }}>
        다음
      </Button>
    </>
  );
};

const GoogleKeyPopupCompoment = () => {
  const { open: openModal } = useModal();
  const { close: closeModal } = useModal();
  return (
    <div className={`${styles.start} ${styles.google_key_popup}`}>
      <div className={styles.otp_key}>
        <span className={styles.txt}>구글 OTP 설정 키</span>
        <div className={styles.key}>aqwe fder dfdg 4dfd dfdf 3a4g 6ki7 6hj9</div>
      </div>
      <div className={styles.txt_info}>구글 OTP 앱을 설치하고 QR 코드를 스캔해 주세요.</div>
      <div className={styles.noti_info_txt}>
        <Button
          className={styles.btn_txt}
          onClick={() => {
            closeModal(); // 모달 닫기 함수 호출
            openModal({
              title: '구글 OTP 인증키 생성',
              width: 'sm',
              content: <GoogleQrcodePopup />,
              footer: <CustomFooter />,
            });
          }}>
          QR코드 스캔
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

export const GoogleKeyPopup = memo(GoogleKeyPopupCompoment);

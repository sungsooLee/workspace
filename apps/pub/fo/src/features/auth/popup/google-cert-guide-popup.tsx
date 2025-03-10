import { memo } from 'react';
import { cn } from '@learnway/shared';
import styles from './google-cert-guide-popup.module.css';

const GoogleCertGuidePopupCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.mpass_popup}`}>
      <div className={styles.title_box}>
        <h3 className={styles.tit}>현재 본인 확인이 진행 중입니다.</h3>
        <p className={styles.txt}>모바일 MPASS 앱에서 인증을 진행해 주세요</p>
      </div>
    </div>
  );
};

export const GoogleCertGuidePopup = memo(GoogleCertGuidePopupCompoment);

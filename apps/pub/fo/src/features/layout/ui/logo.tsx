import { memo } from 'react';
import { Link } from '@tanstack/react-router';
//import styles from './logo.module.css';
import logoImage from '@learnway/styles/fo/assets/images/logo_auth.png';
import mIogoImage from '@learnway/styles/fo/assets/images/m_logo.png';

import styles from '@learnway/styles/fo/features/layout/ui/logo.module.css';
import { isMobile } from 'react-device-detect';

const LogoCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.logo}`}>
      <Link to={'/'}>
        {/* 퍼블수정 20250321 : pc, mo 분기처리 */}
        {isMobile ? <img src={mIogoImage} alt="Logo" /> : <img src={logoImage} alt="Logo" />}
      </Link>
    </div>
  );
};

export const Logo = memo(LogoCompoment);

import { Link } from '@tanstack/react-router';
import { memo } from 'react';
//import styles from './logo.module.css';
import logoImage from '@learnway/styles/fo/assets/images/logo.png';

import styles from '@learnway/styles/fo/features/layout/ui/logo.module.css';

const LogoCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.logo}`}>
      <Link to={'/'}>
        {/* 퍼블수정 20250731 : 수정 */}
        <img src={logoImage} alt="Logo" />
      </Link>
    </div>
  );
};

export const Logo = memo(LogoCompoment);

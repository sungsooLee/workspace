import { Link } from '@tanstack/react-router';
import { memo } from 'react';

// import logoImage from '@assets/images/logo.png';
import logoImage from '@learnway/styles/fo/assets/images/logo.png';

import { Tenant } from '@types';

import styles from '@learnway/styles/fo/features/layout/ui/logo.module.css';

interface LogoComponentProps {
  activeTenant?: Tenant | null;
}

/**
 * @description FO GNB 로고 FO_GNB_1000 / FO_GNB_MA_1000
 */
const LogoComponent = ({ activeTenant }: LogoComponentProps) => {
  return (
    <div className={`${styles.start} ${styles.logo}`}>
      <Link to={'/'}>
        {/* 퍼블수정 20250731 : 수정 */}
        <img src={logoImage} alt="Logo" />
      </Link>
    </div>
    // 테넌트의 로고 >> 사이트의 로고로 변경
    // <div className={`${styles.start} ${styles.logo}`}>
    //   <Link to={'/'}>
    //     {(activeTenant?.logoImageUrl && (
    //       <img src={getFullImagePath(activeTenant?.logoImageUrl)} title={activeTenant.tenantName} />
    //     )) ??
    //       activeTenant?.tenantName}
    //     {/* {activeTenant.} */}
    //     {/* <div className="min-w-[100px] cursor-pointer">{activeTenant?.name || '로고'}</div> */}
    //   </Link>
    // </div>
  );
};

export const Logo = memo(LogoComponent);

import { Link } from '@tanstack/react-router';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';

import { getFullImagePath } from '@learnway/shared';

import logoImage from '@assets/images/logo.png';
import mIogoImage from '@assets/images/m_logo.png';
import { Tenant } from '@types';

import styles from '@learnway/styles/fo/features/layout/ui/logo.module.css';

interface LogoComponentProps {
  activeTenant?: Tenant | null;
}

const LogoComponent = ({ activeTenant }: LogoComponentProps) => {
  if (!activeTenant) {
    return (
      <div className={`${styles.start} ${styles.logo}`}>
        <Link to={'/'}>
          {isMobile ? <img src={mIogoImage} alt="Logo" /> : <img src={logoImage} alt="Logo" />}
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.start} ${styles.logo}`}>
      <Link to={'/'}>
        {(activeTenant?.logoImageUrl && (
          <img src={getFullImagePath(activeTenant?.logoImageUrl)} title={activeTenant.tenantName} />
        )) ??
          activeTenant?.tenantName}
        {/* {activeTenant.} */}
        {/* <div className="min-w-[100px] cursor-pointer">{activeTenant?.name || '로고'}</div> */}
      </Link>
    </div>
  );
};

export const Logo = memo(LogoComponent);

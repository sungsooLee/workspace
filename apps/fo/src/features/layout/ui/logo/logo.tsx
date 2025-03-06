import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { Tenant } from '../../../../entities/tenant';
import logoImage from '../../../../assets/images/logo.png';

import styles from './logo.module.css';

interface LogoComponentProps {
  activeTenant?: Tenant | null;
}

const LogoComponent = ({ activeTenant }: LogoComponentProps) => {
  if (!activeTenant) {
    return (
      <div className={`${styles.start} ${styles.logo}`}>
        <Link to={'/'}>
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.start} ${styles.logo}`}>
      <Link to={'/'}>
        {(activeTenant?.logoImageUrl && (
          <img src={activeTenant?.logoImageUrl} title={activeTenant.name} className="h-16" />
        )) ??
          activeTenant?.name}
        {/* {activeTenant.} */}
        {/* <div className="min-w-[100px] cursor-pointer">{activeTenant?.name || '로고'}</div> */}
      </Link>
    </div>
  );
};

export const Logo = memo(LogoComponent);

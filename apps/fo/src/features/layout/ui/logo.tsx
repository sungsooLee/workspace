import { memo } from 'react';

import { useAuth, useFetchAuthUser } from '../../../entities/user';
import { Tenant, useFetchTenant } from '../../../entities/tenant';
import { Link } from '@tanstack/react-router';
import styles from './logo.module.css';

interface LogoComponentProps {
  activeTenant: Tenant | null;
}

const LogoComponent = ({ activeTenant }: LogoComponentProps) => {
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

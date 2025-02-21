import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import { useFetchAuthUser } from '../../../../entities/auth';
import { useFetchTenant } from '../../../../entities/tenant';

import logoImage from '../../../../assets/images/logo.png';
import logoAuthImage from '../../../../assets/images/logo_auth.png';
import styles from './logo.module.css';

interface LogoComponentProp {
  className?: string;
  theme?: 'login' | 'main';
}

const LogoCompoment = ({ theme = 'main', className }: LogoComponentProp) => {
  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);

  return (
    <div className={cn(styles.start, 'nlp--logo', className)}>
      <Link to={'/'}>
        {/*(tenant?.logoImageUrl && <img src={logoImage} alt="Logo" />) ?? tenant?.name*/}
        <img src={theme === 'main' ? logoImage : logoAuthImage} alt="Logo" />
      </Link>
    </div>
  );
};

export const Logo = memo(LogoCompoment);

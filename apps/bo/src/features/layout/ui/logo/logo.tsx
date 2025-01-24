import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { useFetchAuthUser } from '../../../../entities/user';
import { useFetchTenant } from '../../../../entities/tenant';

import logoImage from '../../../../assets/images/logo.png';
import styles from './logo.module.css';

const LogoCompoment = () => {
  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);

  return (
    <div className={`${styles.start} nlp--logo`}>
      <Link
        to={'/learning/$id/video'}
        params={{ id: 'ddfeeeer' }}
        search={{ page: 2, filter: '', sort: 'oldest' }}>
        {/*(tenant?.logoImageUrl && <img src={logoImage} alt="Logo" />) ?? tenant?.name*/},
        <img src={logoImage} alt="Logo" />
      </Link>
      <Link to={'/learning/$id/video'} params={{ id: 'ddfeeeer' }}>
        ddd
      </Link>
    </div>
  );
};

export const Logo = memo(LogoCompoment);

import { memo, useCallback, useEffect, useState } from 'react';

import { cookieService } from '@learnway/shared';
import { useFetchAuthUser } from '@learnway/config';

import { Search, Logo, UserAvatar } from '../../../../../features/layout';
import {
  Language,
  NotificationButton,
  TenantButton,
  AdminLink,
} from '../../../../../features/platform';
import { useFetchTenantByUser } from '../../../../../entities/tenant';

import { Tenant } from '../../../../../types';

import { NavigateHover } from './navigate/navigate-hover';
import { SessionTimer } from '../../../../../features/platform/ui/sessionTimer';

import { Navigate } from './navigate/navigate';
import styles from './header.module.css';
import { CategoryButton } from '../../../../../features/category';

function HeaderComponent() {
  const { data: authUser } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(authUser?.userTsid);
  const [isHoverNavigate, setIsHoverNavigate] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [activeTenant, setActiveTenant] = useState<Tenant | null>(() => {
    const storedTenant = sessionStorage.getItem('ACTIVE_TENANT');
    return storedTenant ? JSON.parse(storedTenant) : null;
  });

  useEffect(() => {
    if (!activeTenant && tenants?.length) {
      const tenantNo = cookieService.get('LOGIN_TENANT_ID');
      const tenant = tenants.find((t) => t.tenantNo.toString() === tenantNo) || tenants[0];
      setActiveTenant(tenant);
      sessionStorage.setItem('ACTIVE_TENANT', JSON.stringify(tenant));
    }
  }, [tenants, activeTenant]);

  const handleTenantSwitch = useCallback((tenant: Tenant) => {
    setActiveTenant(tenant);
    sessionStorage.setItem('ACTIVE_TENANT', JSON.stringify(tenant));
    window.location.reload();
  }, []);

  const handleMouseEnter = () => {
    if (isCategoryOpen) {
      setIsCategoryOpen(false);
    }
    setIsHoverNavigate(true);
  };
  const handleMouseLeave = () => {
    setIsHoverNavigate(false);
  };
  const handleCategoryOpen = (isOpen: boolean) => {
    if (isOpen && isHoverNavigate) {
      setIsHoverNavigate(false);
    }
    setIsCategoryOpen(isOpen);
  };
  const handleNavigateHoverClose = () => {
    if (isHoverNavigate) {
      setIsHoverNavigate(false);
    }
  };

  return (
    <div className={`${styles.start} ${styles.header}`}>
      {/* <SessionTimer /> */}
      <header className={styles.header_area}>
        <div className={styles.top_area}>
          <div className={styles.logo_inner}>
            <h1>
              <Logo activeTenant={activeTenant} />
            </h1>

            <TenantButton />
          </div>

          <div className={styles.search_form}>
            <Search />
          </div>

          <div className={styles.util}>
            <AdminLink />
            <Language />
            <NotificationButton userUUID={authUser?.userId} />
            <UserAvatar />
          </div>
        </div>

        <div className={styles.nav_container} onMouseLeave={handleMouseLeave}>
          <div className={styles.nav_area}>
            <CategoryButton onOpenChange={handleCategoryOpen} isOpen={isCategoryOpen} />
            <Navigate onMouseEnter={handleMouseEnter} />
          </div>
          {isHoverNavigate && (
            <NavigateHover isOpen={isHoverNavigate} onClose={handleNavigateHoverClose} />
          )}
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);

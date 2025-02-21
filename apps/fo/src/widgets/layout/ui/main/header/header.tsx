import { memo, useCallback, useEffect, useState } from 'react';

import { cookieService } from '@learnway/shared';

import { Category, Search, Logo, UserAvatar } from '../../../../../features/layout';
import { Language, Notification, Tenants, AdminLink } from '../../../../../features/platform';
import { useFetchAuthUser } from '../../../../../entities/auth';
import { Tenant, useFetchTenantByUser } from '../../../../../entities/tenant';

import { NavigateHover } from './navigate/navigate-hover';
import { SessionTimer } from '../../../../../features/platform/ui/sessionTimer';

import { Navigate } from './navigate/navigate';
import styles from './header.module.css';

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
      const tenantId = cookieService.get('LOGIN_TENANT_ID');
      const tenant = tenants.find((t) => t.id.toString() === tenantId) || tenants[0];
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

            <Tenants
              tenants={tenants || []}
              activeTenant={activeTenant}
              onTenantSwitch={handleTenantSwitch}
            />
          </div>

          <div className={styles.search_form}>
            <Search />
          </div>

          <div className={styles.util}>
            <AdminLink />
            <Language />
            <Notification userUUID={authUser?.userId} />
            <UserAvatar />
          </div>
        </div>

        <div className={styles.nav_container} onMouseLeave={handleMouseLeave}>
          <div className={styles.nav_area}>
            <Category onOpenChange={handleCategoryOpen} isOpen={isCategoryOpen} />
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

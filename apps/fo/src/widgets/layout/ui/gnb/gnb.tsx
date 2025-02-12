import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Category,
  Search,
  Logo,
  Notification,
  Tenants,
  AdminLink,
} from '../../../../features/layout';
import { Navigate } from './navigate/navigate';
import { Language } from '../../../../features/layout/ui/language';
import { UserAvatar } from '../../../../features/layout/ui/user-avatar';
import { cookieService } from '@learnway/shared';
import { useFetchAuthUser } from '../../../../entities/user';
import { Tenant, useFetchTenantByUser } from '../../../../entities/tenant';
import styles from './gnb.module.css';
import { NavigateHover } from './navigate/navigate-hover';
import { useLoginTimeout } from '../../service/loginTimeout.hooks';
import { SessionTimer } from '../../../../features/system/ui/sessionTimer';

function GNBComponent() {
  const { data: userData } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(userData?.accountId);
  const [isHoverNavigate, setIsHoverNavigate] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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
            <Notification userUUID={userData?.accountId} />
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

export const GNB = memo(GNBComponent);

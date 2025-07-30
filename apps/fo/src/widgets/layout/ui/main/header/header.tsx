import { memo, useState } from 'react';

import { useFetchTenantByUser } from '@entities/tenant';
import { CategoryButton } from '@features/category';
import { History, Logo, Search, UserAvatar } from '@features/layout';
import { NotificationButton, TenantButton } from '@features/platform';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Menu } from '@learnway/auth/types';
import { Tenant } from '@types';
import { Navigate } from './navigate/navigate';
import { NavigateHover } from './navigate/navigate-hover';

import styles from './header.module.css';

function HeaderComponent() {
  const { data: authUser } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(authUser?.userId);

  const [hoverMenu, setHoverMenu] = useState<Menu | null>(null);
  const [isHoverNavigate, setIsHoverNavigate] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [activeTenant, setActiveTenant] = useState<Tenant | null>(() => {
    const storedTenant = sessionStorage.getItem('ACTIVE_TENANT');
    return storedTenant ? JSON.parse(storedTenant) : null;
  });
  /*
  useEffect(() => {
    if (!activeTenant && tenants?.length) {
      const tenantId = cookieService.get('LOGIN_TENANT_ID');
      const tenant = tenants.find((t) => t.tenantId.toString() === tenantId) || tenants[0];
      setActiveTenant(tenant);
      sessionStorage.setItem('ACTIVE_TENANT', JSON.stringify(tenant));
    }
  }, [tenants, activeTenant]);

  const handleTenantSwitch = useCallback((tenant: Tenant) => {
    setActiveTenant(tenant);
    sessionStorage.setItem('ACTIVE_TENANT', JSON.stringify(tenant));
    window.location.reload();
  }, []);
*/

  // 마우스 오버시 메뉴 저장
  const handleMouseEnter = (menu: Menu) => {
    setHoverMenu(menu);
    if (isCategoryOpen) {
      setIsCategoryOpen(false);
    }
    setIsHoverNavigate(true);
  };

  // 마우스 리브시 메뉴 삭제
  const handleMouseLeave = () => {
    setHoverMenu(null);
    setIsHoverNavigate(false);
  };

  // 카테고리 뷰 열림 설정
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
            <div className={styles.tenant}>
              <TenantButton />
            </div>
          </div>

          <div className={styles.nav_container} onMouseLeave={handleMouseLeave}>
            <div className={styles.nav_area}>
              <CategoryButton tenantId={authUser?.activeTenant?.tenantId} />
              <Navigate onMouseEnter={handleMouseEnter} hoverMenu={hoverMenu} />
            </div>

            {isHoverNavigate && hoverMenu && (
              <NavigateHover
                isOpen={isHoverNavigate}
                onClose={handleNavigateHoverClose}
                hoverMenu={hoverMenu}
              />
            )}
          </div>

          <div className={styles.search_form}>
            <Search />
          </div>

          <div className={styles.util}>
            {/* <AdminLink /> */}
            {/* <Language /> */}
            <NotificationButton userUUID={authUser?.userId} />
            <History />
            <UserAvatar />
          </div>
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);

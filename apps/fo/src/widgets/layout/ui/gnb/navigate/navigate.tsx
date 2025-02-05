import { memo, useRef, useState } from 'react';
import { useMenuHierarchy } from '../../../service/menu.service';
import { Menu } from '../../../../../types';
import { Link, useMatchRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useActiveMenuDepthState } from '../../../../../features/layout';
import { IcoArrowForward } from '@learnway/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './navigate.module.css';

interface LayerProps {
  menus: Menu[];
  isVisible: boolean;
}

// 2Depth 레이어 컴포넌트
const MenuLayer = memo(({ menus, isVisible }: LayerProps) => {
  const router = useRouter();
  const matchRoute = useMatchRoute();
  const [activeMenuDepthMenu] = useActiveMenuDepthState();
  if (!isVisible) return null;

  const handleMenuClick = (childMenu: Menu) => {
    router.navigate({ to: childMenu.path });
  };

  return (
    <div className={styles._start}>
      <div className="flex">
        {menus.map((menu, index) => (
          <div key={`submenu-${index}`} className="flex flex-col">
            {menu.children?.map((subMenu, idx) => (
              <button
                key={`submenu-${idx}`}
                className={`${styles.menuTitle} ${
                  subMenu.path &&
                  (matchRoute({ to: subMenu.path }) ||
                    activeMenuDepthMenu?.[0]?.path === subMenu.path)
                    ? styles._active
                    : ''
                }`}
                onClick={() => {
                  handleMenuClick(subMenu);
                }}>
                {subMenu.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

function NavigateComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const { data: menus } = useMenuHierarchy();
  const location = useRouterState();
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isActiveMenu = (menu: Menu) => {
    const isActive = location.location.pathname.startsWith(menu.path);
    const hasActiveChild = menu.children?.some(
      (child) => location.location.pathname === child.path,
    );
    return isActive || hasActiveChild;
  };

  return (
    <div className={`${styles.start} ${styles.navigate}`}>
      <nav className={styles.nav} onMouseLeave={handleMouseLeave}>
        {/* <ul onMouseEnter={handleMouseEnter}>
          {menus?.map((menu: Menu) => (
            <li key={menu.id}>
              {menu.title}
            </li>
          ))}
        </ul> */}
        <Swiper
          ref={swiperRef}
          spaceBetween={48}
          slidesPerView="auto"
          loop={false}
          modules={[Navigation]}
          className={styles.gnb_swiper}>
          {menus.map((menu, index) => (
            <SwiperSlide
              key={index}
              // className={`${styles.slide} ${gnb.hasDivision ? styles.division : ''}`}
              className={`${styles.slide}`}>
              {/* {menu.title} */}
              <Link to={'/'}>{menu.title}</Link>
              {/* 라벨 표시 */}
              {/* {gnb.isLabel && <span className={`${styles.label} ${styles.color1}`}>마감임박</span>} */}
            </SwiperSlide>
          ))}
        </Swiper>
        <div ref={prevRef} className={styles.gnb_button_prev}>
          <div className={styles.btn}>
            <IcoArrowForward width={16} height={16} stroke="#6F798B" />
          </div>
        </div>
        <div ref={nextRef} className={styles.gnb_button_next}>
          <div className={styles.btn}>
            <IcoArrowForward width={16} height={16} stroke="#6F798B" />
          </div>
        </div>
        <MenuLayer menus={menus} isVisible={isHovered} />
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);

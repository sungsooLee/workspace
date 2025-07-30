import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from 'swiper/modules';

import { IcoArrow } from '@learnway/icons';
import { Link, useRouterState } from '@tanstack/react-router';

// import { useMenuHierarchy } from '@entities/menu';

import { useMenuHierarchy } from '@learnway/auth/entities';
import { Menu } from '@learnway/auth/types';
import { Carousel } from '@learnway/ui';
import styles from './navigate.module.css';

interface NavigateComponentProps {
  onMouseEnter?: (menu: Menu) => void;
  hoverMenu: Menu | null;
}

interface GNBMenu extends Menu {
  isEvent: boolean;
}

function NavigateComponent({ onMouseEnter, hoverMenu }: NavigateComponentProps) {
  const { t } = useTranslation();
  const { data } = useMenuHierarchy('FO');
  const location = useRouterState();
  // const prevRef = useRef<HTMLDivElement | null>(null);
  // const nextRef = useRef<HTMLDivElement | null>(null);
  // const swiperRef = useRef<any>(null);

  // useEffect(() => {
  //   if (swiperRef.current && prevRef.current && nextRef.current) {
  //     const swiperInstance = swiperRef.current.swiper;
  //     swiperInstance.params.navigation.prevEl = prevRef.current;
  //     swiperInstance.params.navigation.nextEl = nextRef.current;
  //     swiperInstance.navigation.init();
  //     swiperInstance.navigation.update();
  //   }
  // }, []);

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600); // 600px 미만이면 모바일로 인식
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEnter = (item: Menu) => {
    onMouseEnter?.(item);
  };

  const menuList: GNBMenu[] = useMemo(() => {
    const menu = data?.menus.map((item) => {
      return {
        ...item,
        isEvent: false,
      };
    });
    const eventMenu = data?.eventMenus?.map((item, index) => {
      return {
        ...item,
        isEvent: true,
      };
    });
    return [...menu, ...eventMenu];
  }, [data]);

  return (
    <div className={`${styles.start} ${styles.navigate}`}>
      <nav className={styles.nav}>
        {menuList && menuList.length > 0 && (
          <Carousel
            items={menuList.map((item, index) => (
              <div key={index} className={item.isEvent ? styles.event_menu : ''}>
                <Link
                  to={item.path}
                  onMouseEnter={() => handleEnter(item)}
                  className={hoverMenu?.menuId === item.menuId ? styles.active : ''}
                >
                  <span>{t(item.menuCode)}</span>
                </Link>
                {/* {item.isLabel && <span className={`${styles.label} ${styles.color1}`}>마감임박</span>} */}
              </div>
            ))}
            slidesPerView="auto"
            spaceBetween={32}
            loop={false}
            modules={[Navigation]}
            simulateTouch={isMobile}
            allowTouchMove={isMobile}
            showNavigation={true}
            className={styles.gnb_swiper}
            prevIcon={<IcoArrow className={`${styles.ico} ${styles.prev}`} />}
            nextIcon={<IcoArrow className={`${styles.ico} ${styles.next}`} />}
          />
        )}
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);

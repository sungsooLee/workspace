import { memo, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Link, useMatchRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';

import { useMenuHierarchy } from '../../../../service/menu.service';

import styles from './navigate.module.css';

interface NavigateComponentProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function NavigateComponent({ onMouseEnter, onMouseLeave }: NavigateComponentProps) {
  const { data: menus } = useMenuHierarchy();
  const location = useRouterState();
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600); // 600px 미만이면 모바일로 인식
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${styles.start} ${styles.navigate}`}>
      <nav className={styles.nav} onMouseLeave={onMouseLeave}>
        <Swiper
          ref={swiperRef}
          spaceBetween={48}
          slidesPerView="auto"
          loop={false}
          modules={[Navigation]}
          simulateTouch={isMobile}
          allowTouchMove={isMobile}
          className={styles.gnb_swiper}>
          {menus.map((menu, index) => (
            <SwiperSlide
              key={index}
              // className={`${styles.slide} ${gnb.hasDivision ? styles.division : ''}`}
              className={`${styles.slide}`}>
              <Link
                to={'/'}
                onMouseEnter={onMouseEnter}
                onClick={(e) => e.preventDefault()}
                preload={false}>
                {menu.title}
              </Link>
              {/* 라벨 표시 */}
              {/* <span className={`${styles.label} ${styles.color1}`}>마감임박</span>} */}
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
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);

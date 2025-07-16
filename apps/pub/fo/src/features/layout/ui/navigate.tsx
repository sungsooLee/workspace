import { cn } from '@learnway/shared';
import { memo, useRef, useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './navigate.module.css';
import { IcoArrowForward } from '@learnway/icons';
import { Carousel } from '@learnway/ui';
import { Navigation } from 'swiper/modules';

interface NavigateComponentProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function NavigateComponent({ onMouseEnter, onMouseLeave }: NavigateComponentProps) {
  const gnblItems = [
    { name: '채널', link: '/', isLabel: false, hasEvent: false },
    { name: '교육제도', link: '/', isLabel: false, hasEvent: false },
    { name: '커뮤니티', link: '/', isLabel: false, hasEvent: false },
    { name: '대시보드', link: '/', isLabel: false, hasEvent: false },
    { name: '수강신청', link: '/', isLabel: false, hasEvent: true },
    { name: '기술인증', link: '/', isLabel: false, hasEvent: true },
  ];

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
        <Carousel
          itemClassName={(item, index) => {
            const typedItem = gnblItems[index]; // 원본 데이터 기준으로 판단
            return cn('slide', {
              [styles.event_menu]: typedItem.hasEvent,
              [styles.label_item]: typedItem.isLabel,
            });
          }}
          items={gnblItems.map((item, index) => (
            <div key={index}>
              <Link to={item.link} onMouseEnter={onMouseEnter}>
                <span>{item.name}</span>
              </Link>
              {item.isLabel && <span className={`${styles.label} ${styles.color1}`}>마감임박</span>}
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
        />
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);

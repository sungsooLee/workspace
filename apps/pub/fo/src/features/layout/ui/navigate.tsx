import { memo, useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './navigate.module.css';
import { IcoArrow } from '@learnway/icons';
import { Carousel } from '@learnway/ui';
import { Navigation } from 'swiper/modules';
import { menuData } from '../../platform/service/menuData';

interface NavigateComponentProps {
  onHoverIndexChange?: (index: number | null) => void;
  hoverIndex: number | null;
}

function NavigateComponent({ onHoverIndexChange, hoverIndex }: NavigateComponentProps) {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEnter = (index: number) => {
    const hasSub = menuData[index]?.subMenus?.length > 0;
    onHoverIndexChange?.(hasSub ? index : null);
  };

  return (
    <div className={`${styles.start} ${styles.navigate}`}>
      <nav className={styles.nav}>
        <Carousel
          items={menuData.map((item, index) => (
            <div key={index} className={item.hasEvent ? styles.event_menu : ''}>
              <Link
                to={item.link}
                onMouseEnter={() => handleEnter(index)}
                className={hoverIndex === index ? styles.active : ''}
              >
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
          prevIcon={<IcoArrow className={`${styles.ico} ${styles.prev}`} />}
          nextIcon={<IcoArrow className={`${styles.ico} ${styles.next}`} />}
        />
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);

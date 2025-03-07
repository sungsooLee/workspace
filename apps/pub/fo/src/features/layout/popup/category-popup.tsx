import { memo } from 'react';
import { Carousel } from '@/libs/ui/src';
import { Chips } from '@learnway/ui';

import styles from './category-popup.module.css';

const CategoryPopupComponent = () => {
  // 상단 배너 스와이퍼
  const items = [
    <Chips option={{ label: '기업경영', value: 'a' }} />,
    <Chips option={{ label: 'Ai교육', value: 'b' }} />,
    <Chips option={{ label: 'IT', value: 'c' }} />,
    <Chips option={{ label: '마케팅', value: 'd' }} />,
    <Chips option={{ label: '경영/기획', value: 'e' }} />,
  ];
  // 배너 스와이퍼 옵션
  const carouselOption = {
    spaceBetween: 20,
    slidesPerView: 3.8,
  };

  return (
    <div className={styles.swiper}>
      <div className={styles.swiper}>
        <Carousel
          items={items}
          className={styles.recent_swiper}
          spaceBetween={carouselOption.spaceBetween}
          slidesPerView={carouselOption.slidesPerView}
        />
      </div>
    </div>
  );
};

export const CategoryPopup = memo(CategoryPopupComponent);

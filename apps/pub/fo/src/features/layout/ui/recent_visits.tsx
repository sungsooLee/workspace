import { memo, useState, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './recent_visits.module.css';
import { IcoXclose, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Chips, SelectOption } from '@learnway/ui';

import { Navigation } from 'swiper/modules';

const RecentVisitsCompoment = () => {
  // const [items, setItems] = useState([
  //   { id: 1, label: '기업윤리' },
  //   { id: 2, label: '사회공헌' },
  //   { id: 3, label: '환경보호' },
  //   { id: 4, label: '마케팅 및 세일즈' },
  //   { id: 5, label: '상품/자동차 기술 제작' },
  //   { id: 6, label: '성희롱 예방' },
  //   { id: 7, label: '마케팅 및 세일즈' },
  //   { id: 8, label: '상품/자동차 기술 제작' },
  //   { id: 9, label: '성희롱 예방' },
  // ]);

  const items: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
    { label: '현대자동차 g', value: 'g' },
    { label: '현대자동차 h', value: 'h' },
    { label: '현대자동차 i', value: 'i' },
    { label: '현대자동차 j', value: 'j' },
    { label: '현대자동차 k', value: 'k' },
  ];

  // const handleDelete = (id: any) => {
  //   setItems(items.filter((item) => item.id !== id));
  //   console.log('Deleted item:', id);
  // };
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
    <div className={`${styles.start} ${styles.recent_visits}`}>
      <h3 className={styles.tit}>최근방문</h3>
      <Swiper
        ref={swiperRef}
        spaceBetween={8}
        slidesPerView="auto"
        loop={false}
        modules={[Navigation]}
        simulateTouch={isMobile}
        allowTouchMove={isMobile}
        className={styles.recent_swiper}>
        <div className={styles.lists}>
          {items.map((item, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <Chips className={styles.item} option={{ label: item.label, value: item.value }} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      <div ref={prevRef} className={styles.recent_button_prev}>
        <div className={styles.btn}>
          <IcoArrowForward width={16} height={16} stroke="#6F798B" />
        </div>
      </div>
      <div ref={nextRef} className={styles.recent_button_next}>
        <div className={styles.btn}>
          <IcoArrowForward width={16} height={16} stroke="#6F798B" />
        </div>
      </div>
    </div>
  );
};

export const RecentVisits = memo(RecentVisitsCompoment);

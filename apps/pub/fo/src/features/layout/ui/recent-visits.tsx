import { memo, useEffect, useRef } from 'react';
import styles from './recent-visits.module.css';
import { IcoArrowForward } from '@learnway/icons';
import { Chip, SelectOption } from '@learnway/ui';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

const RecentVisitsCompoment = () => {
  const items: SelectOption[] = [
    { label: '현대자동차 현대자동차현대자동차 A', value: 'A' },
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

  return (
    <div className={`${styles.start} ${styles.recent_visits}`}>
      <h3 className={styles.tit}>최근방문</h3>
      {/* 방문한 카테고리가 없을경우 
      <div className={styles.no_visits}>최근 방문한 카테고리가 없습니다.</div>*/}

      {/* 방문한 카테고리가 있을경우 */}
      <Swiper
        ref={swiperRef}
        spaceBetween={8}
        slidesPerView="auto"
        loop={false}
        modules={[Navigation]}
        className={styles.recent_swiper}>
        <div className={styles.lists}>
          {items.map((item, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <Chip className={styles.item} option={{ label: item.label, value: item.value }} />
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

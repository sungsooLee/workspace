import { IcoArrowForward } from '@learnway/icons';
import styles from '@learnway/styles/fo/features/layout/ui/recent-visits.module.css';
import { SelectOption } from '@learnway/ui/type';
import { memo, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Chip } from '@learnway/ui/chips';
import { Navigation } from 'swiper/modules';
import { t } from 'i18next';

interface RecentVisitsProps {
  items: SelectOption[];
  handleOnLink: (categoryId: number) => void;
}

const RecentVisitsCompoment = ({items, handleOnLink}: RecentVisitsProps) => {
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
      <h3 className={styles.tit}>{t('최근방문')}</h3>
      {
        (items.length === 0) ? (
          <div className={styles.no_visits}>{t('최근 방문한 카테고리가 없습니다.')}</div>
        ) : (
          <>
            <Swiper
              ref={swiperRef}
              spaceBetween={8}
              slidesPerView="auto"
              loop={false}
              modules={[Navigation]}
              className={styles.recent_swiper}
            >
              <div className={styles.lists}>
                {items.map((item, index) => (
                  <SwiperSlide key={index} className={styles.slide}>
                    <Chip className={styles.item} option={{ label: item.label, value: item.value }} onClick={() => handleOnLink(item.value)}/>
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
          </>
        )
      }
    </div>
  );
};

export const RecentVisits = memo(RecentVisitsCompoment);

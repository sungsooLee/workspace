import { memo, useState, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './recent_visits.module.css';
import { IcoXclose, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { Navigation } from 'swiper/modules';

const RecentVisitsCompoment = () => {
  const [items, setItems] = useState([
    { id: 1, label: '기업윤리' },
    { id: 2, label: '사회공헌' },
    { id: 3, label: '환경보호' },
    { id: 4, label: '마케팅 및 세일즈' },
    { id: 5, label: '상품/자동차 기술 제작' },
    { id: 6, label: '성희롱 예방' },
    { id: 7, label: '마케팅 및 세일즈' },
    { id: 8, label: '상품/자동차 기술 제작' },
    { id: 9, label: '성희롱 예방' },
  ]);

  const handleDelete = (id: any) => {
    setItems(items.filter((item) => item.id !== id));
    console.log('Deleted item:', id);
  };
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
      <Swiper
        ref={swiperRef}
        spaceBetween={8}
        slidesPerView="auto"
        loop={false}
        modules={[Navigation]}
        className={styles.recent_swiper}>
        <div className={styles.lists}>
          {items.map((slide, index) => (
            <SwiperSlide key={items.id} className={styles.slide}>
              <div className={styles.item}>
                {/* <Button className={styles.txt}>{item.label}</Button>
                <Button
                  aria-label="remove"
                  onClick={() => handleDelete(item.id)}
                  className={styles.remove}>
                  <IcoXclose width={16} height={16} stroke="#131C30" />
                </Button> */}
              </div>
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

import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './recent_visits.module.css';
import { IcoXclose, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

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

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const swiper = useSwiper();
  return (
    <div className={`${styles.start} ${styles.recent_visits}`}>
      <h3 className={styles.tit}>최근방문</h3>
      <Swiper
        spaceBetween={8}
        slidesPerView="auto"
        loop={false}
        navigation={{
          prevEl: '.recent_button_prev',
          nextEl: '.recent_button_next',
        }}
        className={styles.recent_swiper}>
        <div className={styles.lists}>
          {items.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <div className={styles.item}>
                <Button className={styles.txt}>{item.label}</Button>
                <Button
                  aria-label="remove"
                  onClick={() => handleDelete(item.id)}
                  className={styles.remove}>
                  <IcoXclose width={16} height={16} stroke="#131C30" />
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {/* <Button onClick={() => swiper.slideNext()}>
        <IcoArrowForward width={16} height={16} stroke="#6F798B" />
      </Button> */}
      <div className={styles.recent_button_prev}>
        <IcoArrowForward width={16} height={16} stroke="#6F798B" />
      </div>
      <div className={styles.recent_button_next}>
        <IcoArrowForward width={16} height={16} stroke="#6F798B" />
      </div>
    </div>
  );
};

export const RecentVisits = memo(RecentVisitsCompoment);

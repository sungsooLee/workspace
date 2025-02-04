import { memo, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './navigate.module.css';
import { IcoArrowForward } from '@learnway/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

function NavigateComponent() {
  const gnb = [
    { name: '기술인증', link: '/', isLabel: false, hasDivision: false },
    { name: '수강신청', link: '/', isLabel: true, hasDivision: true },
    { name: '교육제도', link: '/', isLabel: false, hasDivision: false },
    { name: '학습계획', link: '/', isLabel: false, hasDivision: false },
    { name: '채널', link: '/', isLabel: false, hasDivision: false },
    { name: 'HMCP', link: '/', isLabel: false, hasDivision: false },
    { name: '나의학습', link: '/', isLabel: false, hasDivision: false },
    { name: '커뮤니티', link: '/', isLabel: false, hasDivision: false },
    { name: '팀학습현황', link: '/', isLabel: false, hasDivision: false },
    { name: '교육지원', link: '/', isLabel: false, hasDivision: false },
    { name: '나의학습', link: '/', isLabel: false, hasDivision: false },
    { name: '커뮤니티', link: '/', isLabel: false, hasDivision: false },
    { name: '팀학습현황', link: '/', isLabel: false, hasDivision: false },
    { name: '교육지원', link: '/', isLabel: false, hasDivision: false },
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
    <div className={`${styles.start} ${styles.navigate}`}>
      <nav className={styles.nav}>
        <Swiper
          ref={swiperRef}
          spaceBetween={48}
          slidesPerView="auto"
          loop={false}
          modules={[Navigation]}
          className={styles.gnb_swiper}>
          {gnb.map((gnb, index) => (
            <SwiperSlide
              key={index}
              className={`${styles.slide} ${gnb.hasDivision ? styles.division : ''}`}>
              <Link to={gnb.link}>{gnb.name}</Link>
              {/* 라벨 표시 */}
              {gnb.isLabel && <span className={`${styles.label} ${styles.color1}`}>마감임박</span>}
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

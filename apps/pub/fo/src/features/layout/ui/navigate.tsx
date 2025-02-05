import { memo, useRef, useEffect, useState } from 'react';
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

  const menuAll = [{}];

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
      <nav className={styles.nav}>
        <Swiper
          ref={swiperRef}
          spaceBetween={48}
          slidesPerView="auto"
          loop={false}
          modules={[Navigation]}
          simulateTouch={isMobile}
          allowTouchMove={isMobile}
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

        {/* hover menu */}
        <div className={styles.menu_all}>
          <div className={styles.menu_div}>
            <div className={styles.menu_list}>
              <h2>
                <Link to={''}>교육제도</Link>
              </h2>
              <ul className={styles.list}>
                <li>
                  <Link to={''}>금융자격지원제도</Link>
                </li>
                <li>
                  <Link to={''}>SPA 승진제도</Link>
                </li>
              </ul>
            </div>

            <div className={styles.menu_list}>
              <h2>
                <Link to={''}>학습계획</Link>
              </h2>
              <ul className={styles.list}>
                <li>
                  <Link to={''}>진단</Link>
                </li>
                <li>
                  <Link to={''}>계획수립</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);

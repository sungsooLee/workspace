import React, { forwardRef, useRef } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import type { NavigationOptions } from 'swiper/types/modules/navigation';
import { cn } from '@learnway/shared';
import { Button } from '../button/button';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styles from './carousel.module.css';

export interface CarouselComponentProps extends SwiperProps {
  items: Array<React.ReactNode>;
  className?: string;
  showNavigation?: boolean;
}

const CarouselComponent = forwardRef<React.ElementRef<typeof Swiper>, CarouselComponentProps>(
  ({ className, items, showNavigation = false, ...props }, ref) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    // Navigation Buttons
    const renderNavigationButtons = () => (
      <>
        <Button ref={prevRef} className={cn(styles.navigation_btn, styles.prev_btn, 'prev_btn')} />
        <Button ref={nextRef} className={cn(styles.navigation_btn, styles.next_btn, 'next_btn')} />
      </>
    );

    return (
      <div className={cn(styles.start, 'nlp--carousel-wrap')}>
        {(showNavigation || items.length > 1) && renderNavigationButtons()}
        <Swiper
          {...props}
          ref={ref}
          className={cn(styles.swiper, className, 'nlp-carousel')}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          // loop={items.length > 1} // 슬라이드 1개일 경우 루프 off
          allowTouchMove={items.length > 1} // 슬라이드 1개일 경우 스와이프 off
          pagination={items.length > 1 ? props.pagination : false} // 1개일때는 페이지 숨김
          navigation={false} // 초기에는 false로 설정
          onInit={(swiper) => {
            if (items.length > 1 && showNavigation && swiper.params.navigation) {
              const navigation = swiper.params.navigation as NavigationOptions;
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} className={cn(styles.swiper_slide)}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
);

export const Carousel = CarouselComponent;

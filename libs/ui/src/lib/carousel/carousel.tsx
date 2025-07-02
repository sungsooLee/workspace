import React, { forwardRef, useRef, useEffect } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { cn } from '@learnway/shared';

import styles from './carousel.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';

export interface CarouselComponentProps extends SwiperProps {
  items: Array<React.ReactNode>;
  className?: string;
  enableNavigation?: boolean; // Navigation Button 표시 여부
}

const CarouselComponent = forwardRef<React.ElementRef<typeof Swiper>, CarouselComponentProps>(
  ({ className, items, enableNavigation = false, ...props }, ref) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    return (
      <div className={cn(styles.start, 'nlp--carousel-wrap')}>
        {/* Navigation Button */}
        {enableNavigation && (
          <>
            <div
              ref={prevRef}
              className={cn(styles.prev_btn, styles.navigation_btn)}
              role={'button'}
            ></div>
            <div
              ref={nextRef}
              className={cn(styles.next_btn, styles.navigation_btn)}
              role={'button'}
            ></div>
          </>
        )}

        <Swiper
          {...props}
          ref={ref}
          className={cn(styles.swiper, className, 'nlp-carousel')}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          navigation={
            enableNavigation
              ? {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }
              : false
          }
          onBeforeInit={(swiper) => {
            if (
              enableNavigation &&
              swiper.params.navigation &&
              typeof swiper.params.navigation === 'object'
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          onSwiper={(swiper) => {
            if (enableNavigation && swiper.navigation) {
              setTimeout(() => {
                swiper.navigation.update();
              }, 0);
            }
          }}
        >
          {/* items */}
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

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
  itemClassName?: string;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
}

const CarouselComponent = forwardRef<React.ElementRef<typeof Swiper>, CarouselComponentProps>(
  (
    { className, items, showNavigation = false, itemClassName, prevIcon, nextIcon, ...props },
    ref,
  ) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    // Navigation Buttons

    return (
      <div
        className={cn(
          styles.start,
          prevIcon || nextIcon ? styles.btn_hidden : null,
          'nlp--carousel-wrap',
        )}
      >
        {showNavigation && items.length > 1 && (
          <>
            <Button
              ref={prevRef}
              className={cn(styles.navigation_btn, styles.prev_btn, 'prev_btn')}
              icon={prevIcon && prevIcon}
            />
            <Button
              ref={nextRef}
              className={cn(styles.navigation_btn, styles.next_btn, 'next_btn')}
              icon={nextIcon && nextIcon}
            />
          </>
        )}
        <Swiper
          {...props}
          ref={ref}
          className={cn(styles.swiper, className, 'nlp-carousel')}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          allowTouchMove={items.length > 1}
          pagination={items.length > 1 ? props.pagination : false}
          navigation={false}
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
            <SwiperSlide key={index} className={cn(styles.swiper_slide, itemClassName)}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
);

export const Carousel = CarouselComponent;

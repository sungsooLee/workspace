import React, { forwardRef } from 'react';
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
}

const CarouselComponent = forwardRef<React.ElementRef<typeof Swiper>, CarouselComponentProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <Swiper
        {...props}
        ref={ref}
        className={cn(styles.swiper, className, 'nlp-carousel')}
        modules={[FreeMode, Pagination, Navigation, Autoplay]}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {/* items */}
        {items.map((item, index) => (
          <SwiperSlide key={index} className={cn(styles.swiper_slide)}>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  },
);

export const Carousel = CarouselComponent;

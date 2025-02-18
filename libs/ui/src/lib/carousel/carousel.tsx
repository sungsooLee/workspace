import React, { forwardRef } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { cn } from '@learnway/shared';

import styles from './carousel.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';

export interface CarouselComponentProps extends SwiperProps {
  items: Array<React.ReactNode>;
  className?: string;
}

const CarouselComponent = forwardRef<React.ElementRef<typeof Swiper>, CarouselComponentProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <Swiper
        {...props}
        className={cn(styles.Swiper, className, 'nlp-carousel')}
        modules={[FreeMode, Pagination, Navigation]}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {/* items */}
        {items.map((item, index) => (
          <SwiperSlide className={cn(styles.SwiperSlide)}>{item}</SwiperSlide>
        ))}
      </Swiper>
    );
  },
);

export const Carousel = CarouselComponent;

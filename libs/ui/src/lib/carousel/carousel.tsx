import React, { forwardRef } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { cn } from '@learnway/shared';

import styles from './carousel.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';

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
        spaceBetween={50}
        // slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}>
        {/* items */}
        {items.map((item, index) => (
          <SwiperSlide className={styles.SwiperSlide}>{item}</SwiperSlide>
        ))}
      </Swiper>
    );
  },
);

export const Carousel = CarouselComponent;

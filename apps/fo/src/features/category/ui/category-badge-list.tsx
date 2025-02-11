import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { IcoXclose, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';

import { Category } from '../../../types/entities/category';
import { useCategories } from '../services/category.service';
import { useCategoryNavigation } from '../../../entities/category/service/category.hook';
import styles from './category-badge-list.module.css';
import { Navigation } from 'swiper/modules';

interface CategoryBadgeListProps {
  onClose?: (categoryId: number) => void;
  onClick?: (category: Category) => void;
}

export function CategoryBadgeList({ onClose, onClick }: CategoryBadgeListProps) {
  const { handleCategoryClick } = useCategoryNavigation();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
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
  // 최근 방문한 카테고리는 일단 로컬 스토리지에서 관리한다고 가정
  const [recentCategories, setRecentCategories] = React.useState<Category[]>([]);
  const { data: categories } = useCategories();
  console.log(categories);
  React.useEffect(() => {
    // 로컬 스토리지에서 최근 방문 카테고리 ID 목록을 가져옴
    const recentCategoryIds = JSON.parse(localStorage.getItem('recentCategories') || '[]');

    // categories 데이터에서 해당하는 카테고리들을 찾아서 설정
    if (categories?.length && recentCategoryIds?.length) {
      const recent = recentCategoryIds
        .map((id: number) => categories.find((cat: Category) => cat.categoryId === id))
        .filter(Boolean)
        .slice(0, 8); // 최대 8개까지만 표시

      setRecentCategories(recent);
    }
  }, [categories]);

  const handleClose = (e: React.MouseEvent, categoryId: number) => {
    e.stopPropagation();
    // 최근 방문 목록에서 제거
    const updatedIds = recentCategories
      .filter((cat) => cat.categoryId !== categoryId)
      .map((cat) => cat.categoryId);

    localStorage.setItem('recentCategories', JSON.stringify(updatedIds));
    setRecentCategories((prev) => prev.filter((cat) => cat.categoryId !== categoryId));
    onClose?.(categoryId);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600); // 600px 미만이면 모바일로 인식
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        simulateTouch={isMobile}
        allowTouchMove={isMobile}
        className={styles.recent_swiper}>
        <div className={styles.lists}>
          {recentCategories.map((item) => (
            <SwiperSlide key={item.categoryId} className={styles.slide}>
              <div className={styles.item}>
                <Button className={styles.txt} onClick={() => handleCategoryClick(item)}>
                  {item.name}
                </Button>
                <Button
                  aria-label="remove"
                  onClick={(e) => handleClose(e, item.categoryId)}
                  className={styles.remove}>
                  <IcoXclose width={16} height={16} stroke="#131C30" />
                </Button>
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
}

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { IcoXclose, IcoArrowForward } from '@learnway/icons';
import { Button, Chips } from '@learnway/ui';

import { Category } from '../../../../types/entities/category';
import { useCategories } from '../../services/category.service';
import { useCategoryNavigation } from '../../../../entities/category/service/category.hook';

import styles from './category-badge-list.module.css';

interface CategoryBadgeListProps {
  onClose?: (categoryId: number) => void;
  onClick?: (category: Category) => void;
}

export function CategoryBadgeList({ onClose, onClick }: CategoryBadgeListProps) {
  const { handleCategoryClick } = useCategoryNavigation();
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

  const handleDelete = (categoryId: number) => {
    // 최근 방문 목록에서 제거
    const updatedIds = recentCategories
      .filter((cat) => cat.categoryId !== categoryId)
      .map((cat) => cat.categoryId);

    localStorage.setItem('recentCategories', JSON.stringify(updatedIds));
    setRecentCategories((prev) => prev.filter((cat) => cat.categoryId !== categoryId));
    // onClose?.(categoryId);
  };
  const handleClick = (data: Category) => {
    if (data) handleCategoryClick(data);
  };

  return (
    <div className={`${styles.start} ${styles.recent_visits}`}>
      <h3 className={styles.tit}>최근방문</h3>
      {recentCategories.length === 0 ? (
        <div className={styles.no_visits}>최근 방문한 카테고리가 없습니다.</div>
      ) : (
        <Swiper
          ref={swiperRef}
          spaceBetween={8}
          slidesPerView="auto"
          loop={false}
          modules={[Navigation]}
          className={styles.recent_swiper}>
          <div className={styles.lists}>
            {recentCategories.map((item) => (
              <SwiperSlide
                key={item.categoryId}
                className={styles.slide}
                onClick={() => handleClick(item)}>
                <Chips
                  className={styles.item}
                  option={{ label: item.name, value: item.categoryId + '' }}
                  onDelete={() => handleDelete(item.categoryId)}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      )}

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

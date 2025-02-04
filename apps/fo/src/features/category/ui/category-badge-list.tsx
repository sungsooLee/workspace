import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { IcoXclose, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';

import { Category } from '../../../types/entities/category';
import { useCategories } from '../services/category.service';
import { useCategoryNavigation } from '../../../entities/category/service/category.hook';
import styles from './category-badge-list.module.css';
import 'swiper/swiper-bundle.css';

interface CategoryBadgeListProps {
  onClose?: (categoryId: number) => void;
  onClick?: (category: Category) => void;
}

export function CategoryBadgeList({ onClose, onClick }: CategoryBadgeListProps) {
  const { handleCategoryClick } = useCategoryNavigation();

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

  // const handleClick = (category: Category) => {
  //   onClick?.(category);
  // };

  return (
    <div className={`${styles.start} ${styles.recent_visits}`}>
      <h3 className={styles.tit}>최근방문</h3>
      {/* {recentCategories.map((category) => (
        <div
          key={category.categoryId}
          className="cursor-pointer"
          onClick={() => handleCategoryClick(category)}>
          <span>{category.name}</span>
          <button onClick={(e) => handleClose(e, category.categoryId)}>×</button>
        </div>
      ))} */}
      <Swiper
        spaceBetween={8}
        slidesPerView="auto"
        loop={false}
        navigation={{
          prevEl: '.recent_button_prev',
          nextEl: '.recent_button_next',
        }}
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

      {/* <Button onClick={() => swiper.slideNext()}>
        <IcoArrowForward width={16} height={16} stroke="#6F798B" />
      </Button> */}
      <div className={styles.recent_button_prev}>
        <IcoArrowForward width={16} height={16} stroke="#6F798B" />
      </div>
      <div className={styles.recent_button_next}>
        <IcoArrowForward width={16} height={16} stroke="#6F798B" />
      </div>
    </div>
  );
}

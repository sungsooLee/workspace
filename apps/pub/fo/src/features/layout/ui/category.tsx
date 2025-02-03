import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoMenu01, IcoXclose, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';
import styles from './category.module.css';
import { RecentVisits } from './recent_visits';

const CategoryCompoment = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleCategory = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`${styles.start} ${styles.category_area}`}>
      <Button
        onlyIcon
        className={`${styles.btn_category} ${isActive ? styles.active : ''}`}
        onClick={toggleCategory}>
        {isActive ? (
          <IcoXclose width={24} height={24} stroke="#ffffff" />
        ) : (
          <IcoMenu01 width={24} height={24} stroke="#131C30" />
        )}
      </Button>

      {/* 카테고리 전체 메뉴 */}
      <div className={`${styles.category} ${isActive ? styles.active : ''}`}>
        {/* 최근방문 */}
        <RecentVisits />

        {/* 카테고리 영역 */}
        <div className={styles.category_area}>
          {/* 카테고리 영역 - 좌측메뉴 */}
          <div className={styles.category_menu}>
            <h2>
              <span className={styles.tit}>기업경영</span>
              <i>
                <IcoArrowForward width={16} height={16} stroke="#07287E" />
              </i>
            </h2>

            <div className={styles.menu_list}>
              <div className={`{$styles.menu_section} {$styles.sec1}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Category = memo(CategoryCompoment);

import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoMenu01 } from '@learnway/icons';
import { Button } from '@learnway/ui';
import styles from './category.module.css';

const CategoryCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.category}`}>
      <Button onlyIcon className="btn_catagory">
        <IcoMenu01 width={24} height={24} stroke="#131C30" />
      </Button>

      {/* 카테고리 전체 메뉴 */}
      <div className="catagory_area"></div>
    </div>
  );
};

export const Category = memo(CategoryCompoment);

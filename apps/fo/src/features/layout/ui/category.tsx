import { memo, useEffect, useState } from 'react';
import { Button, Popover } from '@learnway/ui';
import { CategoryLayer } from '../../category/ui/category-layer';
import { useRouter } from '@tanstack/react-router';
import { IcoMenu01, IcoXclose } from '@learnway/icons';
import styles from './category.module.css';

const CategoryContent = ({ isOpen }: any) => {
  return <CategoryLayer isOpen={isOpen} />;
};
const CategoryComponent = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return router.history.subscribe((navigation) => {
      setIsOpen(false);
    });
  }, [router.history]);

  return (
    <div className={`${styles.start} ${styles.category_area}`}>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        popoverContent={<CategoryContent isOpen={isOpen} />}>
        <Button onlyIcon className={`${styles.btn_category} ${isOpen ? styles.active : ''}`}>
          {isOpen ? (
            <IcoXclose width={24} height={24} stroke="#ffffff" />
          ) : (
            <IcoMenu01 width={24} height={24} stroke="#131C30" />
          )}
        </Button>
        {/* <Button
          onlyIcon
          className={`${styles.btn_category} ${isActive ? styles.active : ''}`}
          onClick={toggleCategory}>
          {isActive ? (
            <IcoXclose width={24} height={24} stroke="#ffffff" />
          ) : (
            <IcoMenu01 width={24} height={24} stroke="#131C30" />
          )}
        </Button> */}

        {/* 카테고리 전체 메뉴 */}
        {/* <div className={`${styles.category} ${isActive ? styles.active : ''}`}> */}
        {/* 최근방문 */}
        {/* <RecentVisits /> */}
        {/* </div> */}
      </Popover>
    </div>
  );
};

export const Category = memo(CategoryComponent);

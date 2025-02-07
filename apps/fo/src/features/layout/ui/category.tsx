import { memo, useEffect, useState } from 'react';
import { Button, Popover } from '@learnway/ui';
import { CategoryLayer } from '../../category/ui/category-layer';
import { useRouter } from '@tanstack/react-router';
import { IcoMenu01, IcoXclose } from '@learnway/icons';
import styles from './category.module.css';

interface CategoryProps {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
}

const CategoryContent = ({ isOpen }: any) => {
  return <CategoryLayer isOpen={isOpen} />;
};
const CategoryComponent = ({ onOpenChange, isOpen }: CategoryProps) => {
  const router = useRouter();

  useEffect(() => {
    return router.history.subscribe((navigation) => {
      onOpenChange(false);
    });
  }, [router.history, onOpenChange]);

  return (
    <div className={`${styles.start} ${styles.category_area}`}>
      <Popover
        open={isOpen}
        onOpenChange={onOpenChange}
        popoverContent={<CategoryContent isOpen={isOpen} />}>
        <Button onlyIcon className={`${styles.btn_category} ${isOpen ? styles.active : ''}`}>
          {isOpen ? (
            <IcoXclose width={24} height={24} stroke="#ffffff" />
          ) : (
            <IcoMenu01 width={24} height={24} stroke="#131C30" />
          )}
        </Button>
      </Popover>
    </div>
  );
};

export const Category = memo(CategoryComponent);

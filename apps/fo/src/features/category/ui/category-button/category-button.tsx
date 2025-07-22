import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

import { Popover } from '@learnway/ui';
import { IcoMenu02 } from '@learnway/icons';

import { CategoryNavigationPopover } from '../category-navigation-popover/category-navigation-popover';

import styles from '@learnway/styles/fo/features/category/category-button.module.css';

interface CategoryPopoverProps {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
}

export const CategoryButton = ({ onOpenChange, isOpen }: CategoryPopoverProps) => {
  const router = useRouter();

  useEffect(() => {
    return router.history.subscribe((navigation) => {
      onOpenChange(false);
    });
  }, [router.history, onOpenChange]);

  return (
    <div className={`${styles.start} `}>
      <Popover
        open={isOpen}
        onOpenChange={onOpenChange}
        className={`${styles.btn_category} ${isOpen ? styles.active : ''}`}
        popoverContent={<CategoryNavigationPopover isOpen={isOpen} />}
        side="bottom"
        align="start"
        sideOffset={15}
      >
        {isOpen ? (
          <IcoMenu02 width={32} height={32} fill="#4D88FF" />
        ) : (
          <IcoMenu02 width={32} height={32} fill="#131416" />
        )}
      </Popover>
    </div>
  );
};

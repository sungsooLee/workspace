import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

import { Popover } from '@learnway/ui';
import { IcoMenu01, IcoXclose } from '@learnway/icons';

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
        sideOffset={15}>
        {/* <Button onlyIcon className={`${styles.btn_category} ${isOpen ? styles.active : ''}`}> */}
        {isOpen ? (
          <IcoXclose width={24} height={24} stroke="#ffffff" />
        ) : (
          <IcoMenu01 width={24} height={24} stroke="#131C30" />
        )}
        {/* </Button> */}
      </Popover>
    </div>
  );
};

import { Button, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/layout/ui/category-layer-button.module.css';
import { IcoArray } from '@learnway/icons';
import { memo } from 'react';
import { CategoryPopup } from '@features/layout';

const CategoryLayerButton = () => {
  // modal
  const { openModal } = useModal();

  return (
    <div className={cn(styles.start, styles.category)}>
      <Button
        icon={<IcoArray width={24} height={24} stroke="#131c30" fill="none" />}
        onlyIcon={true}
        onClick={() =>
          openModal({
            width: 'm_full',
            content: <CategoryPopup />,
          })
        }
      >
        <span>카테고리</span>
      </Button>
    </div>
  );
};

export const CategoryButton = memo(CategoryLayerButton);

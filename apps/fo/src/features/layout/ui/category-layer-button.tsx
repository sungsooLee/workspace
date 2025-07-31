import { memo } from 'react';
import { Button, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { CategoryPopup } from '../popup/category-popup';

import styles from '@learnway/styles/fo/features/layout/ui/category-layer-button.module.css';

import { IcoArray } from '@learnway/icons';

const CategoryLayerButton = () => {
  // modal
  const { openModal } = useModal();

  return (
    <div className={cn(styles.start, styles.category)}>
      <Button
        onClick={() =>
          openModal({
            width: 'm_full',
            content: <CategoryPopup activeTenantId={0}/>,
          })
        }
      >
        <IcoArray width={24} height={24} stroke="#131c30" fill="none"></IcoArray>
      </Button>
    </div>
  );
};

export const CategoryButton = memo(CategoryLayerButton);

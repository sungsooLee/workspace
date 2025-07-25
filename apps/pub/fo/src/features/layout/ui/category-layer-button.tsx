import { memo } from 'react';
import { Button, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { CategoryPopup } from '../popup/category-popup';

import styles from './category-layer-button.module.css';

import { IcoArray } from '@learnway/icons';

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
      ></Button>
    </div>
  );
};

export const CategoryButton = memo(CategoryLayerButton);

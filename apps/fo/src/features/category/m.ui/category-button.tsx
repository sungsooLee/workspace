import { CategoryPopup } from '@features/layout';
import { IcoArray } from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/layout/ui/category-layer-button.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { memo, useState } from 'react';

interface CategoryPopupProps {
  id: number;
}

const CategoryLayerButton = ({ id }: CategoryPopupProps) => {
  // modal
  const { openModal } = useModal();

  const [tenantId, setTenantId] = useState<number>(id);

  return (
    <div className={cn(styles.start, styles.category)}>
      <Button
        icon={<IcoArray width={24} height={24} stroke="#131c30" fill="none" />}
        onlyIcon={true}
        onClick={() =>
          openModal({
            width: 'm_full',
            content: <CategoryPopup activeTenantId={tenantId} />,
          })
        }
      >
        <span>카테고리</span>
      </Button>
    </div>
  );
};

export const CategoryButton = memo(CategoryLayerButton);

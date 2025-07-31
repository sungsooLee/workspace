import { memo, useState } from 'react';

import { IcoArrowDown } from '@learnway/icons';
import styles from '@learnway/styles/fo/features/layout/ui/family-site.module.css';
import { Popover } from '@learnway/ui/popover';

const PopoverContent = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const buttons = ['site1', 'site2'];
  const handleClick = (idx: number): void => {
    setActiveIdx(idx);
  };

  return (
    <div className={styles.family_site}>
      <div className={styles.btn_wrap}>
        {buttons.map((btn, idx) => (
          <button
            type="button"
            key={idx}
            className={`${styles.btn} ${activeIdx === idx ? styles.active : ''}`}
            onClick={() => handleClick(idx)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

const FamilySiteComponent = () => {
  return (
    <Popover popoverContent={<PopoverContent />}>
      <button className={styles.btn_site}>
        <span className={styles.select}>{'Family site'}</span>
        <IcoArrowDown width={16} height={16} stroke="#131C30" />
      </button>
    </Popover>
  );
};

export const FamilySite = memo(FamilySiteComponent);

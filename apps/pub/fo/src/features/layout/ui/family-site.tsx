import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Popover } from '@learnway/ui';
import styles from './family-site.module.css';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';

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
            onClick={() => handleClick(idx)}>
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

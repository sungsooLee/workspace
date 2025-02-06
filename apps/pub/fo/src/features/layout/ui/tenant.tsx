import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Popover } from '@learnway/ui';
import styles from './tenant.module.css';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';

const PopoverContent = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const buttons = ['현대차', '현대건설'];
  const handleClick = (idx: number): void => {
    setActiveIdx(idx);
  };

  return (
    <div className={styles.tenant_content}>
      <div className={styles.btn_wrap}>
        {buttons.map((btn, idx) => (
          <button
            type="button"
            key={idx}
            className={`${styles.btn} ${activeIdx === idx ? styles.active : ''}`}
            onClick={() => handleClick(idx)}>
            {btn} {activeIdx === idx && <IcoCheck width={20} height={20} />}
          </button>
        ))}
      </div>
    </div>
  );
};

const TenantComponent = () => {
  return (
    <Popover popoverContent={<PopoverContent />} className={styles.btn_tenant}>
      <span className={styles.select}>{'현대자동차'}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Popover>
  );
};

export const Tenant = memo(TenantComponent);

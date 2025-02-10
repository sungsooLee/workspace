import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Popover } from '@learnway/ui';
import styles from './tenant.module.css';
import { IcoArrowDown } from '@learnway/icons';

const PopoverContent = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const tenants = [
    '현대차',
    '테넌트명 테넌트명',
    '현대차',
    '테넌트명 테넌트명',
    '현대차',
    '테넌트명 테넌트명',
    '현대차',
    '테넌트명 테넌트명',
  ];
  const handleClick = (idx: number): void => {
    setActiveIdx(idx);
  };

  return (
    <div className={`${styles.start} ${styles.tenant_content}`}>
      <div className={styles.tenant_wrap}>
        <ul className={styles.tenant_list}>
          {tenants.map((tenants, idx) => (
            <li>
              <Button
                key={idx}
                className={`${styles.btn} ${activeIdx === idx ? styles.active : ''}`}
                onClick={() => handleClick(idx)}>
                {tenants}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TenantComponent = () => {
  return (
    <Popover
      popoverContent={<PopoverContent />}
      className={styles.btn_tenant}
      side="bottom"
      align="start"
      sideOffset={5}>
      <span className={styles.select}>{'현대 오토에버'}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Popover>
  );
};

export const Tenant = memo(TenantComponent);

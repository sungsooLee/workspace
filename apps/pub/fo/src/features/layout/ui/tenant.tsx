import { Link } from '@tanstack/react-router';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover } from '@learnway/ui';
import { isMobile } from 'react-device-detect';
import { IcoArrowDown } from '@learnway/icons';
import styles from '@learnway/styles/fo/features/platform/ui/tenant-button/tenant-button.module.css';

const TenantContent = ({
  selectedTenant,
  onSelect,
}: {
  selectedTenant: string | null;
  onSelect: (tenant: string) => void;
}) => {
  const tenants = [
    '테넌트명1',
    '테넌트명2테넌트명2테넌트명2테넌트명2테넌트명2테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
  ];

  return (
    <div className={`${styles.start} ${styles.tenant_content}`}>
      <div className={styles.tenant_wrap}>
        <ul className={styles.tenant_list}>
          {tenants.map((tenant, index) => (
            <li
              key={index}
              className={selectedTenant === tenant ? styles.active : ''}
              onClick={() => onSelect(tenant)}
            >
              <Link to="/">{tenant}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TenantComponent = () => {
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);

  return (
    <Popover
      popoverContent={
        <TenantContent selectedTenant={selectedTenant} onSelect={setSelectedTenant} />
      }
      className={styles.btn_tenant}
      side="bottom"
      align="end"
      sideOffset={20}
    >
      <span className={styles.select}>{selectedTenant || '테넌트 선택'}</span>
      <span className={styles.ico}>
        <IcoArrowDown />
      </span>
    </Popover>
  );
};

export const Tenant = memo(TenantComponent);

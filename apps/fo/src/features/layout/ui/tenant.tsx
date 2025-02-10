import { memo } from 'react';
import { Tenant } from '../../../entities/tenant';
import { Button, Popover } from '@learnway/ui';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';

import styles from './tenant.module.css';

interface TenantsComponentProps {
  tenants: Tenant[];
  activeTenant: Tenant | null;
  onTenantSwitch: (tenant: Tenant) => void;
}

const PopoverContent = ({
  data,
  activeTenant,
  onTenantSelect,
}: {
  data?: Tenant[];
  activeTenant: Tenant | null;
  onTenantSelect: (tenantId: Tenant) => void;
}) => {
  if (!data || !data?.length) {
    return null;
  }

  return (
    <div className={`${styles.start} ${styles.tenant_content}`}>
      {/* <div className={styles.btn_wrap}>
        {data.map((tenant: Tenant, idx: number) => (
          <button
            type="button"
            key={idx}
            className={`${styles.btn} ${tenant.id === activeTenant?.id ? styles.active : ''}`}
            onClick={() => onTenantSelect(tenant)}>
            {tenant.name} {tenant.id === activeTenant?.id && <IcoCheck width={20} height={20} />}
          </button>
        ))}
      </div> */}
      <div className={styles.tenant_wrap}>
        <ul className={styles.tenant_list}>
          {data.map((tenant: Tenant, idx: number) => (
            <li>
              <Button
                key={idx}
                className={`${styles.btn} ${tenant.id === activeTenant?.id ? styles.active : ''}`}
                onClick={() => onTenantSelect(tenant)}>
                {tenant.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TenantComponent = ({ tenants, activeTenant, onTenantSwitch }: TenantsComponentProps) => {
  return (
    <Popover
      popoverContent={
        <PopoverContent
          data={tenants}
          onTenantSelect={onTenantSwitch}
          activeTenant={activeTenant}
        />
      }
      className={styles.btn_tenant}
      side="bottom"
      align="start"
      sideOffset={5}>
      <span className={styles.select}>{activeTenant?.name || '테넌트 선택'}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Popover>
  );
};

export const Tenants = memo(TenantComponent);

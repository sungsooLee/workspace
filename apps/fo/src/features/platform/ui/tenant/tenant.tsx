import { memo } from 'react';
import { MobileView, BrowserView } from 'react-device-detect';

import { Tenant } from '../../../../entities/tenant';
import { Button, useModal } from '@learnway/ui';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';

import { TenantModal } from './tenant-modal';

import styles from '@learnway/styles/fo/features/layout/ui/tenant.module.css';

interface TenantsComponentProps {
  tenants?: Tenant[];
  activeTenant?: Tenant | null;
  onTenantSwitch?: (tenant: Tenant) => void;
}

const TenantComponent = ({ tenants, activeTenant, onTenantSwitch }: TenantsComponentProps) => {
  const { open: openModal } = useModal();
  return (
    <Button
      className={styles.btn_tenant}
      onClick={() =>
        // 퍼블수정 20250320 : mobile, pc 분기 처리
        openModal({
          width: 'sm',
          content: <TenantModal />,
        })
      }>
      <span className={styles.select}>{'현대 오토에버'}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Button>
  );
};

export const Tenants = memo(TenantComponent);

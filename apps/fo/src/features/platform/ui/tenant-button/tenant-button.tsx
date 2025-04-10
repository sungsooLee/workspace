import { memo } from 'react';
import { MobileView, BrowserView } from 'react-device-detect';
import { useCreation } from 'ahooks';

import { Button, useModal } from '@learnway/ui';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';
import { useFetchAuthUser } from '@learnway/config';

import { TenantModal } from './tenant-modal';
import { Tenant } from '../../../../types';

import styles from '@learnway/styles/fo/features/platform/ui/tenant-button/tenant-button.module.css';

const TenantComponent = () => {
  const { open: openModal } = useModal();

  const { data } = useFetchAuthUser();

  const activeTenantName = useCreation(() => {
    if (!data?.tenants || !data?.activeTenantNo) {
      return;
    }
    const activeTenant = data?.tenants.filter(
      (tenant: Tenant) => tenant.tenantNo === data?.activeTenantNo,
    )?.[0];
    return activeTenant?.tenantName;
  }, [data?.activeTenantNo]);

  return (
    <Button
      className={styles.btn_tenant}
      onClick={() =>
        // 퍼블수정 20250320 : mobile, pc 분기 처리
        openModal({
          width: 'sm',
          content: <TenantModal />,
        })
      }
    >
      <span className={styles.select}>{activeTenantName}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Button>
  );
};

export const TenantButton = memo(TenantComponent);

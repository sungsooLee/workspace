import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover, useModal, Button } from '@learnway/ui';
import { isMobile } from 'react-device-detect';
import { IcoArrowDown } from '@learnway/icons';
import styles from '@learnway/styles/fo/features/platform/ui/tenant-button/tenant-button.module.css';

const TenantContent = () => {
  const tenants = [
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',

    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
  ];
  return <div>팝오버 내용</div>;
};

const TenantComponent = () => {
  return (
    <Popover
      popoverContent={<TenantContent />}
      className={styles.btn_tenant}
      side="bottom"
      align="start"
      sideOffset={10}
    >
      <span className={styles.select}>{'현대 오토에버'}</span>
      <span className={styles.ico}>
        <IcoArrowDown />
      </span>
    </Popover>
  );
};

export const Tenant = memo(TenantComponent);

import { useTranslation } from 'react-i18next';
import React from 'react';
import { OrganizationTree } from './organization-tree';
import { OrganizationTable } from './organization-table';

import styles from './oranization.module.css';

const OrganizationComponent = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.start}>
      <div className={styles.inner}>
        <OrganizationTree />
      </div>
      <div className={styles.inner}>
        <OrganizationTable />
      </div>
    </div>
  );
};

export const Organization = OrganizationComponent;

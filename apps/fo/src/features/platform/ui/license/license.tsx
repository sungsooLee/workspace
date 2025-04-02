import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';
import { keys } from 'lodash';

import { getLicenses } from '@learnway/config';

import styles from '@learnway/styles/fo/features/platform/ui/license/license.module.css';

function LicenseComponent() {
  const { t } = useTranslation();

  const data = useCreation(() => {
    return getLicenses();
  }, []);

  return (
    <div className={`${styles.start} ${styles.license_wrap}`}>
      <ul>
        {keys(data).map((key: string) => (
          <li>{key}</li>
        ))}
      </ul>
    </div>
  );
}

export const License = LicenseComponent;

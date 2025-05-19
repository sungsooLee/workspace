import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { cn } from '@learnway/shared';
import styles from './licenses-history.module.css';
import bulletStyles from '../../../../shared/ui/list/bullet.module.css';

const LicensesHistoryComponent = () => {
  return (
    <div className={`${styles.start} ${styles.history_wrap}`}>
      <div className={`${bulletStyles.start} ${bulletStyles.list} ${styles.list_info}`}>
        <ul>
          <li>자격증 취득 이력을 등록할 수 있으며, 승인 현황을 조회할 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
};

export const LicensesHistory = LicensesHistoryComponent;

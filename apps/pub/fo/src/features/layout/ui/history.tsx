import { memo, useState } from 'react';

import { Button, Popover } from '@learnway/ui';
import { IcoHistory } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { HistoryContents } from '../../layout';

import styles from './history.module.css';

const PopoverContent = () => {
  return (
    <div className={cn(styles.start, styles.history_wrap)}>
      <div className={styles.history_content}>
        {/* contents */}
        <HistoryContents />
      </div>
    </div>
  );
};

const HistoryComponent = () => {
  return (
    <div className={cn(styles.start, styles.history_info)}>
      <Popover popoverContent={<PopoverContent />} side="bottom" align="end" sideOffset={5}>
        <span className={styles.alarm_info}>
          <IcoHistory width={24} height={24} fill="#131416" />
          <em className={styles.noti}></em>
        </span>
      </Popover>
    </div>
  );
};

export const History = memo(HistoryComponent);

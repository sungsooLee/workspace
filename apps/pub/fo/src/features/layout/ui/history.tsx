import { memo } from 'react';

import { IcoHistory } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Popover } from '@learnway/ui/popover';
import { HistoryContents } from './history-contents';
import styles from './history.module.css';

// 퍼블수정 20250801 전체 수정
const HistoryComponent = () => {
  return (
    <div className={cn(styles.start, styles.history_info)}>
      <Popover popoverContent={<HistoryContents />} side="bottom" align="end" sideOffset={5}>
        <span className={styles.alarm_info}>
          <IcoHistory width={24} height={24} fill="#131416" />
          <em className={styles.noti}></em>
        </span>
      </Popover>
    </div>
  );
};

export const History = memo(HistoryComponent);

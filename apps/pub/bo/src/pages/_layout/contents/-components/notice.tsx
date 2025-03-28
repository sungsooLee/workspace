/* eslint-disable no-redeclare */
import { memo } from 'react';
import { cn } from '@learnway/shared';
import styles from './notice.module.css';
import {} from // Button,
// // Tooltip,
// DatePicker,
// // Switch,
// Select,
// // ThumbnailImageUpload,
// // ChipList,
// // SelectOption,
// Input,
'@learnway/ui';

import { IcoAnnouncement03 } from '@learnway/icons';

interface NoticeComponentProps {
  title?: string;
  text?: string;
  className?: string;
  list?: string[];
  listType?: 'bullet' | 'count';
}

function NoticeComponentProps({
  title,
  text,
  list,
  listType = 'bullet',
  className,
}: NoticeComponentProps) {
  return (
    <div className={cn(styles.start, styles.notice, 'notice', className)}>
      <div className={styles.icon_wrap}>
        <IcoAnnouncement03 width={'32'} height={'32'} stroke={'#07287E'} />
      </div>
      <div className={styles.text_wrap}>
        {title && <strong className={styles.title}>{title}</strong>}
        {text && <p className={styles.text}>{text}</p>}
        {list && list.length > 0 && (
          <ul className={cn(styles.text_list, listType && styles[listType])}>
            {list.map((item, index) => (
              <li key={index} className={styles.list}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const Notice = memo(NoticeComponentProps);

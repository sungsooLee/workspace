import { memo } from 'react';

import { Avatar, Popover } from '@learnway/ui';
import { IcoBell02 } from '@learnway/icons';

import { useFetchAuthUser } from '../../../entities/user';

import styles from './notification.module.css';

const PopoverContent = () => {
  return <div className={styles.alarm_content}></div>;
};

const NotificationComponent = () => {
  const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />}>
      <button type="button" className={styles.btn_alarm}>
        <IcoBell02 width={20} height={20} stroke="#131C30" />
        <em className={styles.noti}></em>
      </button>
    </Popover>
  );
};

export const Notification = memo(NotificationComponent);

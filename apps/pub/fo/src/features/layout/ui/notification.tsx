import { memo, useState } from 'react';

import { Button, Popover } from '@learnway/ui';
import { IcoBell02 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { NotificationContents } from '../../layout';

import styles from './notification.module.css';

const PopoverContent = () => {
  return (
    <div className={cn(styles.start, styles.alarm_wrap)}>
      <div className={styles.alarm_content}>
        {/* alarm_header */}
        <div className={styles.alarm_header}>
          <strong className={styles.tit}>{'알림'}</strong>
          <div className={styles.btn_wrap}>
            <Button className={styles.btn}>전체읽음</Button>
            <Button className={styles.btn}>전체삭제</Button>
          </div>
        </div>

        {/* contents */}
        <NotificationContents />
      </div>
    </div>
  );
};

const NotificationComponent = () => {
  // const { data } = useFetchAuthUser();

  return (
    // 퍼블수정 20250318 알림 문구 추가
    <div className={styles.alarm_info}>
      <Popover popoverContent={<PopoverContent />} side="bottom" align="end" sideOffset={5}>
        <span className={styles.alarm_info22}>
          <IcoBell02 width={20} height={20} stroke="#131C30" />
          <em className={styles.noti}></em>
        </span>
      </Popover>
      {/* <p className={styles.text}>새로운 알림이 왔어요.</p> */}
    </div>
  );
};

export const Notification = memo(NotificationComponent);

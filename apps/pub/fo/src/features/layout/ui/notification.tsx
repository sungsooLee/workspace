import { memo } from 'react';

import { IcoBell02, IcoClose02 } from '@learnway/icons';
import { Popover } from '@learnway/ui/popover';
import { NotificationContents } from '../../layout';

import popoverInnerStyles from '@learnway/styles/fo/features/layout/ui/popover-inner.module.css';
import { Button } from '@learnway/ui/button';
import styles from './notification.module.css';

const PopoverContent = () => {
  return (
    <div className={`${styles.start} ${popoverInnerStyles.start}`}>
      <div className={popoverInnerStyles.title_area}>
        <h2>알림</h2>
        <Popover.Close>
          <Button variant="expand" size="sm" onlyIcon>
            <IcoClose02 className={popoverInnerStyles.btn_close} />
          </Button>
        </Popover.Close>
      </div>

      <div className={styles.alarm_content}>
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
          <IcoBell02 width={24} height={24} stroke="#131C30" />
          {/* 알림이 있을경우 */}
          <em className={styles.noti}></em>
        </span>
      </Popover>
      {/* <p className={styles.text}>새로운 알림이 왔어요.</p> */}
    </div>
  );
};

export const Notification = memo(NotificationComponent);
